import axiosInstance from "./axiosInstance";

const fileGetApi = async () => {
    try {
        const spaceId = localStorage.getItem("spaceId");

        if (!spaceId) {
            console.error("spaceId ID not found in sessionStorage.");
            return;
        }

        const response = await axiosInstance.get(`http://localhost:9807/api/v1/files/${spaceId}`, {
            spaceId: spaceId
        });
        return response.data.response;
    } catch (error) {
        console.error("getChatMessages 에러:", error);
    }
};

export default fileGetApi;
