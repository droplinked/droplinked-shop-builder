import useAppToast from "hooks/toast/useToast"
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate"
import { useCallback } from "react"
import useAppStore from "stores/app/appStore"
import useOnboardingStore from "../stores/useOnboardingStore"

export function useLogin() {
    const { login: authenticateUser, loading } = useAppStore()
    const { shopNavigate } = useCustomNavigate()
    const { showToast } = useAppToast()
    const { updateOnboardingState } = useOnboardingStore()

    const finalizeLogin = useCallback(async (data: any) => {
        try {
            const { user } = data
            const status = user.status

            if (status === "DELETED")
                return showToast({ message: "This account has been deleted", type: "error" })

            if (user.type !== "SHOPBUILDER")
                return showToast({
                    message: "This account is unable to log in. Please check your credentials.",
                    type: "error"
                })

            switch (status) {
                case "NEW":
                    return updateOnboardingState("currentStep", "SIGNUP_EMAIL_VERIFICATION")

                case "VERIFIED":
                case "PROFILE_COMPLETED":
                    return updateOnboardingState("currentStep", "EXISTING_WEBSITE")

                case "SHOP_INFO_COMPLETED":
                case "ACTIVE":
                    return shopNavigate("dashboard")
            }
        }
        catch (error) {
            showToast({ message: error?.message || "An error occurred", type: "error" })
        }
    }, [showToast, updateOnboardingState, shopNavigate])

    const onLoginSubmit = useCallback(async (data: any) => {
        try {
            const result = await authenticateUser({ type: "default", params: { ...data, userType: "PRODUCER" } })
            if (result) finalizeLogin(result)
        }
        catch (error) {
            showToast({ message: error?.message || "Login failed", type: "error" })
        }
    }, [authenticateUser, finalizeLogin, showToast])

    return { authenticateUser, finalizeLogin, onLoginSubmit, loading }
}