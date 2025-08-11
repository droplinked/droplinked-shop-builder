import { IcreateAddressService } from "services/address/interfaces"
import { create } from "zustand"
import { ShippingProfile } from "../types/shipping"

const initialState: ShippingProfile = {
    name: "",
    zones: [],
}

const initialAddress: IcreateAddressService = {
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    city: "",
    state: "",
    zip: "",
    addressType: "SHOP",
}

interface State {
    shippingProfile: ShippingProfile,
    address: IcreateAddressService,
}

interface Actions {
    updateShippingProfile: <K extends keyof ShippingProfile>(key: K, value: ShippingProfile[K]) => void,
    updateAddress: <K extends keyof IcreateAddressService>(key: K, value: IcreateAddressService[K]) => void,
    resetState: () => void
}

const useShippingManagementStore = create<State & Actions>((set) => ({
    shippingProfile: initialState,
    address: initialAddress,
    updateShippingProfile: (key, value) => set((state) => ({ shippingProfile: { ...state.shippingProfile, [key]: value } })),
    updateAddress: (key, value) => set((state) => ({ address: { ...state.address, [key]: value } })),
    resetState: () => set({ shippingProfile: initialState, address: initialAddress })
}))

export default useShippingManagementStore