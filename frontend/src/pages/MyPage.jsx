import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getMyPageInfo, { createWorkSpace } from '../api/myPageApi';

const MyPage = () => {
    const [spaceIds, setSpaceIds] = useState([]);
    const [snapshotIds, setSnapshotIds] = useState([]);
    const navigate = useNavigate();

    const accessToken = localStorage.getItem("access");     

    useEffect(() => {
        const fetchMyPageInfo = async () => {
            try {
                const response = await getMyPageInfo(accessToken);
                console.log(response)
                console.log("마이페이지 인포 받음");
                // setSpaceIds(data.spaceIds);
                // setSnapshotIds(data.snapshotIds);
            } catch (error) {
                console.error('마이페이지 정보 로드 실패:', error);
            }
        };
        fetchMyPageInfo();
    }, [accessToken]);

    // 작업실 생성 함수
    const handleCreateWorkSpace = async () => {
        try {
            const response = await createWorkSpace(accessToken);
            console.log("작업실 생성 응답:", response);
            // 일단은 작업실로 바로 가기
            // 후에 방 생성 화면 뜨고, 방 제목과 설명 입력받고, 멤버 추가 기능 구현 필요
        } catch (error) {
            console.error("작업실 생성 오류:", error);
        }

    }

    // spaceId를 순회하면서 id, index를 얻을 수 있다는 가정
    // 
    return (
        <div>
            <h1>MyPage</h1>
            <button onClick={handleCreateWorkSpace}> 새 작업실 </button>
            {/* {spaceIds.map((id, index) => (
                <div key={id} onClick={() => navigate(`/workspace/${id}`)}>
                    작업실 {index + 1}
                </div>
            ))} */}
        </div>
    );
};

export default MyPage;
