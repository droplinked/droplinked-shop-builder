import { AUTH_ROUTES } from 'constants/authRoutes'
import { useNavigate } from 'react-router-dom'
import useAppStore from 'stores/app/appStore'

export function useCrossmintNavigation() {
    const { user: { status } } = useAppStore()
    const navigate = useNavigate()

    const navigateBasedOnStatus = () => {
        switch (status) {
            case "SHOP_INFO_COMPLETED":
            case "IMS_TYPE_COMPLETED":
            case "ACTIVE":
                return navigate("/analytics/dashboard")

            case "VERIFIED":
            case "PROFILE_COMPLETED":
                return navigate(AUTH_ROUTES.SIGN_IN)

            default:
                return navigate(AUTH_ROUTES.SIGN_UP)
        }
    }

    const getButtonText = () => {
        switch (status) {
            case "SHOP_INFO_COMPLETED":
            case "IMS_TYPE_COMPLETED":
            case "ACTIVE":
                return "Go to Dashboard"

            default:
                return "Claim Now"
        }
    }

    return { navigateBasedOnStatus, getButtonText }
}
