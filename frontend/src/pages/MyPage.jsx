import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyPageInfo, createWorkSpace, getMySnapshotInfo } from '../api/myPageApi';
import styled from 'styled-components';
import WorkSpaceCard from '../components/WorkSpace/WorkSpaceCard';
import CreateSpaceModal from '../components/MyPage/CreateSpaceModal';

const SectionTitle = styled.h2`
  margin: 20px 0;
`;

const WorkSpacesSection = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 10px 0;
`;

const SnapshotsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3열 그리드
  gap: 20px;
  padding: 20px 0;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #ddd;
  margin: 20px 0;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const MyPage = () => {
    const navigate = useNavigate();

    const [workspaces, setWorkspaces] = useState([]);  // 작업실 목록을 저장하는 상태
    const [snapshots, setSnapshots] = useState([]);  // 스냅샷 목록을 저장하는 상태

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
                navigate(`/workspace/${response.response.spaceId}`);
                console.log("작업실 생성 완료");
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

        const fetchMySnapshotInfo = async () => {
            try {
                const response = await getMySnapshotInfo(accountId);
                console.log(response)
                console.log("스냅샷 인포 받음");
                setSnapshots(response.response);  // API 응답으로 받은 스냅샷 목록을 상태에 저장
            } catch (error) {
                console.error('스냅샷 정보 로드 실패:', error);
            }
        };
        fetchMySnapshotInfo();

    }, [accessToken, accountId]);

    const handleWorkspaceClick = (spaceId) => {
        console.log("이건 출력됨?");
        console.log("마이페이지에서 spaceId 저장", spaceId);
        localStorage.setItem('spaceId', spaceId);
        navigate(`/workspace/${spaceId}`);
    };
    
    const handleSnapshotClick = (snapshotId) => {
        console.log("이건 출력됨?");
        console.log("마이페이지에서 snapshotId 저장", snapshotId);
        localStorage.setItem('snapshotId', snapshotId);
        navigate(`/snapshot/${snapshotId}`);
    };
    

    // spaceId를 순회하면서 id, index를 얻을 수 있다는 가정
    return (
        <div>
            <h1>MyPage</h1>
            <SectionTitle>내 작업실</SectionTitle>
            <WorkSpacesSection>
                <button onClick={handleModalOpen}>새 작업실 만들기</button>
                {isCreateModalOpen && (
                    <CreateSpaceModal
                        onClose={handleModalClose}
                        onPublish={handleCreateWorkSpace}
                    />
                )}

                {workspaces.map((workspace) => (
                    <div key={workspace.spaceId} onClick={() => handleWorkspaceClick(workspace.spaceId)}>
                        <WorkSpaceCard
                            spaceTitle={workspace.spaceTitle}
                            spaceContent={workspace.spaceContent}
                            ownerNickname={workspace.ownerNickname}
                            memberNicknames={workspace.memberNicknames}
                            updateAt={workspace.updateAt}
                        />
                    </div>
                ))}
            </WorkSpacesSection>

            <Divider />

            <SectionTitle> 내 스냅샷 </SectionTitle>
            <SnapshotsSection>
                {snapshots.map((snapshot) => (
                    <div key={snapshot.snapshotId} onClick={() => handleSnapshotClick(snapshot.snapshotId)}>
                        <WorkSpaceCard
                            spaceTitle={snapshot.snapshotTitle}
                            snapshotContent={snapshot.snapshotContent}
                            ownerNickname={snapshot.ownerNickname}
                            memberNicknames={snapshot.memberNicknames}
                            updateAt={snapshot.updateAt}
                        />
                    </div>
                ))}
            </SnapshotsSection>
        </div>
    );
};

export default MyPage;