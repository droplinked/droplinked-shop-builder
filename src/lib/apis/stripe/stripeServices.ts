import axiosInstance from "../axiosConfig"
import { IStripeResponse } from "./interfaces"

export const createStripeOnboardingLinkService = () => {
    return axiosInstance.get<IStripeResponse>("stripe/account-onboarding")
}