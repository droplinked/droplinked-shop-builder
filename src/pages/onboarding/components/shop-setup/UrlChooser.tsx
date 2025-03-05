import { Box, Spinner, Text } from '@chakra-ui/react'
import { AvailableoutlinedMd } from 'assets/icons/Sign/AvailableOutlined/AvailableoutlinedMd'
import { NotavailableoutlinedMd } from 'assets/icons/Sign/NotAvailableOutlined/NotavailableoutlinedMd'
import Input from 'components/redesign/input/Input'
import { useFormikContext } from 'formik'
import useDebounce from 'hooks/debounce/useDebounce'
import useAppToast from 'hooks/toast/useToast'
import { checkUsernameAvailabilityService } from 'lib/apis/shop/shopServices'
import useStoreCreation from 'pages/onboarding/store/useStoreCreation'
import React from 'react'
import { useQuery } from 'react-query'
import { appDevelopment } from 'utils/app/variable'
import { SetupFormValues } from './formConfig'

export default function UrlChooser() {
    const { values, setFieldValue, errors } = useFormikContext<SetupFormValues>()
    const debouncedUrl = useDebounce(values.url, 1500)
    const { updateStoreField } = useStoreCreation()
    const { showToast } = useAppToast()

    const { data: isAvailable, isLoading, isFetching } = useQuery(
        ['check-username', debouncedUrl],
        () => checkUsernameAvailabilityService(values.url),
        {
            enabled: !!debouncedUrl,
            retry: false,
            select: (response) => response.data.data,
            onError: (error: any) => {
                showToast({
                    type: 'error',
                    message: error?.response?.data?.data?.message || 'Error checking username'
                })
            }
        }
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (!/\s/.test(value)) {
            setFieldValue('url', value)
            updateStoreField('url', value)
        }
    }

    const renderAvailabilityIcon = () => {
        if (isLoading || isFetching) return <Spinner size="sm" color='#fff' />
        if (!debouncedUrl) return null
        return isAvailable ? <AvailableoutlinedMd color='#2bcfa1' /> : <NotavailableoutlinedMd color='#FF2244' />
    }

    return (
        <Input
            label='URL'
            inputProps={{
                paddingInline: 4,
                paddingBlock: 3,
                fontSize: { base: 14, md: 16 },
                value: values.url,
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
            {...errors.url && { message: errors.url, state: "error" }}
        />
    )
}
