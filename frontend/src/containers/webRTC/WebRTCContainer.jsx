import { Button } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { getMyUserId } from '../../api/userIdApi';

const WebRTCContainer = ({ client, isConnected, spaceId }) => {
    const [localStream, setLocalStream] = useState(null);
    const [sendingConnection, setSendingConnection] = useState(null);
    const [username, setUsername] = useState(null);
    const accountId = sessionStorage.getItem("accountId");
    const iceServers = [
        { 
            urls : ['stun:stun1.1.google.com:19302','stun:stun2.1.google.com:19302']
        }
      ];
  
    useEffect(() => {
      const startAudio = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true , video: true});
          setLocalStream(stream);
        } catch (error) {
          console.error('Error accessing media devices:', error);
        }
      };

      const fetchMyUsername = async () => {
        try {
          const response = await getMyUserId(accountId);
          setUsername(response.response.username);
          console.log("내 id:", response.response.username);
        } catch (error) {
          console.error("내 id 요청 Error:", error);
        }
      };

      fetchMyUsername();
      startAudio();
  
      return () => {
        if (localStream) {
          localStream.getTracks().forEach((track) => {
            track.stop();
          });
        }
      };
    }, []);
  
    useEffect(() => {
        console.log('Connected to WebRTC server');
  
        client.subscribe(`/user/topic/offer/${spaceId}`, (response) => {
          const { senderId, offer } = JSON.parse(response.body);
          handleOffer(senderId, offer);
        },
        {
            accessToken: client.connectHeaders.accessToken,
        });
  
        client.subscribe(`/user/topic/answer/${spaceId}`, (response) => {
          const { answerId, answer } = JSON.parse(response.body);
          handleAnswer(answerId, answer);
        },
        {
            accessToken: client.connectHeaders.accessToken,
        });
  
        client.subscribe(`/user/topic/iceCandidate/${spaceId}`, (response) => {
          const { senderId, iceCandidate } = JSON.parse(response.body);
          handleIceCandidate(senderId, iceCandidate);
        },
        {
            accessToken: client.connectHeaders.accessToken,
        });
  
        return () => {
            if (client.connected) {
                client.disconnect();
            }
        };
    }, [spaceId]);
  
    const createPeerConnection = async (senderId) => {
      
      const pc = new RTCPeerConnection(iceServers);
      const remoteStream = new MediaStream();

      pc.addEventListener('track', (event) => {
        // const remoteAudio = new Audio();
        // remoteAudio.srcObject = event.streams[0];
        // remoteAudio.play();
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
        })
      });

      if (localStream) {
        await localStream.getTracks().forEach(async (track) => {
            pc.addTrack(track, localStream);
        });
      }
  
      
  
      pc.addEventListener('icecandidate', async (event) => {
        if (event.candidate) {
            client.publish({
                destination: `/app/iceCandidate/${spaceId}`,
                body: JSON.stringify({
                    senderId,
                    iceCandidate: event.candidate,
                }),
            });
        //   stompClientRef.current.send(`/app/iceCandidate/${spaceId}`, {
        //     'Content-Type': 'application/json',
        //   }, JSON.stringify({ sender, iceCandidate: event.candidate }));
        }
      });
      
  
      return pc;
    };
  
    const handleOffer = (senderId, offer) => {
    //   const pc = createPeerConnection(senderId);
      const pc = createPeerConnection()
      sendingConnection.setRemoteDescription(new RTCSessionDescription(offer));
  
      sendingConnection.createAnswer().then((answer) => {
        sendingConnection.setLocalDescription(answer);
        client.publish({
            destination: `/app/answer/${spaceId}`,
            body: JSON.stringify({
                receiverId : senderId,
                answer,
            }),
        });
        // stompClientRef.current.send(`/app/answer/${spaceId}`, {
        //   'Content-Type': 'application/json',
        // }, JSON.stringify({ sender, answer }));
      });
  
    //   setPcListMap((prevMap) => new Map(prevMap.set(senderId, pc)));
    };
  
    const handleAnswer = async (answer) => {
      try{
        await sendingConnection.setRemoteDescription(new RTCSessionDescription(answer));
      } catch (e) {
        console.log(e);
      }
    };
  
    const handleIceCandidate = (senderId, iceCandidate) => {
        if(sendingConnection.remoteDescription != null){
            sendingConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
        }
        
    };
  
    const startAudioChat = async () => {
        if (isConnected) {
          const pc = createPeerConnection(username);
          setSendingConnection(pc);
        //   setPcListMap((prevMap) => new Map(prevMap.set(username, pc)));
      
          // offer 생성
          const offer = await sendingConnection.createOffer();
      
          // 로컬에 offer 저장
          await sendingConnection.setLocalDescription(offer);
      
          // 시그널링 서버에 offer 전송
          await client.publish({
            destination: `app/offer/${spaceId}`,
            body: JSON.stringify({
              offer,
              senderId : username
            }),
          });
        }
      };
      
  
    return (
      <div>
        <Button onClick={startAudioChat}>Start Audio Chat</Button>
      </div>
    );
};

