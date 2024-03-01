import axios from "axios";
import { HeadersApi, templateApi } from "../Contexts/Context";
// get
export const templateGetApi = async () => {

    const apiLink = `${templateApi}`;
    try {
        const response = await axios.get(apiLink, { headers: HeadersApi });
        return response;
    } catch (error) {
        return error;
    }
}


// Add  
export const templatePostApiWithData = async (data) => {
    const apiLink = `${templateApi}`;
    try {
        const response = await axios.post(apiLink, data, { headers: HeadersApi });
        return response
    } catch (error) {
        return error
    }
}


// Edit 
export const templatePatchApiWithData = async (id, data) => {
    const apiLink = `${templateApi}/${id}`;
    try {
        const response = await axios.patch(apiLink, data, { headers: HeadersApi });
        return response
    } catch (error) {
        return error
    }
}