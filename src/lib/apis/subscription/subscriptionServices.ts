import axiosInstance from "../axiosConfig";
import { ShopSubscriptionData, SubscriptionCheckout, SubscriptionCryptoCheckout, SubscriptionPlan, SubscriptionPlanPaymentMethod, SubscriptionStripePaymentResult } from "./interfaces";

const endpoint = "subscription"

export const getSubscriptionPlansService = () => axiosInstance.get<{ data: SubscriptionPlan[] }>(endpoint).then(res => res.data)

export const getShopSubscriptionDataService = () => axiosInstance.get<{ data: ShopSubscriptionData }>(`${endpoint}/shop`).then(res => res.data)

export const getSubscriptionPaymentMethodsService = () => axiosInstance.get<{ data: SubscriptionPlanPaymentMethod[] }>(`${endpoint}/payment/chains`).then(res => res.data)

export const subscriptionPlanCryptoPaymentService = ({ chain, token, checkoutData }: SubscriptionCryptoCheckout) => axiosInstance.post(`${endpoint}/crypto/buy/${chain}/${token}`, checkoutData).then(res => res.data)

export const subscriptionPlanStripePaymentService = (checkoutData: SubscriptionCheckout) => axiosInstance.post<{ data: SubscriptionStripePaymentResult }>(`${endpoint}/buy`, checkoutData).then(res => res.data)