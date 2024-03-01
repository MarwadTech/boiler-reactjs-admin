import axios from "axios";
import { HeadersApi, categoryApi } from "../Contexts/Context";
// get
export const categoryGetApi = async () => {

    const apiLink = `${categoryApi}`;
    try {
        const response = await axios.get(apiLink, { headers: HeadersApi });
        return response;
    } catch (error) {
        return error;
    }
}

// Add category
export const categoryPostApiWithData = async (data) => {
    const apiLink = `${categoryApi}`;
    try {
        const response = await axios.post(apiLink, data, { headers: HeadersApi });
        return response
    } catch (error) {
        return error
    }
}


// Edit category
export const categoryPatchApiWithData = async (id, data) => {
    const apiLink = `${categoryApi}/${id}`;
    try {
        const response = await axios.patch(apiLink, data, { headers: HeadersApi });
        return response
    } catch (error) {
        return error
    }
}

