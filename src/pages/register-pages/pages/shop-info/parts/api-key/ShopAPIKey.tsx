import { Flex, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import FormModel from 'components/common/form/FormModel'
import AppInput from 'components/common/form/textbox/AppInput'
import AppTypography from 'components/common/typography/AppTypography'
import { generateShopAPIKey, getShopApiKey } from 'lib/apis/shop/shopServices'
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export default function ShopAPIKey() {
    const [domain, setDomain] = useState("")
    const [initialData, setInitialData] = useState(null)
    const { isLoading: isFetching } = useQuery({
        queryKey: ["apiKey"],
        queryFn: () => getShopApiKey(),
        onSuccess: (response) => {
            const result = response.data.data
            setInitialData(result)
            setDomain(result.domains[0])
        }
    })
    const { isLoading: isMutating, mutate } = useMutation({
        mutationFn: () => generateShopAPIKey({ domains: [domain] }),
        onSuccess: (response) => {
            const result = response.data.data
            setInitialData(result)
        }
    })

    return (
        <VStack align={"stretch"} spacing={7}>
            <VStack align={"stretch"}>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <AppTypography
                        fontSize='18px'
                        fontWeight='bold'>
                        API KEY
                    </AppTypography>
                    <Link to={"https://apiv3dev.droplinked.com/v1/public-apis/document"}>
                        <AppTypography
                            fontSize={"14px"}
                            color={"#33A9EC"}
                            textDecoration={"underline"}
                            textDecorationColor={"#33A9EC"}>
                            API Documentation
                        </AppTypography>
                    </Link>
                </Flex>
            </VStack>
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
                        onClick={() => mutate()}>
                        {initialData ? "Edit" : "Generate API Key"}
                    </BasicButton>
                </Flex>
            </VStack>
            {
                initialData && <VStack align={"stretch"}>
                    <AppTypography fontSize='16px' color={"#C2C2C2"}>API KEY</AppTypography>
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <AppTypography fontSize='16px' color={"#C2C2C2"}>
                            {initialData.clientId}
                        </AppTypography>
                        <ClipboardText text={initialData.clientId} />
                    </Flex>
                </VStack>
            }
        </VStack >
    )
}