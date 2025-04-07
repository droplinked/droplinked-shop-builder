import axiosInstance from "../axiosConfig";
import { StripeAccountOnboardingResponse } from "./interface";

export const getStripeOnboardingUrl = () =>
    axiosInstance.get<StripeAccountOnboardingResponse>(`stripe/account-onboarding`)
