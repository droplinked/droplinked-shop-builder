import axiosInstance from "lib/axiosConfig"
import { ShippingProfile } from "pages/shipping-management/types/shipping"

const shippingManagementEndpoint = '/shippings/v2'

export const getShippingProfiles = async () => {
    const response = await axiosInstance.get<{ data: ShippingProfile[] }>(shippingManagementEndpoint).then(res => res.data)
    return response.data
}

export const deleteShippingProfile = async (shippingProfileId: string) =>
    axiosInstance.delete(`${shippingManagementEndpoint}/${shippingProfileId}`)

export const createShippingProfile = async (shippingProfile: ShippingProfile) =>
    axiosInstance.post(shippingManagementEndpoint, shippingProfile)

export const updateShippingProfile = async (shippingProfileId: string, shippingProfile: ShippingProfile) =>
    axiosInstance.put(`${shippingManagementEndpoint}/${shippingProfileId}`, shippingProfile)

export const getShippingProviders = async () => {
    const response = await axiosInstance.get<{ data: string[] }>(`${shippingManagementEndpoint}/providers`).then(res => res.data)
    return response.data
}