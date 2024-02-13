import { Button } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';

const WebRTCContainer = ({ client, isConnected, spaceId }) => {
    const [localStream, setLocalStream] = useState(null);
    const [pcListMap, setPcListMap] = useState(new Map());
    const stompClientRef = useRef(null);
    const audioRef = useRef(new Audio());
    const accessToken = sessionStorage.getItem("access");
    const accountId = sessionStorage.getItem("accountId");
  
    useEffect(() => {
      const startAudio = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          setLocalStream(stream);
        } catch (error) {
          console.error('Error accessing media devices:', error);
        }
      };
  
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
          const { senderId, answer } = JSON.parse(response.body);
          handleAnswer(senderId, answer);
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
  
    const createPeerConnection = (senderId) => {
      const iceServers = [
        { urls : 'stun:stun.l.google.com:19302' },
      ];
      const pc = new RTCPeerConnection(iceServers);
  
      pc.addEventListener('icecandidate', (event) => {
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
  
      pc.addEventListener('track', (event) => {
        const remoteAudio = new Audio();
        remoteAudio.srcObject = event.streams[0];
        remoteAudio.play();
      });
  
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
        });
      }
  
      return pc;
    };
  
    const handleOffer = (senderId, offer) => {
      const pc = createPeerConnection(senderId);
      pc.setRemoteDescription(new RTCSessionDescription(offer));
  
      pc.createAnswer().then((answer) => {
        pc.setLocalDescription(answer);
        client.publish({
            destination: `/app/answer/${spaceId}`,
            body: JSON.stringify({
                senderId,
                answer,
            }),
        });
        // stompClientRef.current.send(`/app/answer/${spaceId}`, {
        //   'Content-Type': 'application/json',
        // }, JSON.stringify({ sender, answer }));
      });
  
      setPcListMap((prevMap) => new Map(prevMap.set(senderId, pc)));
    };
  
    const handleAnswer = (senderId, answer) => {
      const pc = pcListMap.get(senderId);
      if (pc) {
        pc.setRemoteDescription(new RTCSessionDescription(answer));
      }
    };
  
    const handleIceCandidate = (senderId, iceCandidate) => {
      const pc = pcListMap.get(senderId);
        pc.addIceCandidate(new RTCIceCandidate(iceCandidate));
    };
  
    const startAudioChat = async () => {
      //진입한 유저가 offer를 생성 후 저장한 다음 채팅방에 존재하는 유저들에게 send하도록 구현
      if(isConnected){
        const offer = await createPeerConnection(accountId).createOffer();
        await client.publish({
            destination: `app/offer/${spaceId}`,
            body: JSON.stringify({
                offer,
            }),
        });
      };
    };
  
    return (
      <div>
        <Button onClick={startAudioChat}>Start Audio Chat</Button>
      </div>
    );
};

export default WebRTCContainer;
