// import { Button } from 'flowbite-react';
// import React, { useEffect, useRef, useState } from 'react';
// import { getMyUserId } from '../../api/userIdApi';

// const WebRTCContainer = ({ client, isConnected, spaceId }) => {
//     const [localStream, setLocalStream] = useState(null);
//     const [pcListMap, setPcListMap] = useState(new Map());
//     const [username, setUsername] = useState(null);
//     const accountId = sessionStorage.getItem("accountId");
  
//     useEffect(() => {
//       const startAudio = async () => {
//         try {
//           const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//           setLocalStream(stream);
//         } catch (error) {
//           console.error('Error accessing media devices:', error);
//         }
//       };

//       const fetchMyUsername = async () => {
//         try {
//           const response = await getMyUserId(accountId);
//           setUsername(response.response.username);
//           console.log("내 id:", response.response.username);
//         } catch (error) {
//           console.error("내 id 요청 Error:", error);
//         }
//       };

//       fetchMyUsername();
//       startAudio();
  
//       return () => {
//         if (localStream) {
//           localStream.getTracks().forEach((track) => {
//             track.stop();
//           });
//         }
//       };
//     }, []);
  
//     useEffect(() => {
//         console.log('Connected to WebRTC server');
  
//         client.subscribe(`/user/topic/offer/${spaceId}`, (response) => {
//           const { senderId, offer } = JSON.parse(response.body);
//           handleOffer(senderId, offer);
//         },
//         {
//             accessToken: client.connectHeaders.accessToken,
//         });
  
//         client.subscribe(`/user/topic/answer/${spaceId}`, (response) => {
//           const { answerId, answer } = JSON.parse(response.body);
//           handleAnswer(answerId, answer);
//         },
//         {
//             accessToken: client.connectHeaders.accessToken,
//         });
  
//         client.subscribe(`/user/topic/iceCandidate/${spaceId}`, (response) => {
//           const { senderId, iceCandidate } = JSON.parse(response.body);
//           handleIceCandidate(senderId, iceCandidate);
//         },
//         {
//             accessToken: client.connectHeaders.accessToken,
//         });
  
//         return () => {
//             if (client.connected) {
//                 client.disconnect();
//             }
//         };
//     }, [spaceId]);
  
//     const createPeerConnection = (senderId) => {
//       const iceServers = [
//         { urls : 'stun:stun.l.google.com:19302' },
//       ];
//       const pc = new RTCPeerConnection(iceServers);
  
//       pc.addEventListener('icecandidate', (event) => {
//         if (event.candidate) {
//             client.publish({
//                 destination: `/app/iceCandidate/${spaceId}`,
//                 body: JSON.stringify({
//                     senderId,
//                     iceCandidate: event.candidate,
//                 }),
//             });
//         //   stompClientRef.current.send(`/app/iceCandidate/${spaceId}`, {
//         //     'Content-Type': 'application/json',
//         //   }, JSON.stringify({ sender, iceCandidate: event.candidate }));
//         }
//       });
  
//       pc.addEventListener('track', (event) => {
//         const remoteAudio = new Audio();
//         remoteAudio.srcObject = event.streams[0];
//         remoteAudio.play();
//       });
  
//       if (localStream) {
//         localStream.getTracks().forEach((track) => {
//           pc.addTrack(track, localStream);
//         });
//       }
  
//       return pc;
//     };
  
//     const handleOffer = (senderId, offer) => {
//       const pc = createPeerConnection(senderId);
//       pc.setRemoteDescription(new RTCSessionDescription(offer));
  
//       pc.createAnswer().then((answer) => {
//         pc.setLocalDescription(answer);
//         client.publish({
//             destination: `/app/answer/${spaceId}`,
//             body: JSON.stringify({
//                 answerId : username,
//                 answer,
//             }),
//         });
//         // stompClientRef.current.send(`/app/answer/${spaceId}`, {
//         //   'Content-Type': 'application/json',
//         // }, JSON.stringify({ sender, answer }));
//       });
  
//       setPcListMap((prevMap) => new Map(prevMap.set(senderId, pc)));
//     };
  
