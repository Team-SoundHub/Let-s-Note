import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  width: 300px;
  height: 300px;
  padding: 16px;
  margin: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin: 0;
  color: #333;
  font-weight: bold;
`;

const Description = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const Members = styled.p`
  color: #666;
  font-size: 0.8rem;
`;

const EditDate = styled.p`
  color: #666;
  font-size: 0.8rem;
  text-align: right;
`;

const WorkSpaceCard = ({ spaceTitle, spaceContent, memberNicknames, updateAt }) => {
  return (
    <Card>
      <Title>{spaceTitle}</Title>
      <Description>{spaceContent}</Description>
      <Members>참여 멤버: {memberNicknames.join(', ')}</Members>
      <EditDate>최근 편집일: {new Date(updateAt).toLocaleString()}</EditDate>
    </Card>
  );
};

export default WorkSpaceCard;
