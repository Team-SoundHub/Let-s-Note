import axios from "axios";

const getAllSnapshotInfo = async () => {
  try {
    const response = await axios.get("/feeds");
    console.log("getAllSnapshotInfo", response);
    return response.data.response;
  } catch (error) {
    console.error("getAllSnapshotInfo 에러:", error);
  }
};

export { getAllSnapshotInfo };
