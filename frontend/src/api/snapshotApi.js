import axiosInstance from './axiosInstance';

const getSnapshotInfo = async (snapshotId) => {
    try {        
        // const response = await axiosInstance.get(`/workspaces/snapshot-id?v=${snapshotId}`);
        const response = await axiosInstance.get(`/workspaces/snapshot-id?v=2d92f8cb4ff848308a2a953e5b9b3966`);
        console.log("getSnapshotInfo", response);
        return response.data; 
    } catch (error) {
        console.error('getSnapshotInfo 에러:', error);   
    }
}

export { getSnapshotInfo };