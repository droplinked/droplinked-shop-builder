import axiosInstance from "../axiosConfig"

export const chainsService = () => {
    return axiosInstance.get(`rule-set/available-chains`)
}