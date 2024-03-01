import axios from "axios";
import { HeadersApi, commonDataApi } from "../Contexts/Context";
// get
export const commonDataGetApi = async () => {

    const apiLink = `${commonDataApi}`;
    try {
        const response = await axios.get(apiLink, { headers: HeadersApi });
        return response;
    } catch (error) {
        return error;
    }
}

// Add common data
export const commonDataPostApiWithData = async (data) => {
    const apiLink = `${commonDataApi}`;
    try {
        const response = await axios.post(apiLink, data, { headers: HeadersApi });
        return response
    } catch (error) {
        return error
    }
}


// Edit common data
export const commonDataPatchApiWithData = async (id, data) => {
    const apiLink = `${commonDataApi}/${id}`;
    try {
        const response = await axios.patch(apiLink, data, { headers: HeadersApi });
        return response
    } catch (error) {
        return error
    }
}