import useAppToast from 'hooks/toast/useToast'
import { useLogin } from 'pages/onboarding/hooks/useLogin'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useAppStore from 'stores/app/appStore'

const useHomePageLogic = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { authenticateUser, finalizeLogin, loading } = useLogin()
    const { showToast } = useAppToast()
    const { isLoggedIn } = useAppStore()

    useEffect(() => {
        // Redirect to dashboard if user is logged in
        if (isLoggedIn) return navigate("/analytics/dashboard")

        // Handle legacy referral links
        const referral = searchParams.get("referral")
        if (referral) return navigate(`/onboarding?entry=signup&referral=${referral}`)

        // Handle Google Auth
        const handleGoogleAuth = async () => {
            const access_token = searchParams.get("access_token")
            const refresh_token = searchParams.get("refresh_token")

            if (!access_token || !refresh_token || loading) return

            try {
                const result = await authenticateUser({
                    type: "get",
                    access_token,
                    refresh_token,
                    params: { access_token }
                })

                finalizeLogin(result)

                const isCompleted = ["SHOP_INFO_COMPLETED", "ACTIVE"].includes(result.user.status)
                const redirectPath = isCompleted ? "/analytics/dashboard" : "/onboarding"
                navigate(redirectPath)

            } catch (error) {
                navigate('/', { replace: true })
                showToast({ type: "error", message: error?.message || "Login failed. Please try again." })
            }
        }

        handleGoogleAuth()
    }, [searchParams, loading, authenticateUser, finalizeLogin, showToast, navigate, isLoggedIn])

    return {
        loading,
        isLoggedIn
    }
}

export default useHomePageLogic