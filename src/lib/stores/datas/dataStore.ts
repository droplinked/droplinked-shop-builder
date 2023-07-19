import { IauthLoginService } from 'lib/apis/auth/interfaces'
import { authLoginService } from 'lib/apis/auth/services'
import { IshopInfoService, IshopUpdateService } from 'lib/apis/shop/interfaces'
import { shopInfoService, shopUpdateService } from 'lib/apis/shop/shopServices'
import AppStorage from 'lib/utils/app/sessions'
import { appDeveloment } from 'lib/utils/app/variable'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Iitem {
    data: Array<string>,
    fetch: boolean
}

export interface IDataStore {
    collection: Iitem
}

const states = (set: any): IDataStore => ({
    collection: {
        data: [],
        fetch: false
    },
})

export const appStorePersistName = "dataStore"
const useDataStore = appDeveloment ? create<IDataStore>()(devtools(states, { name: "Datas" })) : create<IDataStore>()(states)

export default useDataStore