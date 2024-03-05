import axios from "axios";
import { HeadersApi, categoryApi } from "../Contexts/Context";


const sendRequest = async (method, url, data = null) => {
    try {
        const response = await axios({ method, url, data, headers: HeadersApi });
        return response;
    } catch (error) {
        return error;
    }
};

// Get category data
export const getCategoryApi = async () => {
    const apiLink = `${categoryApi}`;
    return sendRequest("get", apiLink);
};

// Add category data 
export const postCategoryApi = async (data) => {
    const apiLink = `${categoryApi}`;
    return sendRequest("post", apiLink, data);
};

// Edit category data
export const patchCategoryApi = async (id, data) => {
    const apiLink = `${categoryApi}/${id}`;
    return sendRequest("patch", apiLink, data);
};

