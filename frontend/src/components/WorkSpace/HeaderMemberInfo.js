import React, { useState } from "react";
import tw from "tailwind-styled-components";
import add from "../../assets/control/plus-large-svgrepo-com.svg";
const Container = tw.div`
 flex
 items-center
 space-x-2
`;

const AddMemberButton = tw.button`
  text-gray-900 
  bg-[#49C5B6]
  hover:bg-[#3c8d83]
  focus:ring-4 
  focus:outline-none 
  focus:ring-lime-200 
  dark:focus:ring-teal-700 
  font-medium 
  rounded-full
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

const MemberInfo = ({ memberList, openAddMemberModal }) => {
  const renderMemberList = () => {
    return memberList.map((member, index) => (
      <div key={index} className="flex items-center space-x-2">
        <span className="text-gray-900 font-medium">{member.memberName}</span>
        <img
          src={member.memberImage}
          alt={member.memberName}
          className="w-5 h-5 rounded-full"
        />
      </div>
    ));
  };

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
