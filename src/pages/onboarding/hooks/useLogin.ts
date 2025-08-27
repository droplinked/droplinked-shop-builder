import useAppToast from "hooks/toast/useToast"
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate"
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { useCallback } from "react"
import useAppStore from "stores/app/appStore"
import useOnboardingStore from "../stores/useOnboardingStore"

export function useLogin() {
    const { login: authenticateUser, loading } = useAppStore()
    const { shopNavigate } = useCustomNavigate()
    const { showToast } = useAppToast()
    const { updateOnboardingState } = useOnboardingStore()
    const { t } = useLocaleResources('onboarding')

    const handleUserValidation = useCallback((user: any) => {
        if (user.status === "DELETED") {
            showToast({ message: t('useLogin.errors.accountDeleted'), type: "error" })
            return false
        }

        if (user.type !== "SHOPBUILDER") {
            showToast({
                message: t('useLogin.errors.accountUnableToLogin'),
                type: "error"
            })
            return false
        }

        return true
    }, [showToast, t])

    const redirectAfterOnboardingLogin = useCallback((userStatus: string) => {
        switch (userStatus) {
            case "NEW":
                updateOnboardingState("currentStep", "SIGNUP_EMAIL_VERIFICATION")
                break

            case "VERIFIED":
            case "PROFILE_COMPLETED":
                updateOnboardingState("currentStep", "EXISTING_WEBSITE")
                break

            case "SHOP_INFO_COMPLETED":
            case "ACTIVE":
                // AuthGuard will now handle access to dashboard automatically
                shopNavigate("dashboard")
                break

            default:
                showToast({ message: t('common:genericError'), type: "error" })
        }
    }, [updateOnboardingState, shopNavigate, showToast, t])

    const handleLoginSuccess = useCallback(async (loginResponse: any) => {
        try {
            const { user } = loginResponse

            if (!handleUserValidation(user)) return

            redirectAfterOnboardingLogin(user.status)
        }
        catch (error) {
            showToast({ message: t('common:genericError'), type: "error" })
        }
    }, [handleUserValidation, redirectAfterOnboardingLogin, showToast, t])

    const handleLoginSubmit = useCallback(async (loginData: any) => {
        try {
            const response = await authenticateUser({
                type: "default",
                params: { ...loginData, userType: "PRODUCER" }
            })

            if (response) {
                await handleLoginSuccess(response)
            }
        }
        catch (error) {
            showToast({
                message: error?.message || t('useLogin.errors.loginFailed'),
                type: "error"
            })
        }
    }, [authenticateUser, handleLoginSuccess, showToast, t])

    return {
        authenticateUser,
        handleLoginSuccess,
        handleLoginSubmit,
        loading
    }
}