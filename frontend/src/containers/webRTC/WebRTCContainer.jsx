import { Button } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { getMyUserId } from '../../api/userIdApi';

const WebRTCContainer = ({ client, isConnected, spaceId }) => {
    const accountId = sessionStorage.getItem("accountId");
    const pcsRef = useRef({});
	const localStreamRef = useRef(null);
    const localVideoRef = useRef(null);
	const [users, setUsers] = useState([]);
    const [mySocketId,setMySocketId] = useState;

    useEffect(() => {
        const fetchMyUsername = async () => {
            try {
              const response = await getMyUserId(accountId);
              setMySocketId(response.response.username);
              console.log("내 id:", response.response.username);
            } catch (error) {
              console.error("내 id 요청 Error:", error);
            }
          };

        fetchMyUsername();
    }, []);

	const getLocalStream = useCallback(async () => {
		try {
			const localStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: true,
			});
            localStreamRef.current = localStream;
			if (localVideoRef.current) {
                localVideoRef.current.srcObject = localStream;
            };
            if(!isConnected){
                return;
            }
            client.publish({
                destination: `/app/webrtc/${spaceId}/join`,
                body: JSON.stringify({
                    userId : mySocketId,
                    spaceId,
                }),
            });
		} catch (e) {
			console.log(`getUserMedia error: ${e}`);
		}
	}, []);

	const createPeerConnection = useCallback((socketId) => {
		try {
			const pc = new RTCPeerConnection(pc_config);

			pc.onicecandidate = (e) => {
				if (!client && e.candidate){
                    return;
                }
				console.log('onicecandidate');

                client.publish({
                    destination: `/app/webrtc/${spaceId}/candidata/sendCandidate`,
                    body: JSON.stringify({
                        candidate: e.candidate,
                        candidateSendId: mySocketId,
                        candidateReceiveID: socketId,
                    })
                });
			};

			pc.ontrack = (e) => {
				console.log('ontrack success');
				setUsers((oldUsers) =>
					oldUsers
						.filter((user) => user.userId !== socketId)
						.concat({
							id: socketId,
							stream: e.streams[0],
						}),
				);
			};

			if (localStreamRef.current) {
				console.log('localstream add');
				localStreamRef.current.getTracks().forEach((track) => {
					pc.addTrack(track, localStreamRef.current);
				});
			} else {
				console.log('no local stream');
			}

			return pc;
		} catch (e) {
			console.error(e);
			return undefined;
		}
	}, []);

	useEffect(() => {
        if(!isConnected){
            return;
        }
        const handleJoin = () => {
            client.subscribe(
                `/user/topic/webrtc/${spaceId}/join`,
                (response) => {
                    const allUsers = JSON.parse(response.body);
                    allUsers.forEach(async (user) => {
                        if (!localStreamRef.current) return;
                        const pc = createPeerConnection(user.userId);
                        if (!pc) return;
                        pcsRef.current = { ...pcsRef.current, [user.userId]: pc };
                        try {
                            const offer = await pc.createOffer();
                            console.log('create offer success');
                            await pc.setLocalDescription(offer);
                            client.publish({
                                destination : `/app/webrtc/${spaceId}/offer/sendOffer`,
                                body: JSON.stringify({
                                    sdp: offer,
                                    offerSendId: mySocketId,
                                    offerReceiveId: user.userId,
                                }) 
                            });
                        } catch (e) {
                            console.error(e);
                        }
                });
            });
        };

        const handleOffer = () => {
            client.subscribe(
                `/user/topic/webrtc/${spaceId}/getOffer`,
                async (response) => {
                    const data = JSON.parse(response.body);
                    if(!localStreamRef.current) return;
                    const pc = createPeerConnection(data.offerSendId);
                    if(!pc) return;
                    pcsRef.current = { ...pcsRef.current , [data.offerSendId]: pc};
                    try{
                        await pc.setRemoteDescription(data.sdp);
                        const answer = await pc.createAnswer();
                        await pc.setLocalDescription(answer);
                        client.publish({
                            destination: JSON.stringify({
                                sdp: answer,
                                answerSendId: mySocketId,
                                answerReceiveId: data.offerSendId,
                            }),
                        });
                    } catch (error) {
                        console.error(
                            "Error during offer reception and answer process:",
                            error
                        );
                    };
                }
            );
        };
		
        const handleAnswer = () => {
            client.subscribe(
                `/user/topic/webrtc/${spaceId}/getAnswer`,
                async (response) => {
                    const data = JSON.parse(response.body);
                    const pc = pcsRef.current[answerSendId];
                    if(!pc) return;
                    pc.setRemoteDescription(data.sdp);
                }
            );
        };

        const handleIceCandidate = () => {
            client.subscribe(
                `/user/topic/webrtc/${spaceId}/getCandidiate`,
                async (response) => {
                    const data = JSON.parse(response.body);
                    const pc = pcsRef.current[data.candidateSendId];
                    if(!pc) return;
                    await pc.addIceCandidate(data.candidate);
                }
            )
        };

        const handleUserExit = () => {
            client.subscribe(
                `/topic/webrtc/${spaceId}/user/exit`,
                (response) => {
                    const data = JSON.parse(response.body);
                    const pc = pcsRef.current[data.exitUserId];
                    if(!pc) return;
                    pcsRef.current[data.exitUserId].close();
                    delete pcsRef.current[data.exitUserId];
                    setUsers((oldUsers) => oldUsers.filter((user) => user.userId !== data.exitUserId));
                }
            );
        };
        handleJoin();
        handleOffer();
        handleAnswer();
        handleIceCandidate();
        handleUserExit();

        getLocalStream();

		return () => {
			users.forEach((user) => {
				if (!pcsRef.current[user.userId]) return;
				pcsRef.current[user.userId].close();
				delete pcsRef.current[user.userId];
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createPeerConnection, getLocalStream, isConnected, spaceId, localStreamRef.current]);

	return (
		<div>
			<video
				style={{
					width: 240,
					height: 240,
					margin: 5,
					backgroundColor: 'black',
				}}
				muted
				ref={localVideoRef}
				autoPlay
			/>
			{users.map((user, index) => (
				<Video key={index} email={user.email} stream={user.stream} />
			))}
		</div>
	);
} 
  
//     return (
//       <div>
//         <Button onClick={startAudioChat}>Start Audio Chat</Button>
//       </div>
//     );
// };

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
