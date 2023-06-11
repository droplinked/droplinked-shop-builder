import useAppStore, { appStorePersistName } from "lib/stores/app/appStore"

class AppStorage {
    static accessToken = () => {
        const token = localStorage.getItem(appStorePersistName)
        return token ? JSON.parse(token).state.access_token : null
    }
    static clearStorage = () => {
        localStorage.clear();
    }
}

export default AppStorage