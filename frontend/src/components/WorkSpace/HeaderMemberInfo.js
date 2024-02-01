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
        {/* <img
          src={member.memberImage}
          alt={member.memberName}
          className="w-5 h-5 rounded-full"
        /> */}
        <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          {member}
        </span>
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
