import { Flex, Link, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import FormModel from 'components/common/form/FormModel'
import AppInput from 'components/common/form/textbox/AppInput'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { ShopOAuth2Client } from 'lib/apis/shop/interfaces'
import { generateShopAPIKey, getShopApiKey } from 'lib/apis/shop/shopServices'
import { domainRegex } from 'lib/utils/heper/regex'
import React, { useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

export default function ShopAPIKey() {
    const { showToast } = useAppToast()
    const [domain, setDomain] = useState("")
    const { isLoading: isFetching, data, refetch } = useQuery({
        queryFn: () => getShopApiKey(),
        onSuccess: (response) => {
            const result = response.data.data
            if (result) setDomain(result.domains[0])
        },
        refetchOnWindowFocus: false
    })
    const fetchedData = useMemo(() => data?.data.data, [data])
    const { isLoading: isMutating, mutateAsync } = useMutation((params: ShopOAuth2Client) => generateShopAPIKey(params))
    const handleApiKeyCreation = async () => {
        try {
            if (!domainRegex.test(domain)) throw Error("Please enter a valid domain.")
            await mutateAsync({ domains: [domain] })
            refetch()
        } catch (error) {
            showToast({ message: (error as Error).message, type: "error" })
        }
    }

    return (
        <VStack align={"stretch"} spacing={7}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <AppTypography fontSize='18px' fontWeight='bold'>API KEY</AppTypography>
                <Link
                    href={"https://apiv3dev.droplinked.com/v1/public-apis/document"}
                    target="_blank">
                    <AppTypography
                        fontSize={"14px"}
                        color={"#33A9EC"}
                        textDecoration={"underline"}
                        textDecorationColor={"#33A9EC"}>
                        API Documentation
                    </AppTypography>
                </Link>
            </Flex>
            <VStack align={"stretch"}>
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
                        isDisabled={!domain}
                        isLoading={isFetching || isMutating}
                        onClick={handleApiKeyCreation}>
                        {fetchedData ? "Edit" : "Generate API Key"}
                    </BasicButton>
                </Flex>
            </VStack>
            {
                fetchedData && <VStack align={"stretch"}>
                    <AppTypography fontSize='16px' color={"#C2C2C2"}>API KEY</AppTypography>
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <AppTypography fontSize='16px' color={"#C2C2C2"}>
                            {fetchedData.clientId}
                        </AppTypography>
                        <ClipboardText text={fetchedData.clientId} />
                    </Flex>
                </VStack>
            }
        </VStack >
    )
}