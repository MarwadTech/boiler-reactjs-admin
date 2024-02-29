
import axios from "axios";
import { HeadersApi, suggestionsApi } from "../Contexts/Context";
export const suggestionsGetApi = async (filter, page) => {

    const apiLink = `${suggestionsApi}?type=${filter}&page=${page}&limit=9`;
    try {
        const response = await axios.get(apiLink, { headers: HeadersApi });
        return response;
    } catch (error) {
        return error;
    }
}