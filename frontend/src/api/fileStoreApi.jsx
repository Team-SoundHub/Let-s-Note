import axiosInstance from "./axiosInstance";

const FileStoreApi = async (fileName, imageUrl) => {
  const spaceId = localStorage.getItem("spaceId");
  
  try {    
    if (!spaceId) {      
      console.error("spaceId not found in localStorage.");
      return;
    }

    const response = await axiosInstance.post(`/files/${fileName}`,
      {
        fileName: fileName,
        spaceId: spaceId,
        fileUrl: imageUrl,
      }
    );
    return response.data;
  } catch (error) {
    console.error("FileStoreApi 에러:", error);
  }
};

export default FileStoreApi;
