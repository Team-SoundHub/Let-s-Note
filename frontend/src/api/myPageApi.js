import axios from 'axios';

const getMyPageInfo = async (accessToken) => {
    try {
        const response = await axios.get('https://letsnote-rough-wind-6773.fly.dev/api/v1/workspaces', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('getMyPageInfo 요청 오류:', error);        
    }
}

const createWorkSpace = async (accessToken) => {
    try {
        const response = await axios.post('https://letsnote-rough-wind-6773.fly.dev/api/v1/workspaces',{
            accesstoken: accessToken,        
        });
        return response.data;
    } catch (error) {
        console.error('createWorkSpace 요청 오류:', error);
    }
}

export { createWorkSpace };
export default getMyPageInfo;
