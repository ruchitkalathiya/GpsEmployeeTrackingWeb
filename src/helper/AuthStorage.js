import STORAGEKEY from "../config/APP/app.config";

class AuthStorage {

    static setStorageData(key, data, keepMeLoggedIn) {
        keepMeLoggedIn ? localStorage.setItem(key, data) : sessionStorage.setItem(key, data);
    }

    static setStorageJsonData(key, data, keepMeLoggedIn) {
        keepMeLoggedIn ? localStorage.setItem(key, JSON.stringify(data)) : sessionStorage.setItem(key, JSON.stringify(data));
    }

    static getStorageData(key) {
        return localStorage.getItem(key) ? localStorage.getItem(key) : sessionStorage.getItem(key);
    }

    static getStorageJsonData(key) {
        const data = localStorage.getItem(key) ? localStorage.getItem(key) : sessionStorage.getItem(key);
        return JSON.parse(data);
    }

    static getToken() {
        return localStorage.getItem(STORAGEKEY.token) ? localStorage.getItem(STORAGEKEY.token) : sessionStorage.getItem(STORAGEKEY.token);
    }

    static isUserAuthenticated() {
        return (localStorage.getItem(STORAGEKEY.token) !== null || sessionStorage.getItem(STORAGEKEY.token) !== null);
    }

    static deauthenticateUser() {
        localStorage.removeItem(STORAGEKEY.token);
        localStorage.removeItem(STORAGEKEY.userId);
        localStorage.removeItem(STORAGEKEY.userName);

        sessionStorage.removeItem(STORAGEKEY.token);
        sessionStorage.removeItem(STORAGEKEY.userId);
        sessionStorage.removeItem(STORAGEKEY.userName);
    }
}

export default AuthStorage;
