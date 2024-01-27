import axios from 'axios';

const getChatMessages = async (spaceId) => {
    try {
        const response = await axios.get(`https://letsnote-rough-wind-6773.fly.dev/api/${spaceId}`);
        return response.data;  // response에 메시지 리스트 포함
    } catch (error) {
        console.error('getChatMessages 에러:', error);   
    }
}

export default getChatMessages;
