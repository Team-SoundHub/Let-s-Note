import React, { useEffect } from "react";
import styled from "styled-components";

import muteIcon from "../../assets/workspace/mute.png";
import micIcon from "../../assets/workspace/mic.png";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem; /* Approximation of space-x-2 */
`;

const MicButton = styled.button`
  color: white;
  background-color: ${({ mySoundMuted }) =>
    mySoundMuted ? "#cfcdcd" : "#49C5B6"};

  &:hover {
    background-color: #afded5;
  }
  /* &:focus {
    outline: none;
    box-shadow: 0 0 0 4px #A7F3D0; 
  } */
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

const UserLabel = styled.div`
  display: flex; 
  justify-content: center; 
  align-items: center; 
  background-color: #bfdbfe; 
  color: #1e40af; 
  font-size: 0.875rem; 
  font-weight: 500;   
  max-height: 2.1rem;
  padding: 0.625rem 1.25rem;  
  border-radius: 0.75rem; 
  transition: background-color 0.2s ease-in-out;
`;


const DemoHeaderMemberInfo = ({
  myNickname,
  mySoundMuted,
  handleMySoundMute,
}) => {

  const renderMemberList = () => {
    return (
      <div className="flex items-center space-x-2">
        <UserLabel>
          {myNickname}
        </UserLabel>
        <MicButton onClick={handleMySoundMute} mySoundMuted={mySoundMuted}>
          <img src={mySoundMuted ? muteIcon : micIcon} alt="sound icon" />
        </MicButton>
      </div>
    );
  };

  useEffect(() => {
    
  }, []);

  return <Container>{renderMemberList()}</Container>;
};

export default DemoHeaderMemberInfo;
