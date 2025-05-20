import { create } from "zustand";
import { getShopGrowthHack } from "lib/apis/shop/shopServices";
import { devtools, persist } from "zustand/middleware";
import { appDevelopment } from "utils/app/variable";

export interface IGrowthHack {
    growthHackData: {
        _id: string;
        shopId: string;
        list: {
            createFirstProduct: boolean;
            customizeShop: boolean;
            joinAffiliateMarket: boolean;
            sellFirstProduct: boolean;
        };
    } | null;
    isLoading: boolean;
    error: any;
    fetchGrowthHackData: () => Promise<void>;
    resetGrowthHackData: () => any;
}

const states = (set, get): IGrowthHack => ({
    growthHackData: null,
    isLoading: false,
    error: null,
    fetchGrowthHackData: async () => {
        set({ isLoading: true });
        try {
            const response = await getShopGrowthHack();
            set({ growthHackData: response?.data?.data, isLoading: false, error: null });
        } catch (error) {
            set({ error: error?.message, isLoading: false });
        }
    },
    resetGrowthHackData: () => set({ growthHackData: null, error: null }),
});

export const growthHackPersistName = "growthHack";
const _persist = persist(states, {
    name: growthHackPersistName,
    partialize: (state) => ({ growthHackData: state.growthHackData, isLoading: state.isLoading }),
});
const useGrowthHackStore = appDevelopment ? create<IGrowthHack>()(devtools(_persist, { name: "GrowthHack" })) : create<IGrowthHack>()(_persist);

export default useGrowthHackStore;
