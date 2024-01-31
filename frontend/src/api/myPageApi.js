import axiosInstance from './axiosInstance';

const accountId = sessionStorage.getItem('accountId');

const getMyPageInfo = async () => {
  try {    
    const response = await axiosInstance.get(`/workspaces/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('getMyPageInfo 요청 오류:', error);
  }
};

const createWorkSpace = async (spaceTitle, spaceContent, memberAccountId) => {
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

const getMySnapshotInfo = async () => {
  try {    
    const response = await axiosInstance.get(`/snapshots/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('getMySnapshotInfo 요청 오류:', error);
  }
};

export { createWorkSpace, getMyPageInfo, getMySnapshotInfo };
