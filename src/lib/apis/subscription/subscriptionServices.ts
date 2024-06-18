import axiosInstance from "../axiosConfig";
import { ShopSubscriptionData, SubscriptionCheckout, SubscriptionPlan, SubscriptionPurchaseResult } from "./interfaces";

const endpoint = "subscription"

export const getSubscriptionPlansService = () => axiosInstance.get<{ data: SubscriptionPlan[] }>(endpoint).then(res => res.data)

export const getShopSubscriptionDataService = () => axiosInstance.get<{ data: ShopSubscriptionData }>(`${endpoint}/shop`).then(res => res.data)

export const buySubscriptionPlanService = (checkoutData: SubscriptionCheckout) => axiosInstance.post<{ data: SubscriptionPurchaseResult }>(`${endpoint}/buy`).then(res => res.data)