export default WebRTCContainer;

// // VoiceChatContainer.js
// import React, { useEffect, useRef, useState } from 'react';
// import SimplePeer from 'simple-peer';
// import Webcam from 'react-webcam';

// const WebRTCContainer = ({ client, children, spaceId, isConnected }) => {
//   const [peers, setPeers] = useState([]);
//   const audioRef = useRef(null);
//   const isSpeakingRef = useRef(false);

//   useEffect(() => {
//     return () => {
//       endVoiceChat();
//     };
//   }, []);

//   useEffect(() => {
//     if (isConnected) {
//       client.subscribe(`/topic/offer/${spaceId}`, (signal) => {
//         const offer = JSON.parse(signal.body);
//         const peerConnection = new SimplePeer({
//           initiator: false,
//           trickle: false,
//         });
//         console.log("소켓 받았음.");
//         console.log(offer);
//         peerConnection.signal(offer);
//         setPeers((prevPeers) => [...prevPeers, {peerConnection, stream: null}]);
//       }, {
//         accessToken: client.connectHeaders.accessToken,
//       });
//     }
//   }, [isConnected]);

//   const startVoiceChat = async () => {
//     const peerConnection = new SimplePeer({ initiator: true, trickle: false });

//     peerConnection.on('signal', (signal) => {
//       client.publish({
//         destination: `/app/offer/${spaceId}`,
//         body: JSON.stringify(signal),
//       });
//       console.log("소켓 전송함.");
//       console.log(signal);
//     });

//     try {
//         const userMediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
//         userMediaStream.getTracks().forEach((track) => {
//           peerConnection.addTrack(track, userMediaStream);
//         });
//       } catch (error) {
//         console.error('Error accessing user media:', error);
//       }

//     peerConnection.on('track', async (event) => {
//         const [remoteStream] = event.streams;
//         audioRef.srcObject = remoteStream;
//         audioRef.play();
//         console.log("track");

//         setPeers((prevPeers) => [
//             ...prevPeers,
//             { peerConnection, remoteStream },
//           ]);
        
//     })

//     peerConnection.on('stream', (stream) => {
//       // Handle the incoming audio stream
//       console.log("stream coming");
//       audioRef.srcObject = stream;
//       audioRef.play();

//       // Set peers with the new peer connection
//       setPeers((prevPeers) => [
//         ...prevPeers,
//         { peerConnection, stream },
//       ]);
//       console.log("stream 받음")

//       // Start detecting speaking
//       startSpeakingDetection(stream);
//     });

    
//   };

//   const endVoiceChat = () => {
//     peers.forEach((peer) => {
//         peer.peerConnection.destroy();
//       });
//     setPeers([]);
//     stopSpeakingDetection();
//   };

//   const startSpeakingDetection = (stream) => {
//     const audioContext = new AudioContext();
//     const analyser = audioContext.createAnalyser();
//     const microphone = audioContext.createMediaStreamSource(stream);
//     const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

//     analyser.smoothingTimeConstant = 0.8;
//     analyser.fftSize = 1024;

//     microphone.connect(analyser);
//     analyser.connect(javascriptNode);
//     javascriptNode.connect(audioContext.destination);

//     javascriptNode.onaudioprocess = () => {
//       const array = new Uint8Array(analyser.frequencyBinCount);
//       analyser.getByteFrequencyData(array);

//       const average = array.reduce((acc, value) => acc + value) / array.length;
      
//       if (average > 50) {
//         // If average volume is above a threshold (adjust as needed), consider as speaking
//         // if (!isSpeakingRef.current) {
//           console.log("Someone is speaking!");
//           isSpeakingRef.current = true;
//           // Perform any action you want when someone starts speaking
//         // }
//       } else {
//         // If average volume is below the threshold, consider as silence
//         isSpeakingRef.current = false;
//         // Perform any action you want when there is silence
//       }
//     };
//   };

//   const stopSpeakingDetection = () => {
//     isSpeakingRef.current = false;
//     // Stop any audio analysis or cleanup resources if needed
//   };

//   return (
//     <div>
//       {peers.map((peer,index) => (
//         <div key={index}>
//           <audio ref={audioRef => {
//             if(audioRef){
//                 audioRef.srcObject = peer.stream;
//             }
//             }} autoPlay />
//           <Webcam audioRef={(audioRef)} autoPlay />
//           {index}
//         </div>
//       ))}
//       {peers.length === 0 && (
//         <button onClick={startVoiceChat}>Start Voice Chat</button>
//       )}
//       {peers.length > 0 && (
//         <button onClick={endVoiceChat}>End Voice Chat</button>
//       )}
//       <Webcam audioRef={audioRef} />
//     </div>
//   );
// };

// export default WebRTCContainer;
