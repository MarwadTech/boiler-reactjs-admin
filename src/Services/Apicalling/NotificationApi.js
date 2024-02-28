import axios from "axios";
import { HeadersApi, notificationsApi } from "../Contexts/Context";
export const notificationGetApi = async (page) => {
    const apiLink = `${notificationsApi}?page=${page}`;
    try {
        const response = await axios.get(apiLink, { headers: HeadersApi });
        return response;
    } catch (error) {
        return error;
    }
}

export const notificationPostApiWithData = async (data) => {
    const apiLink = `${notificationsApi}/notify-users`;
    try {
        const response = await axios.post(apiLink, data, { headers: HeadersApi });
        return response
    } catch (error) {
        return error;
    }
}
