import { AUTH_ROUTES } from 'constants/authRoutes'
import { useNavigate } from 'react-router-dom'
import useAppStore from 'stores/app/appStore'

interface QueryParams {
    [key: string]: string
}

function appendQueryParams(url: string, params?: QueryParams): string {
    if (!params || Object.keys(params).length === 0) return url
    const [base, existing] = url.split('?')
    const searchParams = new URLSearchParams(existing || '')
    Object.entries(params).forEach(([key, value]) => searchParams.set(key, value))
    return `${base}?${searchParams.toString()}`
}

export function useAuthNavigation() {
    const navigate = useNavigate()
    const { user } = useAppStore()

    const status = user?.status

    const navigateBasedOnStatus = (queryParams?: QueryParams) => {
        switch (status) {
            case "NEW":
                return navigate(appendQueryParams(AUTH_ROUTES.SIGNUP_EMAIL_VERIFICATION, queryParams))
            case "VERIFIED":
            case "PROFILE_COMPLETED":
                return navigate(appendQueryParams(AUTH_ROUTES.EXISTING_WEBSITE, queryParams))
            case "SHOP_INFO_COMPLETED":
            case "ACTIVE":
                return navigate("/analytics/dashboard")
            default:
                return navigate(appendQueryParams(AUTH_ROUTES.SIGN_UP, queryParams))
        }
    }

    return { navigateBasedOnStatus }
}
