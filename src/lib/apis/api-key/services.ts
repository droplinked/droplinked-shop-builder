import axiosInstance from "../axiosConfig"
import { ICheckEventApiKey } from "./interfaces"

export const creatEventApiKey = (props: ICheckEventApiKey) => {
  return axiosInstance.post(`/api-key`, props)

}
export const checkEventApiKey = (props: ICheckEventApiKey) => {
  return axiosInstance.patch(`/api-key/check`, props).then((res) => res?.data?.data)
}
export const checkEventAccountConnection = () => {
  return axiosInstance.get(`/api-key/check`).then((res) => res?.data?.data)
}