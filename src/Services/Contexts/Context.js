export const authToken = localStorage.getItem("token");

// const apiLink = `https://f1hz33hh-5000.inc1.devtunnels.ms/api/v1/auth/login`;
// export const baseApi = 'https://lfapi.marwadtech.com/api/v1';
export const baseApi = 'https://f1hz33hh-5000.inc1.devtunnels.ms/api/v1';
// export const baseApi = 'https://f1hz33hh-5000.inc1.devtunnels.ms/api/v1';


// Auth
export const loginAuthApi = `${baseApi}/auth/login`;

export const HeadersLoginApi = {
    'Content-Type': 'application/json'
};

// user
export const userApi = `${baseApi}/users`;

// ratings
export const appRatingsApi = `${baseApi}/reviews`;

// commondataapi
export const commonDataApi = `${baseApi}/commondata`

// category
export const categoryApi = `${baseApi}/category`

// level
export const levelApi = `${baseApi}/levels`

// image api
export const imagesApi = `${baseApi}/images`;

// notification
export const notificationsApi = `${baseApi}/notifications`;

// HelpAndSupport
export const queriesApi = `${baseApi}/queries`;

// reports
export const reportsApi = `${baseApi}/reports`;

// reports
export const templateApi = `${baseApi}/template`;

export const HeadersApi = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
};

export const HeadersFormDataApi = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${authToken}`,
};