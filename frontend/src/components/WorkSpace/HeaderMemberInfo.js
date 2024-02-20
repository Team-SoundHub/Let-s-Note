import React, { useState, useEffect , useRef } from "react";
import tw from "tailwind-styled-components";
import add from "../../assets/control/plus-large-svgrepo-com.svg";
import Audio from "../Audio";
import Button from "../common/Button";
const Container = tw.div`
 flex
 items-center
 space-x-2
`;

const AddMemberButton = tw.button`
  text-gray-900 
  bg-[#FFFFFF]
  hover:bg-[#AFDED5]
  focus:ring-4 
  focus:outline-none 
  focus:ring-lime-200 
  dark:focus:ring-teal-700 
  font-medium 
  rounded-full
  shadow-md
  text-sm 
  px-3
  py-3 
  text-center
  mx-1
  my-2
`;

const SvgImage = tw.img`
  w-5
  h-5
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
        <SvgImage src={add} />
      </AddMemberButton>
    </Container>
  );
};

export default MemberInfo;
