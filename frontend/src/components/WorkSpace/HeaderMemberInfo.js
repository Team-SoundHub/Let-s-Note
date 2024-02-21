import React, { useState, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import styled from "styled-components";

import muteIcon from "../../assets/workspace/mute.png";
import micIcon from "../../assets/workspace/mic.png";

import Audio from "../Audio";
import Button from "../common/Button";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem; /* Approximation of space-x-2 */
`;

const MicButton = styled.button`
  color: white; 
  /* background-color: ${({ mySoundMuted }) => (mySoundMuted ? '#A7F3D0' : '#F0564A')};  */
  /* background-color: ${({ mySoundMuted }) => (mySoundMuted ? '#A7F3D0' : '#cfcdcd')};  */
  background-color: ${({ mySoundMuted }) => (mySoundMuted ? '#cfcdcd' : '#A7F3D0')}; 

  /* background-color: #A7F3D0; */

  &:hover {
    background-color: #AFDED5; 
  }
  /* &:focus {
    outline: none;
    box-shadow: 0 0 0 4px #A7F3D0; 
  } */
  font-weight: 500; 
  border-radius: 9999px; 
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); 
  font-size: 0.875rem; 
  /* padding: 0.75rem;  */
  padding: 0.4rem;   
  text-align: center;
  height: 2rem;
  width: 2rem;  
  margin: 0.2rem 0.2rem; 
  margin-left: 1rem;
`;


const ContentContainer = styled.div`
  display: flex;
  justify-content: flex-end; 
  width: 100%; 
  height: 100%; 
`;


const MemberInfo = ({ memberList, users, localVideo, myNickname, mySoundMuted, handleMySoundMute }) => {
  const streamRef = useRef();

  const renderMemberList = () => {
    return (
      <div className="flex items-center space-x-2">
        <button className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-5 py-2.5 rounded-xl dark:bg-blue-900 dark:text-blue-300">{myNickname}</button>
        {users.map((user, index) => (
          <Audio key={index} className="flex items-center space-x-2" stream={user.stream} username={user.nickname} />
        ))}
        <audio
          muted
          ref={streamRef}
          autoPlay
        />
        <MicButton
          onClick={handleMySoundMute}
          mySoundMuted={mySoundMuted}
        >
          <img src={mySoundMuted ? muteIcon : micIcon } alt="sound icon" />
        </MicButton>
      </div>
    );
    // return memberList.map((member, index) => (
    //   <div key={index} className="flex items-center space-x-2">
    //     {/* <img
    //       src={member.memberImage}
    //       alt={member.memberName}
    //       className="w-5 h-5 rounded-full"
    //     /> */}
    //     <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-5 py-2.5 rounded-xl dark:bg-blue-900 dark:text-blue-300">
    //       {member}
    //     </span>
    //   </div>
    // ));
  };

  useEffect(() => {
    if (localVideo) {
      streamRef.current.srcObject = localVideo;
    }
    renderMemberList();
    console.log(users);
  }, [localVideo, users, memberList]);

  return (
    <Container>
      {renderMemberList()}
    </Container>
  );
};

export default MemberInfo;
