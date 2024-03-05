import axios from "axios";
import { HeadersApi, levelApi } from "../Contexts/Context";
import { logDOM } from "@testing-library/react";

const sendRequest = async (method, url, data = null) => {
    try {

        // console.log({ url, data });

        const response = await axios({ method, url, data, headers: HeadersApi });
        console.log({ response });
        return response;
    } catch (error) {
        console.log({ error });
        return error;
    }
};

// Get level data
export const getLevelApi = async () => {
    const apiLink = `${levelApi}`;
    return sendRequest("get", apiLink);
};

// Add level data
export const postLovelApi = async (data) => {
    const apiLink = `${levelApi}`;
    return sendRequest("post", apiLink, data);
};

// Edit level data
export const patchLevelApi = async (id, data) => {

    const apiLink = `${levelApi}/${id}`;
    console.log({ data });
    return sendRequest("patch", apiLink, data);
};
