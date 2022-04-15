import AuthStorage from '../AuthStorage';
import { API } from '../../config/API/api.config';

export const BaseURL = API.endpoint + '/';
const axios = require('axios').default;

const defaultHeaders = {
    isAuth: true,
    AdditionalParams: {},
    isJsonRequest: true
};


interface apiResponse {
    data: {
        data: any,
        message: string,
        status: number
    },
    status: number
}


export const ApiGet = (type: string) => {
    return new Promise((resolve, reject) => {
        axios.get(BaseURL + type, getHttpOptions())
            .then((responseJson: apiResponse) => {
                resolve(responseJson);
                console.log(responseJson);

            })
            .catch((error: any) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiGetNoAuth = (type: string) => {
    return new Promise((resolve, reject) => {
        axios.get(BaseURL + type, getHttpOptions({ ...defaultHeaders, isAuth: false }))
            .then((responseJson: apiResponse) => {
                resolve(responseJson.data);
            })
            .catch((error: any) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    }) ;
}






export const ApiPost = (type: any, userData: any) => {
    return new Promise((resolve, reject) => {
        axios.post(BaseURL + type, userData, getHttpOptions())
            .then((responseJson: apiResponse) => {
                resolve(responseJson.data);
            })
            .catch((error: any) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}




export const ApiPostNoAuth = (type: string, userData: any) => {
    return new Promise((resolve, reject) => {
        axios.post(BaseURL + type, userData, getHttpOptions({...defaultHeaders, isAuth: false}))
            .then((responseJson: apiResponse) => {
                resolve(responseJson.data);
            })
            .catch((error: any) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('message') && error.response.data.message) {
                    reject(error.response.data.message);
                } else {
                    reject(error);                  
                }
            });
    });
}



export const getHttpOptions = (options = defaultHeaders) => {
    let headers = {
        Authorization: "",
        'Content-Type': "application/json"
    };

    if (options.hasOwnProperty('isAuth') && options.isAuth) {
        headers['Authorization'] = AuthStorage.getToken() ?? "";
    }

    if (options.hasOwnProperty('isJsonRequest') && options.isJsonRequest) {
        headers['Content-Type'] = 'application/json';
    }

    if (options.hasOwnProperty('AdditionalParams') && options.AdditionalParams) {
        headers = { ...headers, ...options.AdditionalParams };
    }

    return { headers }
}