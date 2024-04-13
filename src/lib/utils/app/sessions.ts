import { appStorePersistName } from "lib/stores/app/appStore"

class AppStorage {
    static accessToken = () => {
        const retrievedItem = localStorage.getItem(appStorePersistName)
        return retrievedItem ? JSON.parse(retrievedItem).state.access_token : null
    }

    static refreshToken = () => {
        const retrievedItem = localStorage.getItem(appStorePersistName)
        return retrievedItem ? JSON.parse(retrievedItem).state.refresh_token : null
    }

    static clearStorage = () => {
        localStorage.clear()
    }
}

export default AppStorage