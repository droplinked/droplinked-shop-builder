import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import Button from 'components/redesign/button/Button'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useAppToast from 'functions/hooks/toast/useToast'
import { ShopDNSInformation } from 'lib/apis/shop/interfaces'
import { getShopDNSStatusService } from 'lib/apis/shop/shopServices'
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

    const handleCopyLink = (dns: string, index: number) => {
        navigator.clipboard.writeText(dns)
        showToast({ type: "success", message: `DNS ${index} copied successfully` })
    }

    return (
        <AppModal modalRootProps={{ isOpen, onClose, isCentered: true, size: "lg" }} modalContentProps={{ background: "#141414" }}>
            <ModalHeaderData
                backgroundColor='#141414'
                modalHeaderProps={{ px: { lg: "48px !important", md: "32px !important", base: "16px !important" }, padding: "0px", paddingBlock: "0px" }}
                title='DNS Information'
                description=''
            >
                <Flex marginTop={"2rem"} flexDirection={"column"} gap={4}>
                    {
                        data?.dnsData?.NS_records.map((record, index) => {
                            return (
                                <Flex justifyContent={"space-between"} alignItems={"center"}>
                                    <AppTypography fontSize={"14px"} opacity={"0.5"} color={"#fff"}>DNS {index}</AppTypography>
                                    <Flex gap={4}>
                                        <AppTypography fontSize={"14px"} color={"#fff"}>{record}</AppTypography>
                                        <AppIcons.Copy style={{ cursor: "pointer" }} onClick={() => handleCopyLink(record, index)} />
                                    </Flex>
                                </Flex>
                            )
                        })
                    }
                    {visibleButton && <Button isLoading={isLoading} marginTop={"1rem"} onClick={() => mutate({ domain_name: data.dnsData.domain_name })}>
                        Check DNS Status
                    </Button>}
                </Flex>
            </ModalHeaderData>
        </AppModal>
    )
}
