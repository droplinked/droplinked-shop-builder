import axiosInstance from "lib/axiosConfig"
import { ShippingProfile } from "pages/shipping-management/types/shipping"

export const getShippingProfiles = async () => {
    const response = await axiosInstance.get<{ data: ShippingProfile[] }>('/shippings/v2').then(res => res.data)
    return response.data
}

export const deleteShippingProfile = async (shippingProfileId: string) =>
    axiosInstance.delete(`/shippings/v2/${shippingProfileId}`)

export const createShippingProfile = async (shippingProfile: ShippingProfile) => {
    const response = await axiosInstance.post('/shipping-profiles', shippingProfile)
    return response.data
}