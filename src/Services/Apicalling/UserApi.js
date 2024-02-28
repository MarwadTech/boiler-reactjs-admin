import axios from "axios";
import { HeadersApi, userApi } from "../Contexts/Context";


// get
export const userGetApiWithPage = async (page) => {
    // const apiLink = `${userapi}?page=${page}&sort=full_name`;
    const apiLink = `${userApi}?page=${page}`;

    try {
        const response = await axios.get(apiLink, { headers: HeadersApi });
        return response;

    } catch (error) {
        return error
    }
};


// User update API using user ID
export const userPutApiWithIdDate = async (id, data) => {
    const apiLink = `${userApi}/${id}`;
    try {
        const response = await axios.put(apiLink, data, { headers: HeadersApi });
        return response
    } catch (error) {
        return error
    }
}