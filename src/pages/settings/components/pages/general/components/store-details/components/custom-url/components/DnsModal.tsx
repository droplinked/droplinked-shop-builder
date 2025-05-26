import { Flex } from '@chakra-ui/react'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import AppTypography from 'components/common/typography/AppTypography'
import AppButton from 'components/redesign/button/AppButton'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useAppToast from 'hooks/toast/useToast'
import { ShopDNSInformation } from 'services/shop/interfaces'
import { getShopDNSStatusService } from 'services/shop/shopServices'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
interface Props {
    isOpen: boolean
    onClose: () => void
    data: {
        dnsData: {
            NS_records: Array<string>
            domain_name: string
            existed_before: boolean
        }
        _id: string
    }
}
export default function DnsModal({ isOpen, onClose, data }: Props) {
    const { showToast } = useAppToast()
    const [visibleButton, setButtonVisibility] = useState(true)
    const { isLoading, mutate } = useMutation((params: ShopDNSInformation) => getShopDNSStatusService(params), {
        onSuccess: (response) => {
            const { message, status } = response.data.data;
            showToast({ message: message, type: status === "Finalized" ? "success" : "error" })
            if (status === "Finalized") setButtonVisibility(false)
        }
    })
    const { NS_records, domain_name } = data?.dnsData ?? {}

    return (
        <AppModal modalRootProps={{ isOpen, onClose, isCentered: true, size: "lg" }} modalContentProps={{ background: "#141414" }}>
            <ModalHeaderData
                modalHeaderProps={{
                    px: { lg: "48px !important", md: "32px !important", base: "16px !important" },
                    padding: "0px",
                    paddingBlock: "0px",
                    backgroundColor: '#141414',
                }}
                title='DNS Information'
                description=''
            >
                <Flex marginTop={"2rem"} flexDirection={"column"} gap={4}>
                    {
                        NS_records?.map((record, index) => {
                            return (
                                <Flex key={record} justifyContent={"space-between"} alignItems={"center"}>
                                    <AppTypography fontSize={"14px"} opacity={"0.5"} color={"#fff"}>DNS {index}</AppTypography>
                                    <Flex gap={4}>
                                        <AppTypography fontSize={"14px"} color={"#fff"}>{record}</AppTypography>
                                        <ClipboardText text={record} />
                                    </Flex>
                                </Flex>
                            )
                        })
                    }
                    {visibleButton &&
                        <AppButton
                            isLoading={isLoading}
                            marginTop={"1rem"}
                            onClick={() => mutate({ domain_name: domain_name })}
                        >
                            Check DNS Status
                        </AppButton>}
                </Flex>
            </ModalHeaderData>
        </AppModal>
    )
}
