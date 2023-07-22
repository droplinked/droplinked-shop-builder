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
}

// Call methods as model
const { getCollections } = dataStoreModel

// Initial states
const states = (set: any, get: any): IDataStore => ({
    collection: {
        data: [],
        fetch: () => getCollections(set, get().collection),
        loaded: false,
        isError: false
    },
})

export const appStorePersistName = "dataStore"
const useDataStore = appDeveloment ? create<IDataStore>()(devtools(states, { name: "Datas" })) : create<IDataStore>()(states)

export default useDataStore