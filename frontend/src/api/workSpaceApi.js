import axiosInstance from "./axiosInstance";

const getWorkspaceInfo = async (spaceId) => {
    try {
        // const response = await axiosInstance.get(`/workspaces/space-id?v=${spaceId}`);
        const response = await axiosInstance.get(`/workspaces/space-id?v=2d92f8cb4ff848308a2a953e5b9b3966`);
        return response.data; 
    } catch (error) {
        console.error('getWorkspaceInfo 에러:', error);   
    }
}

const createSnapshot = async (spaceId, snapshotTitle, snapshotContent) => {
    try {
        const requestData = {
            snapshotTitle: snapshotTitle,
            snapshotContent: snapshotContent
        };
        // const response = await axiosInstance.post(`/snapshots/space-id?v=${spaceId}`, requestData);
        const response = await axiosInstance.post(`/snapshots/space-id?v=2d92f8cb4ff848308a2a953e5b9b3966`, requestData);
        return response.data; 
    } catch (error) {
        console.error('createSnapshot 에러:', error);
    }
}

const setMember = () => {};

const getMember = async (spaceId) => {
  const response = await axiosInstance.get(
    "api/v1/workspaces/nickname/space-id?v=",
    spaceId
  );
  return response.data;
};

export { getWorkspaceInfo, createSnapshot, setMember, getMember };
