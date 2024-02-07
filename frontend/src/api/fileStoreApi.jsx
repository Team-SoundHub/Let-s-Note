import axiosInstance from "./axiosInstance";

const FileStoreApi = async (fileName, imageUrl, spaceId) => {
  try {

    console.log(fileName);
    console.log(spaceId);
    console.log(imageUrl);
    if (!spaceId) {
      // Handle the case where accountId is not available
      console.error("spaceId ID not found in sessionStorage.");
      return;
    }

    const response = await axiosInstance.post(
      `/files/${fileName}`,
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
