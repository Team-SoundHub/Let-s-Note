import { Button } from 'flowbite-react';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getMyUserId } from '../../api/userIdApi';

const WebRTCContainer = ({ client, isConnected, spaceId }) => {
    const accountId = sessionStorage.getItem("accountId");
    const pcsRef = useRef({});
	const localStreamRef = useRef(null);
    const localVideoRef = useRef(null);
	const [users, setUsers] = useState([]);
    const [mySocketId,setMySocketId] = useState(null);
    const pc_config = {
        iceServers: [
            {
                urls:['stun:stun1.1.google.com:19302' , 'stun:stun2.1.google.com:19302'],
            }
        ]
    }
    const fetchMyUsername = async () => {
        try {
          const response = await getMyUserId(accountId);
          setMySocketId(response.response.username);
          console.log("내 id:", response.response.username);
        } catch (error) {
          console.error("내 id 요청 Error:", error);
        }
    };

    const getLocalStream = useCallback (async () => {
        if(mySocketId === null) return;
        try {
            const localStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            localStreamRef.current = localStream;
            console.log("localStream 획득", localStreamRef.current);
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = localStream;
            };
            handleConnection();
        } catch (e) {
            console.log(`getUserMedia error: ${e}`);
        }
    }, [mySocketId]);

    const handleConnection = () => {
        if(mySocketId === null) {
            return;
        }
        console.log("내 id in Connection:", mySocketId);
        console.log("join 전송 함");
        client.publish({
            destination: `/app/webrtc/${spaceId}/join`,
            body: JSON.stringify({
                userId : mySocketId,
                spaceId,
            }),
        });
    };

    

    // }, []);

	// const getLocalStream = useCallback(async () => {
	// 	try {
	// 		const localStream = await navigator.mediaDevices.getUserMedia({
	// 			audio: true,
	// 			video: true,
	// 		});
    //         localStreamRef.current = localStream;
    //         console.log("localStream 획득", localStreamRef.current);
	// 		if (localVideoRef.current) {
    //             localVideoRef.current.srcObject = localStream;
    //         };
	// 	} catch (e) {
	// 		console.log(`getUserMedia error: ${e}`);
	// 	}
	// }, [localStreamRef.current]);

	const createPeerConnection = useCallback((socketId) => {
		try {
            if(socketId === mySocketId || mySocketId === null){
                return null;
            }
			const pc = new RTCPeerConnection(pc_config);

			pc.onicecandidate = (e) => {
				if (!client && e.candidate){
                    return;
                }
				console.log('onicecandidate : ',mySocketId , socketId);
                
                client.publish({
                    destination: `/app/webrtc/${spaceId}/candidata/sendCandidate`,
                    body: JSON.stringify({
                        candidate: e.candidate,
                        candidateSendId: mySocketId,
                        candidateReceiveId: socketId,
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
	}, [isConnected,client,mySocketId]);

	useEffect(() => {
        if(!isConnected){
            return;
        }
        fetchMyUsername().then(() => {
            getLocalStream();
        })

        const handleJoin = async () => {
            client.subscribe(
                `/user/topic/webrtc/${spaceId}/join/public`,
                async (response) => {
                    console.log("입장 했다. 웹소켓 받음");
                    const allUsers = JSON.parse(response.body);
                    console.log("handleJoin logs: ",allUsers.allUsers);
                    allUsers.allUsers.forEach(async (user) => {
                        console.log("user : ",user);
                        if (!localStreamRef.current){
                            console.log("no localStream");
                            return;
                        }
                        console.log("1 : ", user);
                        const pc = createPeerConnection(user.userId);
                        if (!pc) return;
                        console.log("2");
                        pcsRef.current = { ...pcsRef.current, [user.userId]: pc };
                        try {
                            const offer = await pc.createOffer();
                            console.log('create offer success');
                            await pc.setLocalDescription(offer);
                            console.log('offer전송 직전 id :' , user.userId, spaceId , mySocketId);
                            client.publish({
                                destination : `/app/webrtc/${spaceId}/offer/sendOffer`,
                                body: JSON.stringify({
                                    sdp: offer,
                                    offerSendId: mySocketId,
                                    offerReceiveId: user.userId,
                                }) 
                            });
                            console.log('offer전송 완료');
                        } catch (e) {
                            console.error(e);
                        }
                });
            },
            {
                accessToken: client.connectHeaders.accessToken,
            }
            );
        };

        const handleOffer = () => {
            client.subscribe(
                `/user/topic/webrtc/${spaceId}/offer/public`,
                async (response) => {
                    console.log("누군가 들어와서 Offer 보냄");
                    const data = JSON.parse(response.body);
                    console.log("handleOffer logs: ",data);
                    if(!localStreamRef.current) return;
                    const pc = createPeerConnection(data.offerSendId);
                    if(!pc) return;
                    pcsRef.current = { ...pcsRef.current , [data.offerSendId]: pc};
                    try{
                        await pc.setRemoteDescription(data.sdp);
                        const answer = await pc.createAnswer();
                        await pc.setLocalDescription(answer);
                        client.publish({
                            destination: `/app/webrtc/${spaceId}/answer/sendAnswer`,
                            body: JSON.stringify({
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
                },
                {
                    accessToken: client.connectHeaders.accessToken,
                }
            );
        };
		
        const handleAnswer = () => {
            client.subscribe(
                `/user/topic/webrtc/${spaceId}/answer/public`,
                async (response) => {
                    const data = JSON.parse(response.body);
                    console.log("handleAnswer logs: ",data);
                    const pc = pcsRef.current[data.answerSendId];
                    if(!pc) return;
                    pc.setRemoteDescription(data.sdp);
                },
                {
                    accessToken: client.connectHeaders.accessToken,
                }
            );
        };

        const handleIceCandidate = () => {
            client.subscribe(
                `/user/topic/webrtc/${spaceId}/candidiate/public`,
                async (response) => {
                    const data = JSON.parse(response.body);
                    console.log("handlecand logs: ",data);
                    const pc = pcsRef.current[data.candidateSendId];
                    if(!pc) return;
                    await pc.addIceCandidate(data.candidate);
                },
                {
                    accessToken: client.connectHeaders.accessToken,
                }
            )
        };

        const handleUserExit = () => {
            client.subscribe(
                `/topic/webrtc/${spaceId}/exit/public`,
                (response) => {
                    const data = JSON.parse(response.body);
                    console.log("exit logs: ",data);
                    if(data.exitUserId === mySocketId) return;
                    const pc = pcsRef.current[data.exitUserId];
                    if(!pc) return;
                    pcsRef.current[data.exitUserId].close();
                    delete pcsRef.current[data.exitUserId];
                    setUsers((oldUsers) => oldUsers.filter((user) => user.userId !== data.exitUserId));
                },
                {
                    accessToken: client.connectHeaders.accessToken,
                }
            );
        };
        console.log("subscribe Start");

        // fetchMyUsername();
        handleJoin();
        handleOffer();
        handleAnswer();
        handleIceCandidate();
        handleUserExit();

        // handleConnection();

		return () => {
			users.forEach((user) => {
				if (!pcsRef.current[user.userId]) return;
				pcsRef.current[user.userId].close();
				delete pcsRef.current[user.userId];
			});

            const sendUserExit = () => {
                client.publish({
                    destination: `/app/workspace/${spaceId}/exit/sendExit`,
                    body: JSON.stringify({
                        exitUserId : mySocketId 
                    }),
                });
            };
            
            sendUserExit();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createPeerConnection, isConnected, spaceId, localStreamRef.current, mySocketId, client]);

    

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
				<video key={index} stream={user.stream} />
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
