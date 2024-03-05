

import axios from "axios";
import { HeadersApi, notificationsApi } from "../Contexts/Context";

const sendRequest = async (method, url, data = null) => {
    try {
        const response = await axios({ method, url, data, headers: HeadersApi });
        return response; // Return response data instead of entire response
    } catch (error) {
        throw error; // Throw the error to be caught by the caller
    }
};

// get 
export const getNotificationsApi = async (page) => {
    const apiLink = `${notificationsApi}?page=${page}&limit=12`;
    return sendRequest("get", apiLink);
};

// send
export const postNotificationApi = async (data) => {
    const apiLink = `${notificationsApi}/notify-users`;
    return sendRequest("post", apiLink, data);
};
