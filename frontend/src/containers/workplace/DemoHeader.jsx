import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import styled from "styled-components";
import MemberInfo from "../../components/WorkSpace/HeaderMemberInfo";
import DemoHeaderMemberInfo from "../../components/Demo/DemoHeaderMemberInfo";

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

const DemoHeader = ({
  onOpenModal,
  openAddMemberModal,
  memberList,
  myNickname,
  spaceTitle,
}) => {
  const navigate = useNavigate();

  const localStreamRef = useRef(null);
  const [localVideo, setLocalVideo] = useState(null);
  const [users, setUsers] = useState([]);
  const [mySoundMuted, setMySoundMuted] = useState(false);

  const handleMySoundMute = () => {
    if(localStreamRef.current){
      localStreamRef.current
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    }
    setMySoundMuted(!mySoundMuted);
  };

  useEffect(() => {
    setMySoundMuted(false);
  },[]);

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
              <DemoHeaderMemberInfo
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

export default DemoHeader;
