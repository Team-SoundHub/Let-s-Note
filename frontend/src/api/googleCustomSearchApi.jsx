import axios from "axios";

const googleCustomSearchApi = async (searchTerm) => {

    try {
        const cx = process.env.REACT_APP_GOOGLE_CX;
        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
        const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchTerm+"악보"}&searchType=image`;

        const response = await axios.get(apiUrl);
        const fetchedImages = response.data.items.map(item => ({
            imageUrl: item.link,
            title: item.title,
        }));

        return fetchedImages;
    } catch (error) {
        console.error("googleCustomSearchApi 에러:", error);
        throw error;
    }
};

export { googleCustomSearchApi };
