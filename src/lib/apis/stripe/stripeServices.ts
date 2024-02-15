import axiosInstance from "../axiosConfig"

export const createStripeOnboardingLinkService = () => {
    return axiosInstance.get<{ url: string }>("stripe/account-onboarding")
}

export const createStripeLoginLinkService = () => {
    return axiosInstance.get("stripe/login-link")
}