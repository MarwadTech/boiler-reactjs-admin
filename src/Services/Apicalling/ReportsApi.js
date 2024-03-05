
import axios from "axios";
import { reportsApi, HeadersApi } from "../Contexts/Context";
export const getReportApi = async (page) => {

    const apiLink = `${reportsApi}?page=${page}&limit=9`;
    try {
        const response = await axios.get(apiLink, { headers: HeadersApi });
        return response;
    } catch (error) {
        return error;
    }
}

