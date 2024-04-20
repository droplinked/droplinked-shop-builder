import { ICompleteGoogleSignupService, IauthLoginService } from 'lib/apis/auth/interfaces'
import { authLoginService, completeGoogleSignupService } from 'lib/apis/auth/services'
import { IshopInfoService, IshopUpdateService } from 'lib/apis/shop/interfaces'
import { shopInfoService, shopUpdateService } from 'lib/apis/shop/shopServices'
import { IGetUserService } from 'lib/apis/user/interfaces'
import { getUserService, userUpdateService } from 'lib/apis/user/services'
import { appDevelopment } from 'lib/utils/app/variable'
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
    refresh_token: string | null
    login(method: {type: "default", params: IauthLoginService} | {type: "google", params: ICompleteGoogleSignupService} | {type: "get", access_token: string, refresh_token: string, params: IGetUserService}): Promise<any>
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
    refresh_token: null,
    loading: false,
    login: (method) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                set({ loading: true })
                let data;
                if(method.type === "default") data = await authLoginService(method.params)
                if(method.type === "google") data = await completeGoogleSignupService(method.params)
                if(method.type === "get") data = await getUserService(method.params)

                const result = data?.data?.data
                const access_token = method.type === "get" ? method.access_token : result?.access_token
                const refresh_token = method.type === "get" ? method.refresh_token : result?.refresh_token;
                if (!result?.user || !result?.shop) throw Error('This user cannot log in')
                let status = appDevelopment && result?.user?.status === "NEW" ? "VERIFIED" : result?.user?.status

                set({
                    loading: false,
                    ...status !== "NEW" && {
                        user: result?.user,
                        shop: result?.shop,
                        access_token,
                        refresh_token,
                    }
                })
                resolve(result)
            } catch (error) {
                reject(error?.response?.data || error);
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
    updateState: ({ key, params }: IPropsUpdatestate) => { set(prev => ({ ...prev, [key]: params })) },
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
        refresh_token: state.refresh_token,
    })
})
const useAppStore = appDevelopment ? create<IAppStore>()(devtools(_persist, { name: "App" })) : create<IAppStore>()(_persist)

export default useAppStore