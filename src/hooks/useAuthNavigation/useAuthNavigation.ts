import { AUTH_ROUTES } from 'constants/authRoutes'
import { useNavigate } from 'react-router-dom'
import useAppStore from 'stores/app/appStore'

export function useAuthNavigation() {
    const navigate = useNavigate()
    const { user } = useAppStore()

    const status = user?.status

    const navigateBasedOnStatus = () => {
        switch (status) {
            case "NEW":
                return navigate(AUTH_ROUTES.SIGNUP_EMAIL_VERIFICATION)

            case "VERIFIED":
            case "PROFILE_COMPLETED":
                return navigate(AUTH_ROUTES.EXISTING_WEBSITE)

            case "SHOP_INFO_COMPLETED":
            case "ACTIVE":
                return navigate("/analytics/dashboard")

            default:
                return navigate(AUTH_ROUTES.SIGN_UP)
        }
    }

    return { navigateBasedOnStatus }
}
