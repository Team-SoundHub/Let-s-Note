// 데모용 임시 페이지입니다 (내 스냅샷은 마이페이지 내부에 구현 예정)
import React from 'react'
import styled from 'styled-components';
import WorkSpaceCard from '../components/WorkSpace/WorkSpaceCard';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;


const MySnapshotPage = () => {
  return (    
    <div>
        <h1> 내 스냅샷 </h1>
        <WorkSpaceCard
                        spaceTitle={"geeks"}
                        spaceContent={"안녕하세요"}
                        memberNicknames={["test"]}
                        updateAt={"2024.1.29 오전 11:10:00"}
                    />
    </div>
  )
}

export default MySnapshotPage