/* 
마이페이지 진입시 요청할 데이터들: 

*/
import axios from 'axios';

const getMyPageInfo = async (userId) => {
    try {
        const response = await axios.post('서버ip/api', {
            spaceId: spaceId,
            snapshotId: snapshotId,
        });
        return response.data; 
    } catch (error) {
        console.error('getMyPageInfo 에러:', error);   
    }
}

export default getMyPageInfo;