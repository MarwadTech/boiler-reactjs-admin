import axios from "axios";
import { HeadersLoginApi, loginAuthApi } from "../Contexts/Context";

export const loginPostApi = async (data) => {

    const apiLink = `${loginAuthApi}`;
    console.log(data);
    try {
        const response = await axios.post(apiLink, data, { headers: HeadersLoginApi });
        console.log({ ok: response });
        return response

    } catch (error) {
        console.log({ not: error });
        return error

    }
}