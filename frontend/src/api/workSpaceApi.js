import axiosInstance from './axiosInstance';

const getWorkspaceInfo = async (spaceId) => {
    try {
        // const response = await axiosInstance.get(`/workspaces/space-id?v=${spaceId}`);
        const response = await axiosInstance.get(`/workspaces/space-id?v=a9f4c68ffc214db09e7d54c70cfb84cb`);
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
        const response = await axiosInstance.post(`/snapshots/space-id?v=a9f4c68ffc214db09e7d54c70cfb84cb`, requestData);
        return response.data; 
    } catch (error) {
        console.error('createSnapshot 에러:', error);
    }
}

export { getWorkspaceInfo, createSnapshot };