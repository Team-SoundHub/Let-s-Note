import axios from 'axios';

const accessToken = localStorage.getItem('access');
const accountId = localStorage.getItem('accountId');

const getMyPageInfo = async () => {    
    try {
        const response = await axios.get(`https://letsnote-rough-wind-6773.fly.dev/api/v1/workspaces/${accountId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('getMyPageInfo 요청 오류:', error);        
    }
}

const createWorkSpace = async (spaceTitle, spaceContent, memberAccountId) => {
    try {
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };

        const requestData = {
            spaceTitle: spaceTitle,
            spaceContent: spaceContent
        };

        if (memberAccountId){
            requestData.memberAccountId = memberAccountId;
        }

        const response = await axios.post(`https://letsnote-rough-wind-6773.fly.dev/api/v1/workspaces/${accountId}`, requestData, {
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('createWorkSpace 요청 오류:', error);
    }
}

export { createWorkSpace };
export default getMyPageInfo;
