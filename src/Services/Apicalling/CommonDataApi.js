import axios from "axios";
import { HeadersApi, commonDataApi } from "../Contexts/Context";

const sendRequest = async (method, url, data = null) => {
    try {
        console.log({ data });
        const response = await axios({ method, url, data, headers: HeadersApi });
        console.log({ response });
        return response;
    } catch (error) {
        console.log({ error });
        return error;
    }
};

// Get common data
export const getCommonDataApi = async () => {
    const apiLink = `${commonDataApi}`;
    return sendRequest("get", apiLink);
};

// Add common data
export const postCommonDataApi = async (data) => {
    const apiLink = `${commonDataApi}`;
    return sendRequest("post", apiLink, data);
};

// Edit common data
export const patchCommonDataApi = async (id, data) => {
    const apiLink = `${commonDataApi}/${data.key}`;
    return sendRequest("patch", apiLink, data);
};