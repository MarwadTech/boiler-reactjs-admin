import axios from "axios";
import { HeadersApi, appRatingsApi } from "../Contexts/Context";
export const appRatingGetApi = async (page) => {
    const apiLink = `${appRatingsApi}?page=${page}&limit=9`;
    try {
        const response = await axios.get(apiLink, { headers: HeadersApi });
        return response;
    } catch (error) {
        return error
    }
}