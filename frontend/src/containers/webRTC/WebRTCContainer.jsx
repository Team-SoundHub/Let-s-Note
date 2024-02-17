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

    useEffect(() => {
        return () => {
            const sendUserExit = () => {
                if(client){
                    client.publish({
                        destination: `/app/webrtc/${spaceId}/exit/sendExit`,
                        body: JSON.stringify({
                            exitUserId : mySocketId 
                        }),
                    });
                }
            };
            
            sendUserExit();
            setUsers([]);
        };
    },[]);

    const fetchMyUsername = async () => {
        try {
          const response = await getMyUserId(accountId);
          setMySocketId(response.response.username);
          console.log("내 id:", response.response.username);
        } catch (error) {
          console.error("내 id 요청 Error:", error);
        }
    };

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
    }, [mySocketId, handleConnection]);


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
                    destination: `/app/webrtc/${spaceId}/candidate/sendCandidate`,
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
	}, [isConnected,client,mySocketId,spaceId]);

	useEffect(() => {
        if(!isConnected){
            return;
        }

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
                            if(user.userId !== mySocketId){
                                client.publish({
                                    destination : `/app/webrtc/${spaceId}/offer/sendOffer`,
                                    body: JSON.stringify({
                                        sdp: offer,
                                        offerSendId: mySocketId,
                                        offerReceiveId: user.userId,
                                    }) 
                                });
                                console.log('offer전송 완료');
                            }
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
        
        console.log("handleOffer할떄 ", isConnected,client);
        handleOffer();
        handleAnswer();
        handleIceCandidate();
        handleUserExit();
        handleJoin();
        fetchMyUsername().then(() => {
            getLocalStream();
        })

        // handleConnection();

		return () => {
			users.forEach((user) => {
				if (!pcsRef.current[user.userId]) return;
				pcsRef.current[user.userId].close();
				delete pcsRef.current[user.userId];
			});

		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createPeerConnection, isConnected, spaceId, mySocketId, client]);

    

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

export default WebRTCContainer;

