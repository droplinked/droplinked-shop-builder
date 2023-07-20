import { collectionService } from "lib/apis/collection/services";

interface IsetLoading {
    set: any
    status: boolean
    model: string
}

export default class dataStoreModel {
    static setLoading = ({ model, set, status }: IsetLoading) => set({
        [model]: {
            isLoading: status
        }
    })

    static getCollections = async (set: any) => {
        try {
            this.setLoading({ model: "collection", set, status: true })
            const data = await collectionService()
            set({
                collection: {
                    data: data.data?.data,
                    loaded: true,
                    isLoading: false
                }
            })
        } catch (error) {
            this.setLoading({ model: "collection", set, status: false })
            console.log(error);
        }
    }
}