
import axios from "axios";
import { HeadersApi, queriesApi } from "../Contexts/Context";
export const getQueriesApi = async (page) => {

    const apiLink = `${queriesApi}?page=${page}&limit=9`;
    try {
        const response = await axios.get(apiLink, { headers: HeadersApi });
        console.log({ response });
        return response;
    } catch (error) {
        console.log({ error });
        return error;
    }
}