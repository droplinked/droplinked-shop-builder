import { useQuery } from 'react-query'
import { checkUsernameAvailabilityService } from 'services/shop/shopServices'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface UseUsernameAvailabilityProps {
    username: string
    onSuccess?: (isAvailable: boolean) => void
    onError?: () => void
}

export const useUsernameAvailability = ({ username, onSuccess, onError }: UseUsernameAvailabilityProps) => {
    const { showToast } = useAppToast()
    const { t } = useLocaleResources('common')

    return useQuery(
        ['check-username', username],
        () => checkUsernameAvailabilityService(username),
        {
            enabled: !!username,
            retry: false,
            select: (response) => response.data.data,
            onSuccess: (data) => {
                onSuccess?.(data)
            },
            onError: (error: any) => {
                showToast({
                    type: 'error',
                    message: error?.response?.data?.data?.message || t('onboarding.hooks.errors.errorCheckingUsername')
                })
                onError?.()
            }
        }
    )
}