//     const handleAnswer = (answerId, answer) => {
//       const pc = pcListMap.get(answerId);
//       if (pc) {
//         pc.setRemoteDescription(new RTCSessionDescription(answer));
//       }
//     };
  
//     const handleIceCandidate = (senderId, iceCandidate) => {
//       const pc = pcListMap.get(senderId);
//         pc.addIceCandidate(new RTCIceCandidate(iceCandidate));
//     };
  
//     const startAudioChat = async () => {
//         if (isConnected) {
//           const pc = createPeerConnection(username);
      
//           // offer 생성
//           const offer = await pc.createOffer();
      
//           // 로컬에 offer 저장
//           await pc.setLocalDescription(offer);
      
//           // 시그널링 서버에 offer 전송
//           await client.publish({
//             destination: `app/offer/${spaceId}`,
//             body: JSON.stringify({
//               offer,
//             }),
//           });
//         }
//       };
      
  
//     return (
//       <div>
//         <Button onClick={startAudioChat}>Start Audio Chat</Button>
//       </div>
//     );
// };

// export default WebRTCContainer;

// VoiceChatContainer.js
import React, { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';
import Webcam from 'react-webcam';

const WebRTCContainer = ({ client, children, spaceId, isConnected }) => {
  const [peers, setPeers] = useState([]);
  const audioRef = useRef(new Audio());
  const isSpeakingRef = useRef(false);

  useEffect(() => {
    return () => {
      endVoiceChat();
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      client.subscribe(`/topic/offer/${spaceId}`, (signal) => {
        const offer = JSON.parse(signal.body);
        const peerConnection = new SimplePeer({
          initiator: false,
          trickle: false,
        });
        console.log("소켓 받았음.");
        peerConnection.signal(offer);
        setPeers((prevPeers) => [...prevPeers, peerConnection]);
      }, {
        accessToken: client.connectHeaders.accessToken,
      });
    }
  }, [isConnected]);

  const startVoiceChat = async () => {
    const peerConnection = new SimplePeer({ initiator: true, trickle: false });

    peerConnection.on('signal', (signal) => {
      client.publish({
        destination: `/app/offer/${spaceId}`,
        body: JSON.stringify(signal),
      });
      console.log("소켓 전송함.")
    });

    peerConnection.on('stream', (stream) => {
      // Handle the incoming audio stream
      audioRef.current.srcObject = stream;
      audioRef.current.play();

      // Set peers with the new peer connection
      setPeers((prevPeers) => [
        ...prevPeers,
        { peerConnection, stream },
      ]);
      console.log("stream 받음")

      // Start detecting speaking
      startSpeakingDetection(stream);
    });

    try {
      const userMediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      userMediaStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, userMediaStream);
      });
    } catch (error) {
      console.error('Error accessing user media:', error);
    }
  };

  const endVoiceChat = () => {
    setPeers([]);
    stopSpeakingDetection();
  };

  const startSpeakingDetection = (stream) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);

    javascriptNode.onaudioprocess = () => {
      const array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);

      const average = array.reduce((acc, value) => acc + value) / array.length;
      
      if (average > 50) {
        // If average volume is above a threshold (adjust as needed), consider as speaking
        // if (!isSpeakingRef.current) {
          console.log("Someone is speaking!");
          isSpeakingRef.current = true;
          // Perform any action you want when someone starts speaking
        // }
      } else {
        // If average volume is below the threshold, consider as silence
        isSpeakingRef.current = false;
        // Perform any action you want when there is silence
      }
    };
  };

  const stopSpeakingDetection = () => {
    isSpeakingRef.current = false;
    // Stop any audio analysis or cleanup resources if needed
  };

  return (
    <div>
      {peers.map((peer,index) => (
        <div>
          <audio ref={peer.audioRef} autoPlay />
          <Webcam ref={(peer.videoRef)} autoPlay />
          {index}
        </div>
      ))}
      {peers.length === 0 && (
        <button onClick={startVoiceChat}>Start Voice Chat</button>
      )}
      {peers.length > 0 && (
        <button onClick={endVoiceChat}>End Voice Chat</button>
      )}
      <Webcam audioRef={audioRef} />
    </div>
  );
};

export default WebRTCContainer;
