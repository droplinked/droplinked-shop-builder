import { appStorePersistName } from "lib/stores/app/appStore";

class AppStorage {
    /**
     * Gets the access token from localStorage.
     * @returns {string|null} Access token or null if not found.
     */
    static getAccessToken = () => {
        const retrievedItem = localStorage.getItem(appStorePersistName);
        return retrievedItem ? JSON.parse(retrievedItem).state.access_token : null;
    };

    /**
     * Gets the refresh token from localStorage.
     * @returns {string|null} Refresh token or null if not found.
     */
    static getRefreshToken = () => {
        const retrievedItem = localStorage.getItem(appStorePersistName);
        return retrievedItem ? JSON.parse(retrievedItem).state.refresh_token : null;
    };

    /**
     * Gets both access and refresh tokens from localStorage.
     * @returns {Object} Tokens object with access_token and refresh_token.
     */
    static getTokens = () => {
        return {
            access_token: localStorage.getItem("access_token") || "",
            refresh_token: localStorage.getItem("refresh_token") || "",
        };
    };

    /**
     * Stores access and refresh tokens in localStorage.
     * @param {string} access_token - Access token.
     * @param {string} refresh_token - Refresh token.
     */
    static setTokens = (access_token: string, refresh_token: string) => {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
    };

    /**
     * Clears all data from localStorage.
     */
    static clearStorage = () => {
        localStorage.clear();
    };
}

export default AppStorage;
