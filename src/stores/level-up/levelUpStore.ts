import { create } from "zustand";
import { getShopGrowthHack } from "services/shop/shopServices";
import { devtools, persist } from "zustand/middleware";
import { appDevelopment } from "utils/app/variable";

export interface ILevelUp {
    levelUpData: {
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
    fetchLevelUpData: () => Promise<void>;
    resetLevelUpData: () => any;
}

const states = (set, get): ILevelUp => ({
    levelUpData: null,
    isLoading: false,
    error: null,
    fetchLevelUpData: async () => {
        set({ isLoading: true });
        try {
            const response = await getShopGrowthHack();
            set({ levelUpData: response?.data?.data, isLoading: false, error: null });
        } catch (error) {
            set({ error: error?.message, isLoading: false });
        }
    },
    resetLevelUpData: () => set({ levelUpData: null, error: null }),
});

export const levelUpPersistName = "levelUp";
const _persist = persist(states, {
    name: levelUpPersistName,
    partialize: (state) => ({ levelUpData: state.levelUpData, isLoading: state.isLoading }),
});
const useLevelUpStore = appDevelopment ? create<ILevelUp>()(devtools(_persist, { name: "LevelUp" })) : create<ILevelUp>()(_persist);

export default useLevelUpStore;
