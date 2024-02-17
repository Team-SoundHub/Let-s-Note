import axiosInstance from "./axiosInstance";

const getMyPageInfo = async (accountId) => {
  try {
    const response = await axiosInstance.get(`/workspaces/${accountId}`);
    return response.data;
  } catch (error) {
    console.error("getMyPageInfo 요청 오류:", error);
  }
};

const createWorkSpace = async (
  spaceTitle,
  spaceContent,
  memberAccountId,
  accountId
) => {
  try {
    const response = await axiosInstance.post(`/workspaces/${accountId}`, {
      spaceTitle: spaceTitle,
      spaceContent: spaceContent,
      membersAccountId: memberAccountId,
    });
    return response.data;
  } catch (error) {
    console.error("createWorkSpace 요청 오류:", error);
  }
};

const getMySnapshotInfo = async (accountId) => {
  try {
    const response = await axiosInstance.get(`/snapshots/${accountId}`);
    return response.data;
  } catch (error) {
    console.error("getMySnapshotInfo 요청 오류:", error);
  }
};

const deleteWorkSpace = async (spaceId) => {
  try {
    const response = await axiosInstance.delete(
      `/workspaces/space-id?v=${spaceId}`
    );
    console.log("workspace 삭제 요청 보냄");
    return response;
  } catch (error) {
    console.error("DeleteWorkSpace 요청 오류:", error);
  }
};

const deleteSnapshot = async (snapshotId) => {
  try {
    const response = await axiosInstance.delete(
      `/snapshots/snapshot-id?v=${snapshotId}`
    );
    return response;
  } catch (error) {
    console.error("DeleteSnapshot 요청 오류:", error);
  }
};

export {
  createWorkSpace,
  getMyPageInfo,
  getMySnapshotInfo,
  deleteWorkSpace,
  deleteSnapshot,
};
