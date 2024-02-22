import axiosInstance from "./axiosInstance";

const getSnapshotInfo = async (snapshotId) => {
  try {
    const response = await axiosInstance.get(
      `/feeds/snapshot-id?v=${snapshotId}`
    );
    axiosInstance.put(`/feeds/views/snapshot-id?v=${snapshotId}`);
    console.log("getSnapshotInfo -", snapshotId, ":", response.data);
    return response.data;
  } catch (error) {
    console.error("getSnapshotInfo 에러:", error);
  }
};

/**
 * TODO: Create new workspace and copy snapshot note info
 */
const setSnapshotFork = async (snapshotId) => {
  try {
    console.log("hi");
  } catch (error) {
    console.log(error);
  }
};

export { getSnapshotInfo };
