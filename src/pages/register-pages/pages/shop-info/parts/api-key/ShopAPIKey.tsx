import { Flex, Link, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
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
import ConfirmDomainDeletion from './parts/ConfirmDomainDeletion'
import ShopAPIKeySkeleton from './parts/ShopAPIKeySkeleton'

export default function ShopAPIKey() {
    const { isLoading: isFetching, data, refetch } = useQuery("shopAPIKey", getShopApiKey, { refetchOnWindowFocus: false })
    const { isLoading: isMutating, mutateAsync } = useMutation((params: ShopOAuth2Client) => generateShopAPIKey(params))
    const { showToast } = useAppToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [domain, setDomain] = useState("")
    const [selectedDomain, setSelectedDomain] = useState("")
    const fetchedData = useMemo(() => data?.data.data, [data])
    const handleApiKeyCreation = async () => {
        try {
            if (!domainRegex.test(domain)) throw Error("Please enter a valid domain.")
            await mutateAsync({ domains: [...fetchedData?.domains, domain] })
            setDomain("")
            refetch()
        } catch (error) {
            showToast({ message: (error as Error).message, type: "error" })
        }
    }
    const removeDomain = async () => {
        try {
            if (fetchedData?.domains.length === 1) return
            const newDomains = fetchedData?.domains.filter(d => d !== selectedDomain)
            await mutateAsync({ domains: [...newDomains] })
            refetch()
            onClose()
        } catch (error) {
            showToast({ message: (error as Error).message, type: "error" })
        }
    }
    const openConfirmationDialog = (domain: string) => {
        if (fetchedData?.domains.length === 1) return
        setSelectedDomain(domain)
        onOpen()
    }

    return (
        <>
            <Flex direction={"column"} gap={"36px"}>
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
                            isDisabled={!domain}
                            isLoading={isMutating}
                            onClick={handleApiKeyCreation}>
                            {fetchedData ? "Add domain" : "Generate API Key"}
                        </BasicButton>
                    </Flex>
                </Flex>

                {isFetching ?
                    <ShopAPIKeySkeleton /> :
                    fetchedData && <>
                        <Flex direction={"column"} gap={"12px"}>
                            <AppTypography fontSize='16px' fontWeight={500} color={"#C2C2C2"}>Your domains</AppTypography>
                            {fetchedData.domains.map((domain, index) =>
                                <Flex key={index} justifyContent={"space-between"} alignItems={"center"}>
                                    <AppTypography fontSize='16px' color={"#C2C2C2"}>{domain}</AppTypography>
                                    <AppIcons.RedTrash
                                        cursor={fetchedData?.domains.length === 1 ? "not-allowed" : "pointer"}
                                        onClick={() => openConfirmationDialog(domain)} />
                                </Flex>
                            )}
                        </Flex>

                        <Flex direction={"column"} gap={"12px"}>
                            <AppTypography fontSize='16px' fontWeight={500} color={"#C2C2C2"}>API KEY</AppTypography>
                            <Flex justifyContent={"space-between"} alignItems={"center"}>
                                <AppTypography fontSize='16px' color={"#C2C2C2"}>
                                    {fetchedData.clientId}
                                </AppTypography>
                                <ClipboardText text={fetchedData.clientId} />
                            </Flex>
                        </Flex>
                    </>
                }
            </Flex >
            {isOpen && <ConfirmDomainDeletion isOpen={isOpen} close={onClose} isLoading={isMutating} removeDomain={removeDomain} />}
        </>
    )
}