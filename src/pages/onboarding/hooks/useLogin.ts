import useAppToast from "hooks/toast/useToast"
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate"
import useAppStore from "lib/stores/app/appStore"
import { navigating_user_based_on_status } from "lib/utils/helpers/helpers"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export function useLogin() {
    const navigate = useNavigate()
    const { login: authenticateUser, loading } = useAppStore()
    const { shopNavigate } = useCustomNavigate()
    const { showToast } = useAppToast()

    const finalizeLogin = useCallback(async (data: any) => {
        try {
            const { user } = data
            const status = user.status

            if (status === "DELETED") {
                return showToast({ message: "This account has been deleted", type: "error" })
            }

            if (user.type !== "SHOPBUILDER") {
                return showToast({
                    message: "This account is unable to log in. Please check your credentials.",
                    type: "error"
                })
            }

            const { href, dashboard } = navigating_user_based_on_status(status, data)
            dashboard ? shopNavigate(href) : navigate(href)
        }
        catch (error) {
            showToast({ message: error?.message || "An error occurred", type: "error" })
        }
    }, [showToast, navigating_user_based_on_status, shopNavigate, navigate])

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