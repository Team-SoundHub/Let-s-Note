import axiosInstance from "./axiosInstance";

const FileStoreApi = async (fileName, imageUrl) => {
  try {
    const spaceId = localStorage.getItem("spaceId");

    console.log(fileName);
    console.log(spaceId);
    console.log(imageUrl);
    if (!spaceId) {
      // Handle the case where accountId is not available
      console.error("spaceId ID not found in sessionStorage.");
      return;
    }

    const response = await axiosInstance.post(
      `http://localhost:9807/api/v1/files/${fileName}`,
      {
        fileName: fileName,
        spaceId: spaceId,
        fileUrl: imageUrl,
      }
    );
    return response.data;
  } catch (error) {
    console.error("getChatMessages 에러:", error);
  }
};

export default FileStoreApi;
