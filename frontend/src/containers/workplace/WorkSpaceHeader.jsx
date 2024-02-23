import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import tw from "tailwind-styled-components";
import styled, { keyframes } from "styled-components";
import MemberInfo from "../../components/WorkSpace/HeaderMemberInfo";
import Button from "../../components/common/Button";
import { getMyUserId } from "../../api/userIdApi";
import { deleteCursorPosition } from "../../app/slices/cursorSlice";

import memberIcon from "../../assets/workspace/memberIcon.png";
import muteIcon from "../../assets/workspace/mute.png";
import micIcon from "../../assets/workspace/mic.png";
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

const SpaceTitle = styled.div`
  flex: 1;
  text-align: center;
  color: white;
  font-size: 25px;
  font-weight: bold;
`;

const Header = styled.div`
  background-color: #49c5b6;
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
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  width: 100%; /* 부모 컨테이너(OnAirContainer)의 전체 너비를 차지 */
  height: 100%; /* 부모 컨테이너의 전체 높이를 차지 */
`;

const OnAirContainer = styled.div`
  height: 90%;
  min-width: 30%;
  padding-right: 0.5rem;
  background-color: white;
  border-radius: 20px;
  box-shadow: inset 1px 1px 1px rgba(255, 255, 255, 0.4),
    inset -1px -1px 1px rgba(0, 0, 0, 0.04), inset 0 0 0 2px #f0f0f0,
    inset -2px -2px 2px 2px rgba(255, 255, 255, 0.4),
    inset -4px -4px 4px 2px rgba(255, 255, 255, 0.4),
    -1px -1px 4px 0px rgba(255, 255, 255, 0.4),
    -2px -2px 8px 0px rgba(255, 255, 255, 0.4),
    inset 2px 2px 2px 2px rgba(0, 0, 0, 0.04),
    inset 4px 4px 4px 2px rgba(0, 0, 0, 0.04),
    1px 1px 4px 0px rgba(0, 0, 0, 0.04), 2px 2px 8px 0px rgba(0, 0, 0, 0.04);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const MicButton = styled.button`
  color: white;
  background-color: #49c5b6;
  &:hover {
    background-color: #afded5;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px #a7f3d0;
  }
  font-weight: 500;
  border-radius: 9999px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  /* padding: 0.75rem;  */
  padding: 0.4rem;
  text-align: center;
  height: 2rem;
  width: 2rem;
  margin: 0.2rem 0.2rem;
  margin-left: 1rem;
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

const AddMemberButton = styled.button`
  color: #4b5563;
  background-color: #ffffff;
  &:hover {
    background-color: #afded5;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px #a7f3d0;
  }
  font-weight: 500;
  border-radius: 9999px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;

  height: 2.4rem;
  width: 2.5rem;
  padding: 0.4rem;
  text-align: center;
  margin: 0.25rem 0.25rem;
  margin-left: 1rem;
`;

const SaveButton = styled.button`
  color: white;
  background-color: black;
  &:hover {
    background-color: #afded5;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px #a7f3d0;
  }
  font-weight: 500;
  border-radius: 5px;
  border-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  /* padding: 0.75rem;  */
  padding: 0.4rem;
  text-align: center;
  height: 2.5rem;
  width: 5rem;
  margin: 0.2rem 0.2rem;
  margin-left: 0rem;
`;

