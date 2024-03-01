import axios from "axios";
import { HeadersApi, levelApi } from "../Contexts/Context";
// get
export const lecelGetApi = async () => {

    const apiLink = `${levelApi}`;
    try {
        const response = await axios.get(apiLink, { headers: HeadersApi });
        return response;
    } catch (error) {
        return error;
    }
}


// Add  
export const lecelPostApiWithData = async (data) => {
    const apiLink = `${levelApi}`;
    try {
        const response = await axios.post(apiLink, data, { headers: HeadersApi });
        return response
    } catch (error) {
        return error
    }
}


// Edit 
export const lecelPatchApiWithData = async (id, data) => {
    const apiLink = `${levelApi}/${id}`;
    try {
        const response = await axios.patch(apiLink, data, { headers: HeadersApi });
        return response
    } catch (error) {
        return error
    }
}