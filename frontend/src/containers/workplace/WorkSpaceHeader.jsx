import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import styled, { keyframes } from "styled-components";
import MemberInfo from "../../components/WorkSpace/HeaderMemberInfo";
import Button from "../../components/common/Button";
import { getMyUserId } from "../../api/userIdApi";
// 메시지가 나타나는 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 메시지가 사라지는 애니메이션
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

// const Header = styled.div`
//   background-color: #f3f3f3;
//   padding: 10px 20px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-bottom: 1px solid #ddd;
//   height: 7vh;
// `;

const SpaceTitle = styled.div`
  flex: 1;
  text-align: center;
  color: grey;
  font-size: 25px;
  font-weight: bold;
`;

const Header = styled.div`
  background-color: #f3f3f3;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  height: 7vh;
`;

const LeftSection = tw.div`
flex
items-center
justify-center
gap-4
`;

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const SnapshotButton = styled.button`
  width: 70px;
  height: 70px;

  background-color: #3498db;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;

  &:hover {
    transform: scale(1.1);
  }
`;

const Message = styled.div`
  color: grey;
  padding: 5px 10px;
  position: fixed;
  top: 20px;
  left: 30rem;
  border-radius: 4px;
  display: ${({ show }) => (show ? "block" : "none")};
  animation: ${({ show }) => (show ? fadeIn : fadeOut)} 0.5s ease-out;
  animation-fill-mode: forwards; // 애니메이션 종료 후 최종 상태 유지
`;