const SvgImage = styled.img`
  width: 1.8rem;
  height: 1.3rem;
  /* margin-left: -0.1rem;
  margin-right: -0.1rem; */
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
  spaceTitle,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showMessage, setShowMessage] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const accountId = sessionStorage.getItem("accountId");
  const pcsRef = useRef({});
  const localStreamRef = useRef(null);
  const localVideoRef = useRef(null);
  const [localVideo, setLocalVideo] = useState(null);
  const [users, setUsers] = useState([]);
  const [mySoundMuted, setMySoundMuted] = useState(false);
  const pc_config = {
    iceServers: [
      {
        urls: "stun:stun2.1.google.com:19302",
      },
      {
        urls: [
          "stun:" + process.env.REACT_APP_TURN_SERVER + ":3478",
          "turn:" + process.env.REACT_APP_TURN_SERVER + ":3478?transport=udp",
        ],
        username: "songarden",
        credential: "letsnote",
      },
    ],
  };

  const handleMySoundMute = () => {
    localStreamRef.current
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setMySoundMuted(!mySoundMuted);
  };

  // const spaceTitle = localStorage.getItem("title");
  useEffect(() => {
    if (!isConnected) {
      return;
    }

    const getLocalStream = async () => {
      try {
        if (!client || !mySocketId || !isConnected || !myNickname) {
          return;
        }
        const localStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
          },
        });
        setLocalVideo(localStream);
        localStreamRef.current = localStream;
        console.log("localStream 획득", localStreamRef.current);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }

        console.log("내 id in Connection:", mySocketId);
        console.log("join 전송 함");
        client.publish({
          destination: `/app/webrtc/${spaceId}/join`,
          body: JSON.stringify({
            userId: mySocketId,
            spaceId,
          }),
        });
      } catch (e) {
        console.log(`getUserMedia error: ${e}`);
      }
    };

    const createPeerConnection = (socketId, userNickname) => {
      try {
        if (socketId === mySocketId || mySocketId === null || !isConnected || myNickname === null) {
          return null;
        }
        const pc = new RTCPeerConnection(pc_config);

        pc.onicecandidate = (e) => {
          if (!e.candidate) {
            return;
          }
          console.log("onicecandidate : ", e.candidate, socketId);

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
          console.log("track event 상대한테 받았음 @@@@", e.streams[0]);
          setUsers((oldUsers) =>
            oldUsers
              .filter((user) => user.id !== socketId)
              .concat({
                id: socketId,
                stream: e.streams[0],
                nickname: userNickname,
              })
          );
        };

        if (localStreamRef.current) {
          console.log("localstream add", mySocketId, socketId);
          localStreamRef.current.getTracks().forEach((track) => {
            pc.addTrack(track, localStreamRef.current);
          });
        } else {
          console.log("no local stream");
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
                console.log("handleJoin logs - allUsers: ",allUsers);
                console.log("-----------------------------------");
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
      console.log("handleOffer 진입 전: ", mySocketId, spaceId);
      client.subscribe(
        `/user/topic/webrtc/${spaceId}/offer/public`,
        async (response) => {
          console.log("누군가 들어와서 Offer 보냄");
          const data = JSON.parse(response.body);
          console.log("handleOffer logs: ", data);
          if (data.offerSendId === mySocketId) return;
          if (!localStreamRef.current) return;
          const pc = createPeerConnection(
            data.offerSendId,
            data.offerSenderNickname
          );
          if (!pc) return;
          pcsRef.current = { ...pcsRef.current, [data.offerSendId]: pc };
          try {
            console.log(typeof data.sdp);
            await pc.setRemoteDescription(data.sdp);
            console.log("offer 저장 완료", data.sdp);
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
          }
        },
        {
          accessToken: client.connectHeaders.accessToken,
        }
      );
    };

    const handleAnswer = () => {
      console.log("handleAnswer 진입 전: ", mySocketId, spaceId);
      client.subscribe(
        `/user/topic/webrtc/${spaceId}/answer/public`,
        async (response) => {
          const data = JSON.parse(response.body);
          console.log("handleAnswer logs: ", data);
          if (data.answerSendId === mySocketId) return;
          const pc = pcsRef.current[data.answerSendId];
          if (!pc) return;
          console.log("answer 저장 시도", data.sdp);
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
          console.log("handlecand logs: ", data);
          if (data.candidateSendId === mySocketId) return;
          const pc = pcsRef.current[data.candidateSendId];
          if (!pc) return;
          console.log("ice 저장 시도", data.candidate);
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
                // -> userId 받는중
                if(data.exitUserId === mySocketId) return;
                const pc = pcsRef.current[data.exitUserId];
                if(!pc) return;
                pcsRef.current[data.exitUserId].close();
                delete pcsRef.current[data.exitUserId];
                setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.exitUserId));   

                const userId = data.exitUserId;
                dispatch(deleteCursorPosition({userId}));
                console.log("유저 삭제 성공", users);
            },
            {
                accessToken: client.connectHeaders.accessToken,
            }
        );
    };

    const pageStart = async () => {
      console.log(client, isConnected, mySocketId);
      if (!client || !mySocketId || !isConnected || !myNickname) {
        return;
      }
      // await fetchMyUsername();
      // if(!spaceId || !client || !mySocketId) return;
      console.log("subscribe Start");

      console.log("handleOffer할떄 ", isConnected, client);
      // fetchMyUsername();
      handleAnswer();
      handleIceCandidate();
      handleOffer();

      handleUserExit();
      await handleJoin();
      await getLocalStream();
    };

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

      if (localStreamRef.current) {
        // localStreamRef.current에서 모든 트랙 얻기
        const tracks = localStreamRef.current.getTracks();
      
        // 각 트랙을 중지(stop)시키기
        tracks.forEach(track => track.stop());
      
        // MediaStream 객체도 해제
        localStreamRef.current = null;
      
        // 로컬 비디오 엘리먼트의 srcObject를 비우기
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = null;
        }
      
        console.log("localStream 정지");
      };
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
        <button onClick={handleGoBack}>
          <svg
            fill="#ffffff"
            width="1.5rem"
            height="1.5rem"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 8 8"
            enable-background="new 0 0 8 8"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <rect
                x="-0.226"
                y="4.614"
                transform="matrix(0.7071 0.7071 -0.7071 0.7071 4.4884 -0.1417)"
                width="5.283"
                height="1.466"
              ></rect>{" "}
              <rect x="1.607" y="3.161" width="6.375" height="1.683"></rect>{" "}
              <rect
                x="-0.233"
                y="1.921"
                transform="matrix(0.7069 -0.7073 0.7073 0.7069 -1.1708 2.4817)"
                width="5.284"
                height="1.465"
              ></rect>{" "}
            </g>
          </svg>
        </button>
        <SpaceTitle>{spaceTitle}</SpaceTitle>
      </LeftSection>

      <RightSection>
        <OnAirContainer>
          <ContentContainer>
            <ButtonContainer>
              <MemberInfo
                memberList={memberList}
                localVideo={localVideo}
                users={users}
                myNickname={myNickname}
                mySoundMuted={mySoundMuted}
                handleMySoundMute={handleMySoundMute}
              />
            </ButtonContainer>
          </ContentContainer>
        </OnAirContainer>

        <ButtonContainer>
          <AddMemberButton onClick={openAddMemberModal}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M20 18L14 18M17 15V21M7.68213 14C8.63244 14.6318 9.77319 15 10.9999 15C11.7012 15 12.3744 14.8797 13 14.6586M10.5 21H5.6C5.03995 21 4.75992 21 4.54601 20.891C4.35785 20.7951 4.20487 20.6422 4.10899 20.454C4 20.2401 4 19.9601 4 19.4V17C4 15.3431 5.34315 14 7 14H7.5M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </AddMemberButton>
          <SaveButton onClick={onOpenModal}>저장</SaveButton>
        </ButtonContainer>
      </RightSection>
    </Header>
  );
};

export default WorkSpaceHeader;
