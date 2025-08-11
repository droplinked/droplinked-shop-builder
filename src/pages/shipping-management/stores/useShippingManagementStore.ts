import { create } from "zustand"
import { ShippingProfile } from "../types/shipping"

const initialState: ShippingProfile = {
    name: "",
    zones: [],
}

interface State {
    shippingProfile: ShippingProfile,
    address: any,
}

interface Actions {
    updateShippingProfile: <K extends keyof ShippingProfile>(key: K, value: ShippingProfile[K]) => void,
    updateAddress: (address: any) => void,
    resetState: () => void
}

const useShippingManagementStore = create<State & Actions>((set) => ({
    shippingProfile: initialState,
    address: {},
    updateShippingProfile: (key, value) => set((state) => ({ shippingProfile: { ...state.shippingProfile, [key]: value } })),
    updateAddress: (address) => set({ address }),
    resetState: () => set({ shippingProfile: initialState, address: {} })
}))

export default useShippingManagementStore