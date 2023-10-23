import { IauthLoginService } from 'lib/apis/auth/interfaces'
import { authLoginService } from 'lib/apis/auth/services'
import { IshopInfoService, IshopUpdateService } from 'lib/apis/shop/interfaces'
import { shopInfoService, shopUpdateService } from 'lib/apis/shop/shopServices'
import { appDeveloment } from 'lib/utils/app/variable'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface IUserProps {
    type: string
    address: string
    public_key?: string
}

interface IUser {
    wallets: Array<IUserProps>
    [propname: string]: any
}

interface IPropsUpdatestate {
    key: string
    params: any
}

export interface IAppStore {
    user: IUser
    shop: any
    loading: boolean
    access_token: string | null
    login(params: IauthLoginService): Promise<any>
    fetchShop(params: IshopInfoService): Promise<any>
    reset(): void
    updateShop(params: IshopUpdateService): Promise<any>
    updateState({ key, params }: IPropsUpdatestate): void
}

const states = (set: any, get: any): IAppStore => ({
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
    reset: () => {
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
    updateState: ({ key, params }: IPropsUpdatestate) => { set({ ...get, [key]: params }) }
})

export const appStorePersistName = "appStore"
const _persist = persist(states, {
    name: appStorePersistName, partialize: (state) => ({
        shop: state.shop,
        user: state.user,
        access_token: state.access_token,
    })
})
const useAppStore = appDeveloment ? create<IAppStore>()(devtools(_persist, { name: "App" })) : create<IAppStore>()(_persist)

export default useAppStore