import { appDeveloment } from 'lib/utils/app/variable'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import dataStoreModel from './model'

interface Iitem {
    data: Array<any>,
    fetch: Function
    loaded: boolean
    isError: boolean
}

export interface IDataStore {
    collection: Iitem
    reset: Function
}

// Call methods as model
const { getCollections } = dataStoreModel

const data = (set: any) => ({
    collection: {
        data: [],
        fetch: () => getCollections(set),
        loaded: false,
        isError: false
    }
})

// Initial states
const states = (set: any): IDataStore => ({
    collection: data(set).collection,
    reset: () => {
        set({
            collection: data(set).collection
        })
    }
})

export const appStorePersistName = "dataStore"
const useDataStore = appDeveloment ? create<IDataStore>()(devtools(states, { name: "Datas" })) : create<IDataStore>()(states)

export default useDataStore