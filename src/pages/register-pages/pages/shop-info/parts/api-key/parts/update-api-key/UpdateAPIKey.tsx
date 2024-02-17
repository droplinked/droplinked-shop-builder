import { Flex } from '@chakra-ui/layout'
import BasicButton from 'components/common/BasicButton/BasicButton'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import FormModel from 'components/common/form/FormModel'
import AppInput from 'components/common/form/textbox/AppInput'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { domainRegex } from 'lib/utils/heper/regex'
import React, { useContext, useState } from 'react'
import APIKeyContext from '../../context'

function UpdateAPIKey() {
    const { getShopAPIKey, updateShopAPIKey, fetchedData } = useContext(APIKeyContext)
    const isLoading = getShopAPIKey.isLoading || updateShopAPIKey.isLoading
    const [domain, setDomain] = useState("")
    const { showToast } = useAppToast()
    const handleApiKeyCreation = async () => {
        try {
            if (!domainRegex.test(domain)) throw Error("Please enter a valid domain.")
            await updateShopAPIKey.mutateAsync({ domains: [...(fetchedData?.domains || []), domain] })
            setDomain("")
            getShopAPIKey.refetch()
        } catch (error) {
            showToast({ message: (error as Error).message, type: "error" })
        }
    }

    return (
        <Flex direction={"column"} gap={"12px"}>
            <FieldLabel label='Domain' isRequired />
            <AppTypography
                fontSize='14px'
                color={"rgb(128, 128, 128)"}>
                Enter your domain URL to generate your unique API key for secure access to our services.
            </AppTypography>
            <Flex
                alignItems={"center"}
                backgroundColor={FormModel.baseStyleProps().backgroundColor}
                paddingRight={"7.5px"}>
                <AppInput
                    name='domain'
                    value={domain}
                    placeholder='Domain.com'
                    isRequired
                    onChange={(e) => setDomain(e.currentTarget.value)}
                />
                <BasicButton
                    sizes='medium'
                    isDisabled={!domain || isLoading}
                    isLoading={isLoading}
                    onClick={handleApiKeyCreation}>
                    {fetchedData ? "Add domain" : "Generate API Key"}
                </BasicButton>
            </Flex>
        </Flex>
    )
}

export default UpdateAPIKey