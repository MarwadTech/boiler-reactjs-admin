import axios from "axios";
import { HeadersApi, userApi } from "../Contexts/Context";

const sendRequest = async (method, url, data = null) => {
    try {
        const response = await axios({ method, url, data, headers: HeadersApi });
        return response; // Return response data instead of entire response
    } catch (error) {
        throw error; // Throw the error to be caught by the caller
    }
};

// get
export const getUserApiWithPage = async (page) => {
    const apiLink = `${userApi}?page=${page}&limit=12`;
    return sendRequest("get", apiLink);
};

// get with id
export const getUserApiWithId = async (id) => {
    const apiLink = `${userApi}/${id}`;
    return sendRequest("get", apiLink);
};

// edit
export const putUserApi = async (id, data) => {
    const apiLink = `${userApi}/${id}`;
    return sendRequest("put", apiLink, data);
};
