import axiosInstance from "./axiosInstance";

const getWorkspaceInfo = async (spaceId) => {
  console.log("작업실 입장 데이터 요청 3");
  try {
    console.log("작업실 입장 데이터 요청 4");
    const response = await axiosInstance.get(
      `/workspaces/space-id?v=${spaceId}`
    );
    return response.data;
  } catch (error) {
    console.error("getWorkspaceInfo 에러:", error);
  }
};

const createSnapshot = async (spaceId, snapshotTitle, snapshotContent) => {
  try {
    const response = await axiosInstance.post(
      `/snapshots/space-id?v=${spaceId}`,
      {
        snapshotTitle: snapshotTitle,
        snapshotContent: snapshotContent,
      }
    );
    // console.log("createSnapshot API 요청");
    return response.data;
  } catch (error) {
    console.error("createSnapshot 에러:", error);
  }
};

const setMember = async (spaceId, userId) => {
  try {
    const requestData = {
      userId: userId,
    };
    const response = await axiosInstance.post(
      `/workspaces/member/space-id?v=${spaceId}`,
      requestData
    );
    return response.data;
  } catch (error) {
    console.error("setMember 에러:", error);
  }
};

const getMember = async (spaceId) => {
  let response;
  try {
    response = await axiosInstance.get(
      `/workspaces/nickname/space-id?v=${spaceId}`
    );
  } catch (error) {
    console.error("getMember 에러:", error);
  }
  return response.data;
};

const callAI = async (userId, textContent) => {
  try {
    const requestData = {
      text: textContent,
      userId: userId,
    };
    const response = await axiosInstance.post(
        `/ai/${userId}`,
        requestData
    );
    return response.data;
  } catch (error) {
    console.error("setMember 에러:", error);
  }
}


export { getWorkspaceInfo, createSnapshot, setMember, getMember, callAI };
