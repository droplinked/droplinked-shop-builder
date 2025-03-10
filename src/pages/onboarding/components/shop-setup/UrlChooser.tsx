import { Box, Spinner, Text } from '@chakra-ui/react'
import { AvailableoutlinedMd } from 'assets/icons/Sign/AvailableOutlined/AvailableoutlinedMd'
import { NotavailableoutlinedMd } from 'assets/icons/Sign/NotAvailableOutlined/NotavailableoutlinedMd'
import Input from 'components/redesign/input/Input'
import useDebounce from 'hooks/debounce/useDebounce'
import { useUsernameAvailability } from 'pages/onboarding/hooks/useUsernameAvailability'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React, { useEffect, useState } from 'react'
import { appDevelopment } from 'utils/app/variable'

export default function UrlChooser() {
    const { updateOnboardingState, storeSetup, storeSetupError, setError } = useOnboardingStore()
    const [urlTempValue, setUrlTempValue] = useState(storeSetup.url ?? '')
    const debouncedUrl = useDebounce(urlTempValue, 1500)

    const { data: isAvailable, isFetching } = useUsernameAvailability({
        username: debouncedUrl,
        onSuccess: (isAvailable) => {
            if (isAvailable) {
                updateOnboardingState('storeSetup', { ...storeSetup, url: debouncedUrl })
                setError('url', undefined)
            } else {
                updateOnboardingState('storeSetup', { ...storeSetup, url: '' })
                setError('url', 'This URL is not available')
            }
        },
        onError: () => {
            updateOnboardingState('storeSetup', { ...storeSetup, url: '' })
            setError('url', 'Error checking URL availability')
        }
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (!value) {
            updateOnboardingState('storeSetup', { ...storeSetup, url: '' })
            setError('url', 'URL is required')
        }
        if (/^[a-zA-Z0-9-]*$/.test(value)) {
            setUrlTempValue(value.toLowerCase())
        }
    }

    const renderAvailabilityIcon = () => {
        if (isFetching) return <Spinner size="sm" color='#fff' />
        if (!debouncedUrl) return null
        return isAvailable ? <AvailableoutlinedMd color='#2bcfa1' /> : <NotavailableoutlinedMd color='#FF2244' />
    }

    useEffect(() => {
        setUrlTempValue(storeSetup.url ?? '')
    }, [storeSetup.url])

    return (
        <Input
            label='URL'
            inputProps={{
                paddingInline: 4,
                paddingBlock: 3,
                fontSize: { base: 14, md: 16 },
                value: urlTempValue,
                placeholder: "Type your URL",
                onChange: handleInputChange,
                isRequired: true
            }}
            inputContainerProps={{
                padding: 0,
                gap: 0,
            }}
            leftElement={
                <Box paddingInline={4} paddingBlock={3} borderRadius={8} background="#1C1C1C">
                    <Text fontSize={{ base: 14, md: 16 }} fontWeight={400} color="#7b7b7b">
                        {`${appDevelopment ? "dev." : ""}droplinked.io/`}
                    </Text>
                </Box>
            }
            rightElement={
                <Box paddingInline="8px 16px">
                    {renderAvailabilityIcon()}
                </Box>
            }
            {...storeSetupError.url && { message: storeSetupError.url, state: "error" }}
        />
    )
}
