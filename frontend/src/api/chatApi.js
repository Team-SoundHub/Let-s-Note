import axiosInstance from './axiosInstance';

const getChatMessages = async (spaceId) => {
    try {
        const response = await axiosInstance.get(`https://letsnote-rough-wind-6773.fly.dev/api/v1/messages/${spaceId}`);
        console.log("채팅 리스트: ", response);
        return response.data;  // response에 메시지 리스트 포함
    } catch (error) {
        console.error('getChatMessages 에러:', error);   
    }
}

export default getChatMessages;
