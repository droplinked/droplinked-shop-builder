import { IauthLoginService } from 'lib/apis/auth/interfaces'
import { authLoginService } from 'lib/apis/auth/services'
import { IshopInfoService, IshopUpdateService } from 'lib/apis/shop/interfaces'
import { shopInfoService, shopUpdateService } from 'lib/apis/shop/shopServices'
import AppStorage from 'lib/utils/app/sessions'
import { appDeveloment } from 'lib/utils/app/variable'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface IAppStore {
    user: any
    shop: any
    loading: boolean
    access_token: string | null
    login(params: IauthLoginService): Promise<any>
    fetchShop(params: IshopInfoService): Promise<any>
    clearShop(): void
    updateShop(params: IshopUpdateService): Promise<any>
}

const states = (set: any): IAppStore => ({
    user: null,
    shop: null,
    access_token: null,
    loading: false,
    login: (params: IauthLoginService) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                set({ loading: true })
                const data = await authLoginService(params)
                const result = data.data.data
                set({
                    user: result?.user,
                    shop: result?.shop,
                    access_token: result?.access_token,
                    loading: false
                })
                resolve(result)
            } catch (error) {
                reject(error?.response?.data);
                set({ loading: false })
            }
        })
    },
    fetchShop: (params: IshopInfoService) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                set({ loading: true })
                const data = await shopInfoService(params)
                const shop = data.data.data
                set({ shop, loading: false })
                resolve(shop)
            } catch (error) {
                reject(error?.response?.data);
                set({ loading: false })
            }
        })
    },
    clearShop: () => {
        AppStorage.clearStorage()
        set({
            user: null,
            shop: null,
            access_token: null,
            loading: false,
        })
    },
    updateShop: (params: IshopUpdateService) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                set({ loading: true })
                const data = await shopUpdateService(params)
                const shop = data.data.data
                set({ shop, loading: false })
                resolve(shop)
            } catch (error) {
                reject(error?.response?.data);
                set({ loading: false })
            }
        })
    },
})

export const appStorePersistName = "appStore"
const _persist = persist(states, { name: appStorePersistName, partialize: (state) => ({
    shop: state.shop,
    user: state.user,
    access_token: state.access_token,
}) })
const useAppStore = appDeveloment ? create<IAppStore>()(devtools(_persist, { name: "App" })) : create<IAppStore>()(_persist)

export default useAppStore