import axiosInstance from './axiosInstance';

const getMyPageInfo = async (accountId) => {
  try {    
    const response = await axiosInstance.get(`/workspaces/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('getMyPageInfo 요청 오류:', error);
  }
};

const createWorkSpace = async (spaceTitle, spaceContent, memberAccountId, accountId) => {
  try {        
    const response = await axiosInstance.post(`/workspaces/${accountId}`, {
        spaceTitle: spaceTitle,
        spaceContent: spaceContent,
        membersAccountId: memberAccountId
      });
    return response.data;
  } catch (error) {
    console.error('createWorkSpace 요청 오류:', error);
  }
};

const getMySnapshotInfo = async (accountId) => {
  try {    
    const response = await axiosInstance.get(`/snapshots/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('getMySnapshotInfo 요청 오류:', error);
  }
};

const changeAccountInfo = async (accountId, nickname, picture) => {
  try{
    const response = await axiosInstance.post(`/files/account/${accountId}`, {
      nickname: nickname,
      file: picture
    });
  }catch (error){

  }
}

export { createWorkSpace, getMyPageInfo, getMySnapshotInfo, changeAccountInfo };
