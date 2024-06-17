import { Flex, useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import FormModel from 'components/common/form/FormModel'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppInput from 'components/common/form/textbox/AppInput'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import { getShopDNSInformationService } from 'lib/apis/shop/shopServices'
import { useCheckPermission } from 'lib/stores/app/appStore'
import { appDevelopment } from 'lib/utils/app/variable'
import { storeCustomURLRegex } from 'lib/utils/heper/regex'
import React, { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { IShopInfoChildProps } from '../../ShopInfo'
import ConfirmationModal from './parts/confirmation-modal/ConfirmationModal'
import DNSInformationModal from './parts/dns-information-modal/DNSInformationModal'

function StoreInformation({ States, updateStates }: IShopInfoChildProps) {
    const checkPermissionAndShowToast = useCheckPermission()
    const { showToast } = useAppToast()
    const shopDNSInformationQuery = useQuery({
        queryKey: "shopDNSInformation",
        queryFn: () => getShopDNSInformationService(),
        onError: () => {
            showToast({ message: "Unable to fetch DNS Information", type: "error" })
        }
    })
    const dnsData = useMemo(() => shopDNSInformationQuery.data?.data?.data?.dnsData, [shopDNSInformationQuery.data])
    const [customURL, setCustomURL] = useState("")
    const confirmationModal = useDisclosure()
    const dnsInformationModal = useDisclosure()
    const { shop } = useProfile()
    const userStore = `https://${appDevelopment ? "dev." : ""}droplinked.io/` + shop.name

    const validateEnteredURL = () => {
        if (!checkPermissionAndShowToast("custom_domain_integration")) return setCustomURL("")

        if (!storeCustomURLRegex.test(customURL))
            return showToast({ message: "Please enter a valid URL.", type: "error" })

        confirmationModal.onOpen()
    }

    return (
        <>
            <Flex direction={"column"} gap={"36px"}>
                <AppTypography fontSize='18px' fontWeight='bold'>Store Information</AppTypography>

                <Flex direction={"column"} gap={"12px"}>
                    <FieldLabel label='Store Name' isRequired />
                    <Flex direction={"column"} gap={"4px"}>
                        <Flex
                            alignItems={"center"}
                            backgroundColor={FormModel.baseStyleProps().backgroundColor}
                            paddingRight={"7.5px"}>
                            <AppInput name='name' maxLength={20} value={States.description} onChange={(e: any) => updateStates("description", e.target.value)} placeholder='e.g., droplinked' isRequired />
                        </Flex>
                        <AppTypography fontSize="14px" fontWeight={500} color="#808080">Enter your store name. (max 20 characters)</AppTypography>
                    </Flex>
                </Flex>

                <Flex direction={"column"} gap={"12px"}>
                    <FieldLabel label='Store URL' isRequired />
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <AppTypography fontSize='16px' color={"#C2C2C2"}>{userStore}</AppTypography>
                        <ClipboardText text={userStore} />
                    </Flex>
                </Flex>

                <Flex direction={"column"} gap={"12px"}>
                    <AppTypography fontSize='16px' fontWeight={500} color={"#C2C2C2"}>Custom URL</AppTypography>
                    <Flex direction={"column"} gap={"4px"}>
                        <AppTypography fontSize="14px" fontWeight={500} color="#808080">
                            Enter your domain without “www.” and then add the provided DNS to your domain settings.
                        </AppTypography>
                        {shopDNSInformationQuery.isLoading ?
                            <AppSkeleton isLoaded={false} width={"100%"} height="45.6px">{''}</AppSkeleton> :
                            <Flex
                                alignItems={"center"}
                                backgroundColor={FormModel.baseStyleProps().backgroundColor}
                                paddingRight={"7.5px"}>
                                <AppInput
                                    name='customURL'
                                    value={dnsData?.domain_name || customURL}
                                    isReadOnly={dnsData?.domain_name}
                                    placeholder='Domain.com'
                                    isRequired
                                    onChange={(e) => { setCustomURL(e.currentTarget.value) }}
                                />
                                {
                                    dnsData?.domain_name ?
                                        <BasicButton sizes='medium' onClick={dnsInformationModal.onOpen}>DNS Information</BasicButton> :
                                        <BasicButton sizes='medium' isDisabled={!customURL} onClick={validateEnteredURL}>Save</BasicButton>
                                }
                            </Flex>
                        }
                    </Flex>
                </Flex>
            </Flex >
            {confirmationModal.isOpen &&
                <ConfirmationModal
                    isOpen={confirmationModal.isOpen}
                    close={confirmationModal.onClose}
                    enteredURL={customURL}
                    refetch={shopDNSInformationQuery.refetch}
                    openDNSInformationModal={dnsInformationModal.onOpen}
                />
            }
            {dnsInformationModal.isOpen &&
                <DNSInformationModal
                    isOpen={dnsInformationModal.isOpen}
                    close={dnsInformationModal.onClose}
                    dnsData={dnsData}
                />
            }
        </>
    )
}

export default StoreInformation