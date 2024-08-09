import { appStorePersistName } from "lib/stores/app/appStore";

class AppStorage {
    static accessToken = () => {
        const retrievedItem = localStorage.getItem(appStorePersistName);
        return retrievedItem ? JSON.parse(retrievedItem).state.access_token : null;
    };

    static refreshToken = () => {
        const retrievedItem = localStorage.getItem(appStorePersistName);
        return retrievedItem ? JSON.parse(retrievedItem).state.refresh_token : null;
    };

    static get_tokens = () => {
        return {
            access_token: localStorage.getItem("access_token") || "",
            refresh_token: localStorage.getItem("refresh_token") || "",
        };
    };

    static set_tokens = (access_token: string, refresh_token: string) => {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
    };

    static clearStorage = () => {
        localStorage.clear();
    };
}

export default AppStorage;
