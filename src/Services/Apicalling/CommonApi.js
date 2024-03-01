import axios from "axios";
import { HeadersApi, commonDataApi, userApi, imagesApi, HeadersFormDataApi, categoryApi, levelApi, templateApi } from "../Contexts/Context";

export const deleteApiWithId = async (id, point) => {
    let apiLink;
    switch (point) {
        case "user":
            apiLink = `${userApi}/${id}`;
            break;
        case "commondata":
            apiLink = `${commonDataApi}/${id}`;
            break;
        case "category":
            apiLink = `${categoryApi}/${id}`;
            break;
        case "level":
            apiLink = `${levelApi}/${id}`;
            break;
        case "template":
            apiLink = `${templateApi}/${id}`;
            break;
        default:
            // Handle default case here if needed
            break;
    }
    try {
        const response = await axios.delete(apiLink, { headers: HeadersApi });
        return response
    } catch (error) {
        return error
    }
}



export const imagePostApiWithCollection = async (collection, image) => {
    const apiLink = `${imagesApi}`;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('collection', collection);

    try {
        const response = await axios.post(apiLink, formData, {
            headers: HeadersFormDataApi
        });
        return response

    } catch (error) {
        return error

    }
};