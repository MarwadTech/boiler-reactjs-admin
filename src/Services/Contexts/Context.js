export const authToken = localStorage.getItem("token");

export const baseApi = 'https://lfapi.marwadtech.com/api/v1';


// Auth
export const loginAuthApi = `${baseApi}/auth/login`;

export const HeadersLoginApi = {
    'Content-Type': 'application/json'
};

// user
export const userApi = `${baseApi}/users`;

// ratings
export const appRatingsApi = `${baseApi}/ratings/app`;

// commondatapi
export const commonDatApi = `${baseApi}/commondata`

// image api
export const imagesApi = `${baseApi}/images`;

// notification
export const notificationsApi = `${baseApi}/notifications`;

// HelpAndSupport
export const suggestionsApi = `${baseApi}/suggestions`;

export const HeadersApi = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
};

export const HeadersFormDataApi = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${authToken}`,
};