import axios from 'axios';

const getWorkspaceInfo = async (spaceId) => {
    try {
        // const response = await axios.get(`https://letsnote-rough-wind-6773.fly.dev/api/v1/workspaces/space-id?v=${spaceId}`);
        const response = await axios.get(`https://letsnote-rough-wind-6773.fly.dev/api/v1/workspaces/space-id?v=a9f4c68ffc214db09e7d54c70cfb84cb`);
        return response.data;  // response에 메시지 리스트 포함
    } catch (error) {
        console.error('getWorkspaceInfo 에러:', error);   
    }
}

export default getWorkspaceInfo;
