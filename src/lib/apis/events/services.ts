import axiosInstance from "../axiosConfig"
import { IimportEvents } from "./interfaces"

export const getEvents = () => {
  return axiosInstance.get(`/events`).then((res) => res?.data?.data)
}

export const importEvents = (props: IimportEvents) => {
  return axiosInstance.post(`/events/imports`, props)
}

export const eventLogin = () => {
  return axiosInstance.post(`/events/login-link`).then((res) => res?.data?.data)
}