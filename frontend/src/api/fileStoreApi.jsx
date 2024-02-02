import axiosInstance from "./axiosInstance";

const FileStoreApi = async (fileName, imageUrl) => {
    try {
        const accountId = sessionStorage.getItem("accountId");

        console.log(fileName);
        console.log(accountId);
        console.log(imageUrl);
        if (!accountId) {
            // Handle the case where accountId is not available
            console.error("Account ID not found in sessionStorage.");
            return;
        }

        const response = await axiosInstance.post(`http://localhost:9807/api/v1/files/${fileName}`, {
            fileName : fileName,
            accountId : accountId,
            fileUrl: imageUrl
            });
        return response.data;
    } catch (error) {
        console.error("getChatMessages 에러:", error);
    }
};

export default FileStoreApi;