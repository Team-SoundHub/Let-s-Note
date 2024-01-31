import axiosInstance from "./axiosInstance";

const getAllSnapshotInfo = async () => {
  try {
    const response = await axiosInstance.get("/feeds");
    console.log("getAllSnapshotInfo", response);
    return response.data.response;
  } catch (error) {
    console.error("getAllSnapshotInfo 에러:", error);
  }
};

export { getAllSnapshotInfo };
