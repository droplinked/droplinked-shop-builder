import { ShopSubscriptionData } from "lib/apis/subscription/interfaces"
import { getShopSubscriptionDataService } from "lib/apis/subscription/subscriptionServices"
import AppErrors from "lib/utils/statics/errors/errors"
import { toast } from 'react-toastify'
import { create } from "zustand"
import { persist } from "zustand/middleware"

type ShopPermissions = {
    shopSubscriptionData: ShopSubscriptionData,
    fetchShopSubscriptionDataAsync: () => Promise<void>,
    updateShopSubscriptionData: (shopSubscriptionData: ShopSubscriptionData) => void,
    hasPermission: (permission: string) => boolean,
    checkPermissionAndShowToast: (permission: string, message?: string) => boolean,
    getPermissionValue: (permission: string) => any
}

const useShopPermissionsStore = create<ShopPermissions>()(persist((set, get) => ({
    shopSubscriptionData: {} as ShopSubscriptionData,
    fetchShopSubscriptionDataAsync: async () => {
        try {
            const { data } = await getShopSubscriptionDataService()
            set({ shopSubscriptionData: data })
        } catch (error) {
            throw new Error(error.message)
        }
    },
    updateShopSubscriptionData: (shopSubscriptionData) => {
        set({ shopSubscriptionData })
    },
    hasPermission: (permission) => {
        const { shopSubscriptionData } = get()
        const permissions = shopSubscriptionData.subscriptionId.subOptionIds
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
        const { shopSubscriptionData } = get()
        const permissions = shopSubscriptionData.subscriptionId.subOptionIds
        const permissionObj = permissions.find(p => p.key === permission)
        if (!permissionObj) return null

        return permissionObj.value
    }
}),
    { name: 'shop-permissions-storage' }
))

export const useHasPermission = () => useShopPermissionsStore(state => state.hasPermission)
export const useCheckPermission = () => useShopPermissionsStore(state => state.checkPermissionAndShowToast)
export default useShopPermissionsStore