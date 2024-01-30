import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getMyPageInfo, { createWorkSpace } from '../api/myPageApi';
import styled from 'styled-components';
import WorkSpaceCard from '../components/WorkSpace/WorkSpaceCard';
import CreateSpaceModal from '../components/MyPage/CreateSpaceModal';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const MyPage = () => {
    const navigate = useNavigate();

    const [workspaces, setWorkspaces] = useState([]);  // 작업실 목록을 저장할 상태
    const [workSpaceTitle, setWorkSpaceTitle] = useState('');
    const [workSpaceDesc, setWorkSpaceDesc] = useState('');

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsCreateModalOpen(false);
    };

    const handleModalOpen = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateWorkSpace = async (title, description) => {
        console.log("작업실 생성 시도:", title, description);
        try {
            const response = await createWorkSpace(title, description, []);
            if (response) {
                console.log("작업실 생성 완료");
                // navigate(`/workspace/${response.spaceId}`);
                navigate(`/workspace`);
            } else {
                console.log("작업실 생성 실패");
            }
        } catch (error) {
            console.error("작업실 생성 오류:", error);
        }
    }

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

    // spaceId를 순회하면서 id, index를 얻을 수 있다는 가정
    return (
        <div>
            <h1>MyPage</h1>
            <button onClick={handleModalOpen}>새 작업실 만들기</button>
            {isCreateModalOpen && (
                <CreateSpaceModal
                    onClose={handleModalClose}
                    onPublish={handleCreateWorkSpace}
                />
            )}
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
