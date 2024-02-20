import axiosInstance from './axiosInstance';

const getMyUserId = async (accountId) => {
    try {    
      const response = await axiosInstance.get(`/accounts/username/${accountId}`);
      console.log("userId response: ",response);
      return response.data;
    } catch (error) {
      console.error('getMyUserId 요청 오류:', error);
    }
  };

export { getMyUserId };