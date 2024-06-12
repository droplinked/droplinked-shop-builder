import { ShopSubscriptionData } from "lib/apis/subscription/interfaces"
import { getShopSubscriptionDataService } from "lib/apis/subscription/subscriptionServices"
import { useCallback } from "react"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type ShopPermissions = {
    shopSubscriptionData: ShopSubscriptionData,
    fetchShopPermissionsAsync: () => Promise<void>,
    updateShopPermissionsAsync: () => Promise<void>,
    hasPermission: (permission: string) => boolean
}

const useShopPermissionsStore = create<ShopPermissions>()(persist((set, get) => ({
    shopSubscriptionData: {} as ShopSubscriptionData,
    fetchShopPermissionsAsync: async () => {
        try {
            const { data } = await getShopSubscriptionDataService()
            set({ shopSubscriptionData: data })
        } catch (error) {
            throw new Error(error.message)
        }
    },
    updateShopPermissionsAsync: async () => {
        try {

        } catch (error) {

        }
    },
    hasPermission: (permission: string) => {
        const { shopSubscriptionData } = get()
        const permissions = shopSubscriptionData.subscriptionId.subOptionIds

        const permissionObj = permissions.find(p => p.key === permission)
        if (!permissionObj) return false

        const value = permissionObj.value
        return (value || (!isNaN(Number(value)) && Number(value) > 0)) ? true : false
    }
}),
    { name: 'shop-permissions-storage' }
))

export const useHasPermission = () => useShopPermissionsStore(state => state.hasPermission)

export default useShopPermissionsStore