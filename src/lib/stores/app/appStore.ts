import { IauthLoginService } from 'lib/apis/auth/interfaces'
import { authLoginService } from 'lib/apis/auth/services'
import { IshopInfoService, IshopUpdateService } from 'lib/apis/shop/interfaces'
import { shopInfoService, shopUpdateService } from 'lib/apis/shop/shopServices'
import { userUpdateService } from 'lib/apis/user/services'
import { appDeveloment } from 'lib/utils/app/variable'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface IUserWalletsProps {
    type: string
    address: string
    public_key?: string
}

interface IUser {
    wallets: Array<IUserWalletsProps>
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
    updateWallet({ address, type, public_key }: IUserWalletsProps): void
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
                    loading: false,
                    ...result?.user?.status !== "NEW" && {
                        user: result?.user,
                        shop: result?.shop,
                        access_token: result?.access_token,
                    }
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
    updateState: ({ key, params }: IPropsUpdatestate) => { set({ ...get, [key]: params }) },
    updateWallet: ({ address, type, public_key }: IUserWalletsProps) => {
        set(state => {
            const prevWallets = state.user?.wallets
            const checkWallet = prevWallets && prevWallets.find((el: IUserWalletsProps) => el.type === type && el.address)
            if (checkWallet) return prevWallets
            
            const wallets = [...prevWallets ? prevWallets.filter(el => el.type !== type) : [], { type, address, public_key }]
            userUpdateService({ wallets })
            return {
                ...state,
                user: { ...state.user, wallets }
            }
        })
    }
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