import axiosInstance from './axiosInstance';

const getMyNickname = async (accountId) => {
    try {    
      const response = await axiosInstance.get(`/accounts/nickname/${accountId}`);
      return response.data;
    } catch (error) {
      console.error('getMyNickname 요청 오류:', error);
    }
  };

export { getMyNickname }