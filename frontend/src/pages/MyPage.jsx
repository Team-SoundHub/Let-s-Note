import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getMyPageInfo, { createWorkSpace } from '../api/myPageApi';
import WorkSpaceCard from '../components/WorkSpace/WorkSpaceCard';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const MyPage = () => {
    const [workspaces, setWorkspaces] = useState([]);  // 작업실 목록을 저장할 상태
    const [workSpaceTitle, setWorkSpaceTitle] = useState('');
    const [workSpaceDesc, setWorkSpaceDesc] = useState('');

    const navigate = useNavigate();

    const accessToken = localStorage.getItem("access");
    const accountId = localStorage.getItem("accountId");

    useEffect(() => {
        const fetchMyPageInfo = async () => {
            try {
                const response = await getMyPageInfo(accountId);
                console.log(response)
                console.log("마이페이지 인포 받음");
                setWorkspaces(response.response);  // API 응답으로 받은 작업실 목록을 상태에 저장
            } catch (error) {
                console.error('마이페이지 정보 로드 실패:', error);
            }
        };
        fetchMyPageInfo();
    }, [accessToken, accountId]);

    // 작업실 생성 함수
    const handleCreateWorkSpace = async (event) => {
        event.preventDefault(); // 페이지 새로고침 방지
        console.log("호출됨");
        try {
            // 세번째 빈 배열은 멤버 추가 기능 구현 후에 수정
            const response = await createWorkSpace(workSpaceTitle, workSpaceDesc, []);
            console.log("작업실 생성 응답:", response);
    
            // 방 생성 모달, 멤버 추가 기능 구현 필요

            if(response){
                console.log("작업실 생성 완료");
            } else{
                console.log("작업실 생성 완료될뻔 했는데 안됨");                
            }
    
            navigate(`/workspace/${response.spaceId}`);
        } catch (error) {
            console.error("작업실 생성 오류:", error);
        }
    }

    // spaceId를 순회하면서 id, index를 얻을 수 있다는 가정
    return (
        <div>
            <h1>MyPage</h1>
            <form onSubmit={handleCreateWorkSpace}>
                <h2>새 작업실 만들기</h2>
                <input
                    type="text"
                    placeholder="작업실 이름"
                    value={workSpaceTitle}
                    onChange={e => setWorkSpaceTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="작업실 설명 (옵션)"
                    value={workSpaceDesc}
                    onChange={e => setWorkSpaceDesc(e.target.value)}
                />
                <button type="submit">새 작업실</button>
            </form>
            <h2> 내 작업실 </h2>
            {workspaces.map((workspace, index) => (
                <div key={workspace.spaceId} onClick={() => navigate(`/workspace/${workspace.spaceId}`)}>                    
                    <WorkSpaceCard
                        spaceTitle={workspace.spaceTitle}
                        spaceContent={workspace.spaceContent}
                        memberNicknames={workspace.memberNicknames}
                        updateAt={workspace.updateAt}
                    />
                </div>
            ))}
        </div>
    );
};

export default MyPage;
