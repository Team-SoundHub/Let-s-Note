import React, { useState, useEffect , useRef } from "react";
import tw from "tailwind-styled-components";
import styled from "styled-components";
import add from "../../assets/control/plus-large-svgrepo-com.svg";
// import memberIcon from "../../assets/workspace/memberIcon2.png";
import memberIcon from "../../assets/workspace/memberIcon.png";
// import memberIcon from "../../assets/workspace/memberIcon.svg";
import Audio from "../Audio";
import Button from "../common/Button";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem; /* Approximation of space-x-2 */
`;

const AddMemberButton = styled.button`
  color: #4B5563; 
  background-color: #FFFFFF; 
  &:hover {
    background-color: #AFDED5; 
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px #A7F3D0; 
  }
  font-weight: 500; 
  border-radius: 9999px; 
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); 
  font-size: 0.875rem; 
  /* padding: 0.75rem;  */
  padding: 0.4rem; 
  text-align: center;
  margin: 0.5rem 0.25rem; 
`;

const SvgImage = styled.img`
  width: 1.8rem;
  height: 1.5rem;
  /* margin-left: -0.1rem;
  margin-right: -0.1rem; */
`;

const MemberInfo = ({ memberList, openAddMemberModal,users,localVideo, myNickname, mySoundMuted, handleMySoundMute }) => {
  const streamRef = useRef();

  const renderMemberList = () => {
    return (
      <div className="flex items-center space-x-2">
        <Button onClick={handleMySoundMute}>{mySoundMuted ? "내 소리 켜기" : "내 소리 끄기"}</Button>
        <button className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-5 py-2.5 rounded-xl dark:bg-blue-900 dark:text-blue-300">{myNickname}</button>
        {users.map((user, index) => (
          <Audio key={index} className="flex items-center space-x-2" stream={user.stream} username={user.nickname} />
        ))}
			  <audio
          muted
          ref={streamRef}
          autoPlay
        />
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
    if(localVideo) {
      streamRef.current.srcObject = localVideo;
    }
    renderMemberList();
    console.log(users);
  }, [localVideo , users, memberList]);

  return (
    <Container>
      {renderMemberList()}
      <AddMemberButton onClick={openAddMemberModal}>      
        <SvgImage src={memberIcon} />
      </AddMemberButton>
    </Container>
  );
};

export default MemberInfo;
