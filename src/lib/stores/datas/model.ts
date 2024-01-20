import { collectionService } from "lib/apis/collection/services";
import { IDataStore } from "./dataStore";

const dataStoreModel = ({
    getCollections: async (set: any) => {
        try {
            const data = await collectionService()
            set((state: IDataStore) => ({
                collection: {
                    ...state.collection,
                    data: data.data?.data,
                    loaded: true,
                    isError: false
                }
            }))
        } catch (error) {
            set((state: IDataStore) => ({ collection: { ...state.collection, isError: true } }))
        }
    }
})

export default dataStoreModel