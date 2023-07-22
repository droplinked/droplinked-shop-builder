import { collectionService } from "lib/apis/collection/services";

interface IsetLoading {
    set: any
    status: boolean
    model: string
}

export default class dataStoreModel {
    static getCollections = async (set: any, collections: any) => {
        try {
            const data = await collectionService()
            set({
                collection: {
                    ...collections,
                    data: data.data?.data,
                    loaded: true,
                    isError: false
                }
            })
        } catch (error) {
            set({ collection: { isError: true } })
        }
    }
}