import axios from "axios";
import { HeadersApi, templateApi } from "../Contexts/Context";

const sendRequest = async (method, url, data = null) => {
    try {
        const response = await axios({ method, url, data, headers: HeadersApi });
        return response.data; // Return response data instead of entire response
    } catch (error) {
        throw error; // Throw the error to be caught by the caller
    }
};

// get
export const getTemplateApi = async () => {
    const apiLink = `${templateApi}`;
    return sendRequest("get", apiLink);
};

// add
export const postTemplateApi = async (data) => {
    const apiLink = `${templateApi}`;
    return sendRequest("post", apiLink, data);
};

// edit
export const patchTemplateApi = async (id, data) => {
    const apiLink = `${templateApi}/${id}`;
    return sendRequest("patch", apiLink, data);
};
