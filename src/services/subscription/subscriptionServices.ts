import useAppStore from 'stores/app/appStore';
import {
  ShopSubscriptionData,
  SubscriptionCheckout,
  SubscriptionCryptoCheckout,
  SubscriptionPlan,
  SubscriptionPlanPaymentMethod,
  SubscriptionStripePaymentResult,
  We3TransactionData
} from './interfaces';
import axiosInstance from 'lib/axiosConfig';

const endpoint = 'subscription';

export const getSubscriptionPlansService = () => axiosInstance.get<{ data: SubscriptionPlan[] }>(endpoint).then((res) => res.data);

export const getShopSubscriptionDataService = () => {
  return axiosInstance.get<{ data: ShopSubscriptionData }>(`${endpoint}/shop`).then((res) => {
    const response = res.data;
    useAppStore.getState().updateShopSubscriptionData(response.data);
    return response;
  });
};

export const getSubscriptionPaymentMethodsService = () =>
   axiosInstance.get<{ data: SubscriptionPlanPaymentMethod[] }>(`${endpoint}/payment/chains`).then((res) => res.data);

export const subscriptionPlanCryptoPaymentService = ({ chain, token, checkoutData }: SubscriptionCryptoCheckout) =>
  axiosInstance.post(`${endpoint}/crypto/buy/${chain}/${token}`, checkoutData).then((res) => res.data);

export const sendPlanPurchaseTransactionToWeb3Service = (chain: string, web3Data: We3TransactionData) =>
  axiosInstance.post(`${endpoint}/payment/${chain}`, web3Data).then((res) => res.data);

export const subscriptionPlanStripePaymentService = (checkoutData: SubscriptionCheckout) =>
  axiosInstance.post<{ data: SubscriptionStripePaymentResult }>(`${endpoint}/buy`, checkoutData).then((res) => res.data);

export const cancelSubscription = () => axiosInstance.post(`subscription/cancel`);
