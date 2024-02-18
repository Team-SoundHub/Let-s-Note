import React from 'react';
import styled from 'styled-components';
import crown from './crown-svgrepo-com.svg';

const TileStyled = styled.div`
  flex: none;
  width: 20rem;
  height: 23rem;
  margin: 10px;
  background-color: rgba(255, 255, 255, 0.8); 
  /* background-color: rgba(131, 131, 131, 0.3);  */
  display: inline-block;
  background-size: cover;
  position: relative;
  cursor: pointer;  
  transition: all 0.4s ease-out;
  box-shadow: 0px 35px 77px -17px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  color: black;
  border-radius: 45px;
  font-family: 'Roboto';
  

  &:hover {    
    box-shadow: 0px 35px 77px -17px rgba(0, 0, 0, 0.45);
    transform: scale(1.02);    
    /* filter: brightness(0.5) blur(1px); */

    img {
      opacity: 0.2;
    }

    .animate-text {
      opacity: 1;
      transform: translateX(0);      
    }

    span {
      opacity: 1;
      transform: translateY(0px);
    }

  }

`;

const TileImg = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  transition: all 0.4s ease-out;
`;

const Text = styled.div`
  position: absolute;
  padding: 30px;
  height: calc(100% - 60px);
  text-align: left; 
`;

const Heading1 = styled.h1`  
  font-weight: 900;
  margin: 0;
  /* text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3); */  
  font-size: 1.3rem;  
  color: black;
  text-align: left; 
`;

const Heading2 = styled.h2`
  font-weight: 1000;
  font-size: 1.3rem;
  margin: 20px 0 0 0;  
  /* transform: translateY(3rem); */
  opacity: 1;
  /* transition: all 0.6s ease-in-out; */
`;

const Paragraph = styled.p`
  font-weight: 700;
  margin: 20px 0 0 0;
  line-height: 25px;
  /* transform: translateX(-200px); */
  transition-delay: 0.2s;
  opacity: 1;
  transition: all 0.6s ease-in-out;
`;

const Dots = styled.div`
  position: absolute;
  bottom: 20px;
  right: 0rem;
  width: 6rem;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  transform: translateY(150%); 
  opacity: 0; 
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;

  ${TileStyled}:hover & {
    transform: translateY(220%); 
    opacity: 1; 
  }

  span {
    width: 5px;
    height: 5px;
    background-color: currentColor;
    border-radius: 50%;
    display: block;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #fff; // 호버 시에 색상 변경
    }
  }

  &::before {
      content: '';
      position: absolute;
      top: 100%;
      left: 1.1rem;
      width: 0;
      height: 2px;
      background: black;
      transition: 0.3s;
    }

    &:hover::before {
      width: 62%;
    }
`;


const MemberListTitle = styled.p`
  font-weight: 700;
  margin: 20px 0rem -1rem 0;
  line-height: 25px;
  /* transform: translateX(-200px); */
  transition-delay: 0.2s;
  opacity: 1;
  transition: all 0.6s ease-in-out;
`;


// const MembersList = styled.ul`
//   margin-top: 16px;
//   margin-bottom: 16px;
//   width: 16.2rem;
//   max-height: 80%;
//   background-color: red;
//   border-radius: 5px;
// `;

const MembersList = styled.ul`
  margin-top: 16px;
  margin-bottom: 16px;
  overflow-y: auto; 
  max-height: 80%; 
  width: 16.2rem;
  padding-right: 0.5rem; // Adds some space for the scrollbar
  border-radius: 5px;
  /* box-shadow: inset 0 0 5px rgba(0,0,0,0.2); // Adds subtle inner shadow to indicate depth */
  /* background-color: #f3f4f6; // Adjusted for better visibility against the crown icon */
`;

const MemberItem = styled.li`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
`;


const MemberNicknameSpan = styled.span`
  display: flex;
  /* width: 15rem; */
  width: 90%;
  align-items: center;
  border-radius: 0.375rem; 
  background-color: #f3f4f6;
  padding: 0.75rem; 
  font-size: 0.875rem; 
  font-weight: bold; 
  color: #1f2937; 
  &:hover {
    background-color: #84c4bd; 
    box-shadow: 0 10px 15px -3px rgba(230, 113, 113, 0.1), 0 4px 6px -2px rgba(231, 145, 145, 0.05); 
  }  
`;

const CrownIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 8px;
  z-index: 1000;
`;

const EditDate = styled.p`
  color: #4b5563; 
  font-size: 0.875rem; 
  margin-top: auto; 
`;

export const WorkspaceTile = ({
  workspaceTitle,
  workspaceContent,
  ownerNickname,
  memberNicknames,
  updateAt,
}) => {
  return (
    <TileStyled>
      <Text>
        <Heading1>{workspaceTitle}</Heading1>
        <Paragraph>{workspaceContent}</Paragraph> 
        <MemberListTitle>참여 멤버</MemberListTitle> 
        <MembersList>
          {memberNicknames.map((member, index) => (
            <MemberItem key={index}>
              <MemberNicknameSpan>{member}
                {member === ownerNickname && <CrownIcon src={crown} alt="Owner" />}
              </MemberNicknameSpan>
            </MemberItem>
          ))}
        </MembersList>
        <EditDate> {new Date(updateAt).toLocaleString()}</EditDate>
        <Dots> 삭제하기 </Dots>
      </Text>
    </TileStyled>
  );
};