const WorkSpaceHeader = ({
  onOpenModal,
  isSnapshotExist,
  openAddMemberModal,
  memberList,
  client,
  isConnected,
  spaceId,
  myNickname,
  mySocketId,
}) => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const accountId = sessionStorage.getItem("accountId");
  const pcsRef = useRef({});
	const localStreamRef = useRef(null);
  const localVideoRef = useRef(null);
  const [localVideo,setLocalVideo] = useState(null);
	const [users, setUsers] = useState([]);
  const [mySoundMuted , setMySoundMuted] = useState(false);
  const pc_config = {
      iceServers: [
          {
              urls: "stun:stun2.1.google.com:19302"
          },
      ]
  }

  const handleMySoundMute = () => {
    localStreamRef.current.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    setMySoundMuted(!mySoundMuted);
  }

  const spaceTitle = localStorage.getItem("title");
  useEffect(() => {

    if(!isConnected){
        return;
    }

    const getLocalStream = async () => {
        try {
            if(!client || !mySocketId || !isConnected) {
                return;
            }
            const localStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                  echoCancellation: true,
                  noiseSuppression: true,
                }
            });
            setLocalVideo(localStream);
            localStreamRef.current = localStream;
            console.log("localStream 획득", localStreamRef.current);
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = localStream;
            };
            
            console.log("내 id in Connection:", mySocketId);
            console.log("join 전송 함");
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
    };

    const createPeerConnection = (socketId, userNickname) => {
        try {
            if(socketId === mySocketId || mySocketId === null || !isConnected){
                return null;
            }
            const pc = new RTCPeerConnection(pc_config);

            pc.onicecandidate = (e) => {
                if (!e.candidate){
                    return;
                }
                console.log('onicecandidate : ', e.candidate, socketId);
                
                client.publish({
                    destination: `/app/webrtc/${spaceId}/candidate/sendCandidate`,
                    body: JSON.stringify({
                        candidate: e.candidate,
                        candidateSendId: mySocketId,
                        candidateReceiveId: socketId,
                    }),
                });
            };

            pc.ontrack = (e) => {
                console.log('track event 상대한테 받았음 @@@@', e.streams[0]);
                setUsers((oldUsers) =>
                    oldUsers
                        .filter((user) => user.id !== socketId)
                        .concat({
                            id: socketId,
                            stream: e.streams[0],
                            nickname: userNickname,
                        }),
                );
            };

            if (localStreamRef.current) {
                console.log('localstream add' , mySocketId , socketId);
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
    };

    const handleJoin = async () => {
        console.log("handleJoin 진입 전 my socket Id ? : " , mySocketId, spaceId);
        client.subscribe(
            `/user/topic/webrtc/${spaceId}/join/public`,
            async (response) => {
                console.log("입장 했다. 웹소켓 받음");
                const allUsers = JSON.parse(response.body);
                console.log("handleJoin logs: ",allUsers.allUsers);
                allUsers.allUsers.forEach(async (user) => {
                    if(user.userId !== mySocketId){
                    console.log("user : ",user);
                    if (!localStreamRef.current){
                        console.log("no localStream");
                        return;
                    }
                    console.log("1 : ", user);
                    const pc = createPeerConnection(user.userId, user.userNickname);
                    if (!pc) return;
                    pcsRef.current = { ...pcsRef.current, [user.userId]: pc };
                    try {
                        const offer = await pc.createOffer();
                        await pc.setLocalDescription(offer);
                        console.log('create offer success : ' , offer);
                        console.log('offer전송 직전 id :' , user.userId, spaceId , mySocketId);
                        client.publish({
                            destination: `/app/webrtc/${spaceId}/offer/sendOffer`,
                            body: JSON.stringify({
                                sdp: offer,
                                offerSendId: mySocketId,
                                offerReceiveId: user.userId,
                                offerSenderNickname: myNickname,
                            }),
                        });
                        console.log('offer전송 완료');
                        // )};
                    } catch (e) {
                        console.error(e);
                    }}
                });
            },
            {
                accessToken: client.connectHeaders.accessToken,
            }
        );
    };

    const handleOffer = async () => {
        console.log("handleOffer 진입 전: ",mySocketId, spaceId);
        client.subscribe(
            `/user/topic/webrtc/${spaceId}/offer/public`,
            async (response) => {
                console.log("누군가 들어와서 Offer 보냄");
                const data = JSON.parse(response.body);
                console.log("handleOffer logs: ",data);
                if(data.offerSendId === mySocketId) return;
                if(!localStreamRef.current) return;
                const pc = createPeerConnection(data.offerSendId, data.offerSenderNickname);
                if(!pc) return;
                pcsRef.current = { ...pcsRef.current , [data.offerSendId]: pc};
                try{
                    console.log(typeof(data.sdp));
                    await pc.setRemoteDescription(data.sdp);
                    console.log("offer 저장 완료",data.sdp);
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
        console.log("handleAnswer 진입 전: ",mySocketId, spaceId);
        client.subscribe(
            `/user/topic/webrtc/${spaceId}/answer/public`,
            async (response) => {
                
                const data = JSON.parse(response.body);
                console.log("handleAnswer logs: ",data);
                if(data.answerSendId === mySocketId) return;
                const pc = pcsRef.current[data.answerSendId];
                if(!pc) return;
                console.log("answer 저장 시도",data.sdp);
                await pc.setRemoteDescription(data.sdp);
                
            },
            {
                accessToken: client.connectHeaders.accessToken,
            }
        );
    };

    const handleIceCandidate = () => {
        console.log(2);
        client.subscribe(
            `/user/topic/webrtc/${spaceId}/candidate/public`,
            async (response) => {
                const data = JSON.parse(response.body);
                console.log("handlecand logs: ",data);
                if(data.candidateSendId === mySocketId) return;
                const pc = pcsRef.current[data.candidateSendId];
                if(!pc) return;
                console.log("ice 저장 시도",data.candidate);
                await pc.addIceCandidate(data.candidate);
            },
            {
                accessToken: client.connectHeaders.accessToken,
            }
        );
    };

    const handleUserExit = () => {
        client.subscribe(
            `/user/topic/webrtc/${spaceId}/exit/public`,
            (response) => {
                const data = JSON.parse(response.body);
                console.log("exit logs: ",data);
                if(data.exitUserId === mySocketId) return;
                const pc = pcsRef.current[data.exitUserId];
                if(!pc) return;
                pcsRef.current[data.exitUserId].close();
                delete pcsRef.current[data.exitUserId];
                setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.exitUserId));
                console.log("유저 삭제 성공", users);
            },
            {
                accessToken: client.connectHeaders.accessToken,
            }
        );
    };

    

    
    const pageStart = async () => {
        console.log(client , isConnected , mySocketId);
        // await fetchMyUsername();
        // if(!spaceId || !client || !mySocketId) return;
        console.log("subscribe Start");

        
        
        console.log("handleOffer할떄 ", isConnected,client);
        // fetchMyUsername();
        handleAnswer();
        handleIceCandidate();
        handleOffer();
        
        handleUserExit();
        await handleJoin();
        await getLocalStream();
    }

    pageStart();
    
    // fetchMyUsername().then(() => {
    //     getLocalStream();
    // })

    // handleConnection();

    return () => {
    users.forEach((user) => {
      if (!pcsRef.current[user.userId]) return;
      pcsRef.current[user.userId].close();
      delete pcsRef.current[user.userId];
    });
          
          setUsers([]);
      };
  }, [isConnected, client, spaceId, mySocketId, myNickname]);


  // 방장인지 여부 체크하고 발매하기 버튼 보이기/ 안보이기 추가
  // 이미 발매했는지 여부 확인하고 발매하기/ 수정하기 추가

  // const handleCreateSnapShot = () => {
  //     navigate('/mysnapshot')
  // }
  // }

  // const handleCreateSnapShot = async() => {
  //     try {
  //         const response = await createSnapshot(spaceId);
  //         console.log(response);
  //     } catch (error) {
  //         console.error('발매하기 오류:', error);
  //     }
  // }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowMessage(true);
    setDisplayMessage(true);

    setTimeout(() => {
      // 메시지 애니메이션 시작
      setShowMessage(false);

      setTimeout(() => {
        // 애니메이션이 완료된 후 display 상태 변경
        setDisplayMessage(false);
      }, 500); // 이 시간은 애니메이션 지속 시간과 동일하게 설정
    }, 2000);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Header>
      <LeftSection>
        <button onClick={handleGoBack}>⬅️</button>
        <SpaceTitle>{spaceTitle}</SpaceTitle>
      </LeftSection>

      <RightSection>
        <ButtonContainer>
          <MemberInfo
            memberList={memberList}
            openAddMemberModal={openAddMemberModal}
            localVideo = {localVideo}
            users = {users}
            myNickname = {myNickname}
            mySoundMuted = {mySoundMuted}
            handleMySoundMute={handleMySoundMute}
          />
        </ButtonContainer>
        <ButtonContainer>
          <Button className="rounded-full" onClick={onOpenModal}>
            저장
          </Button>
        </ButtonContainer>
      </RightSection>
    </Header>
  );
};

export default WorkSpaceHeader;
