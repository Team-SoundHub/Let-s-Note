import axiosInstance from './axiosInstance';

const getSnapshotInfo = async (snapshotId) => {
    try {        
        // const response = await axiosInstance.get(`/workspaces/snapshot-id?v=${snapshotId}`);
        const response = await axiosInstance.get(`/workspaces/snapshot-id?v=35cdb3bc2ebe47e0b3fbf1af8862121a`);
        console.log("getSnapshotInfo", response);
        return response.data; 
    } catch (error) {
        console.error('getSnapshotInfo 에러:', error);   
    }
}

export { getSnapshotInfo };