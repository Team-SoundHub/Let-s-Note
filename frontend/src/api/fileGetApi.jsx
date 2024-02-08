import axiosInstance from "./axiosInstance";

const fileGetApi = async () => {
  const spaceId = localStorage.getItem("spaceId");
  try {
    if (!spaceId) {
      console.error("spaceId not found in localStorage.");
      return;
    }

    const response = await axiosInstance.get(`/files/${spaceId}`, 
    {
      spaceId: spaceId
    });
    return response.data.response;
  } catch (error) {
    console.error("fileGetApi 에러:", error);
  }
};

export default fileGetApi;
