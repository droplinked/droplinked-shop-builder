import axiosInstance from "lib/axiosConfig"
import { ShippingProfile } from "pages/shipping-management/types/shipping"

export const getShippingProfiles = async () => {
    const response = await axiosInstance.get<{ data: ShippingProfile[] }>('/shippings/v2').then(res => res.data)
    return response.data
}

export const deleteShippingProfile = async (shippingProfileId: string) =>
    axiosInstance.delete(`/shippings/v2/${shippingProfileId}`)

export const createShippingProfile = async (shippingProfile: ShippingProfile) =>
    axiosInstance.post('/shippings/v2/', shippingProfile)

export const updateShippingProfile = async (shippingProfileId: string, shippingProfile: ShippingProfile) =>
    axiosInstance.patch(`/shippings/v2/${shippingProfileId}`, shippingProfile)

export const getShippingProviders = async () => {
    const response = await axiosInstance.get<{ data: string[] }>('/shippings/v2/providers').then(res => res.data)
    return response.data
}