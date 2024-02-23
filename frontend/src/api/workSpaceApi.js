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
    if(error.response.status == 509){
      return "509"
    }
    console.error("getWorkspaceInfo 에러:", error);
  }
};

const createSnapshot = async (spaceId, snapshotTitle, snapshotContent, bpm) => {
  try {
    const response = await axiosInstance.post(
      `/snapshots/space-id?v=${spaceId}`,
      {
        snapshotTitle: snapshotTitle,
        snapshotContent: snapshotContent,
        bpm: bpm,
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

const callGenreAI = async (previous, userId, textContent, value) => {
  try {
    const requestData = {
      text: textContent,
      userId: userId,
      value: value,
      previous: previous
    };
    const response = await axiosInstance.post(
        `/ai/genre/${userId}`,
        requestData
    );
    return response.data;
  } catch (error) {
  }
}

const callChordAI = async (previous, userId) => {
  try {
    const requestData = {
      userId: userId,
      previous: previous
    };
    const response = await axiosInstance.post(
        `/ai/chord/${userId}`,
        requestData
    );
    return response.data;
  } catch (error) {
  }
}

const isRoomFull = async (spaceId) => {
  try {
    const response = await axiosInstance.get(
        `/workspaces/check-full/${spaceId}`,
    );
    return response.data;
  } catch (error) {
    return error.response.status;
  }
}


export { getWorkspaceInfo, createSnapshot, setMember, getMember, callGenreAI, callChordAI, isRoomFull };
