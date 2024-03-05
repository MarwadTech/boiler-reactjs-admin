import axios from "axios";
import { HeadersApi, appRatingsApi } from "../Contexts/Context";
export const getAppRatingApi = async (page, id) => {
    let apiLink;
    if (id) {
        // apiLink = `${appRatingsApi}apiLink?page=${page}&limit=9`
        apiLink = `${appRatingsApi}?taken_by=${id}&page=${page}&limit=9`

    } else {
        apiLink = `${appRatingsApi}?page=${page}&limit=9`
    }
    // const apiLink = `${appRatingsApi}?page=${page}&limit=9`;
    try {
        console.log(apiLink);
        const response = await axios.get(apiLink, { headers: HeadersApi });
        return response;
    } catch (error) {
        return error
    }
}