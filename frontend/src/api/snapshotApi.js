import axiosInstance from './axiosInstance';

const getSnapshotInfo = async (snapshotId) => {
    try {        
        const response = await axiosInstance.get(`/workspaces/snapshot-id?v=${snapshotId}`);        
        console.log("getSnapshotInfo", response);
        return response.data; 
    } catch (error) {
        console.error('getSnapshotInfo 에러:', error);   
    }
}

export { getSnapshotInfo };