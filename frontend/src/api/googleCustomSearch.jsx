import axios from "axios";

const getAllSnapshotInfo = async () => {
    try {
        const response = await axios.get(
            "http://localhost:9807/api/v1/feeds"
        );
        // console.log("getAllSnapshotInfo", response);
        return response.data.response;
    } catch (error) {
        console.error("getAllSnapshotInfo 에러:", error);
    }
};

export { getAllSnapshotInfo };
