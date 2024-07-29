import { ICompleteGoogleSignupService, IauthLoginService } from 'lib/apis/auth/interfaces'
import { authLoginService, completeGoogleSignupService } from 'lib/apis/auth/services'
import { IshopInfoService, IshopUpdateService } from 'lib/apis/shop/interfaces'
import { shopInfoService, shopUpdateService } from 'lib/apis/shop/shopServices'
import { ShopSubscriptionData } from 'lib/apis/subscription/interfaces'
import { IGetUserService } from 'lib/apis/user/interfaces'
import { getUserService, userUpdateService } from 'lib/apis/user/services'
import { appDevelopment } from 'lib/utils/app/variable'
import AppErrors from 'lib/utils/statics/errors/errors'
import { toast } from 'react-toastify'
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
    login(method: { type: "default", params: IauthLoginService } | { type: "google", access_token: string, refresh_token: string, params: ICompleteGoogleSignupService } | { type: "get", access_token: string, refresh_token: string, params: IGetUserService }): Promise<any>
    fetchShop(params: IshopInfoService): Promise<any>
    reset(): void
    updateShop(params: IshopUpdateService): Promise<any>
    updateState({ key, params }: IPropsUpdatestate): void
    updateWallet({ address, type, public_key }: IUserWalletsProps): void
    updateShopSubscriptionData: (shopSubscriptionData: ShopSubscriptionData) => void,
    hasPermission: (permission: string) => boolean,
    checkPermissionAndShowToast: (permission: string, message?: string) => boolean,
    getPermissionValue: (permission: string) => any
}

const states = (set, get): IAppStore => ({
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
                if (method.type === "default") data = await authLoginService(method.params)
                if (method.type === "google") data = await completeGoogleSignupService(method.params)
                if (method.type === "get") data = await getUserService(method.params)

                const result = data?.data?.data
                const access_token = method.type === "default" ? result?.access_token : method.access_token
                const refresh_token = method.type === "default" ? result?.refresh_token : method.refresh_token;
                if (!result?.user || !result?.shop) throw Error('This user cannot log in')
                let status = window.location.pathname === "/plans" ? "VERIFY" : result?.user?.status
                status === "NEW" && toast["info"]("Please verify your email to log in")

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
        const { shop: prevShop } = get()
        return new Promise<any>(async (resolve, reject) => {
            try {
                set({ loading: true })
                const data = await shopInfoService(params)
                const shop = data.data.data
                set({ shop: { ...prevShop, ...shop }, loading: false })
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
    },
    updateShopSubscriptionData: (shopSubscriptionData) => {
        const { shop } = get()
        set({ shop: { ...shop, subscription: shopSubscriptionData } })
    },
    hasPermission: (permission) => {
        const { shop } = get()
        const permissions = shop.subscription.subscriptionId.subOptionIds
        const permissionObj = permissions.find(p => p.key === permission)
        if (!permissionObj) return false

        const value = permissionObj.value
        return (value || (!isNaN(Number(value)) && Number(value) > 0)) ? true : false
    },
    checkPermissionAndShowToast: (permission, message) => {
        const { hasPermission } = get()
        if (!hasPermission(permission)) {
            toast["error"](message || AppErrors.permission.permission_denied)
            return false
        }
        return true
    },
    getPermissionValue: (permission) => {
        const { shop } = get()
        const permissions = shop.subscription.subscriptionId.subOptionIds
        const permissionObj = permissions.find(p => p.key === permission)
        if (!permissionObj) return null

        return permissionObj.value
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

export const useHasPermission = () => useAppStore(state => state.hasPermission)
export const useCheckPermission = () => useAppStore(state => state.checkPermissionAndShowToast)
export const useGetPermissionValue = () => useAppStore(state => state.getPermissionValue)
export const useLegalUsage = () => useAppStore(state => state.shop.subscription.legalUsage)
export const useUpdateShopPermissions = () => useAppStore(state => state.updateShopSubscriptionData)

export default useAppStore