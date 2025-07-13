import axiosInstance from "lib/axiosConfig";
import { StripeAccountOnboardingResponse } from "./interface";

export const getStripeOnboardingUrl = () =>
    axiosInstance.get<StripeAccountOnboardingResponse>(`stripe/account-onboarding`)
