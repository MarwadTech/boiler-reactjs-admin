import axios from "axios";
import { HeadersLoginApi, loginAuthApi } from "../Contexts/Context";

export const loginPostApi = async (data) => {
    const apiLink = `${loginAuthApi}`;
    try {
        const response = await axios.post(apiLink, data, { headers: HeadersLoginApi });
        return response

    } catch (error) {
        return error

    }
}