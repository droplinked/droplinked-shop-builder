import { create } from "zustand"
import { ShippingProfile } from "../types/shipping"

const initialState: ShippingProfile = {
    name: "",
    zones: []
}
interface Actions {
    updateShippingProfile: <K extends keyof ShippingProfile>(key: K, value: ShippingProfile[K]) => void,
    resetShippingProfile: () => void
}

const useShippingManagementStore = create<ShippingProfile & Actions>((set) => ({
    ...initialState,
    updateShippingProfile: (key, value) => set((state) => ({ ...state, [key]: value })),
    resetShippingProfile: () => set(initialState)
}))

export default useShippingManagementStore