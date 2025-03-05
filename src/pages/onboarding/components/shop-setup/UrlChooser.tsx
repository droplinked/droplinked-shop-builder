import { Box, Spinner, Text } from '@chakra-ui/react'
import { AvailableoutlinedMd } from 'assets/icons/Sign/AvailableOutlined/AvailableoutlinedMd'
import { NotavailableoutlinedMd } from 'assets/icons/Sign/NotAvailableOutlined/NotavailableoutlinedMd'
import Input from 'components/redesign/input/Input'
import { useFormikContext } from 'formik'
import useDebounce from 'hooks/debounce/useDebounce'
import { useUsernameAvailability } from 'pages/onboarding/hooks/useUsernameAvailability'
import useStoreCreation from 'pages/onboarding/store/useStoreCreation'
import React, { useState } from 'react'
import { appDevelopment } from 'utils/app/variable'
import { SetupFormValues } from './formConfig'

export default function UrlChooser() {
    const { values, setFieldValue, errors } = useFormikContext<SetupFormValues>()
    const { updateStoreField } = useStoreCreation()
    const [urlTempValue, setUrlTempValue] = useState(values.url ?? '')
    const debouncedUrl = useDebounce(urlTempValue, 1500)

    const { data: isAvailable, isFetching } = useUsernameAvailability({
        username: debouncedUrl,
        onSuccess: (isAvailable) => {
            setFieldValue('url', isAvailable ? debouncedUrl : "");
            updateStoreField('url', isAvailable ? debouncedUrl : "");
        },
        onError: () => {
            setFieldValue('url', '');
            updateStoreField('url', '');
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (!value) {
            setFieldValue('url', '');
            updateStoreField('url', '');
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
            {...errors.url && { message: errors.url, state: "error" }}
        />
    )
}
