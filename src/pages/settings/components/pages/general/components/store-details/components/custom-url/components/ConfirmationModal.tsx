import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useAppToast from 'hooks/toast/useToast'
import { generateShopCustomURLService } from 'lib/apis/shop/shopServices'
import useAppStore from 'lib/stores/app/appStore'
import React, { useState } from 'react'
import { useMutation } from 'react-query'

interface Props {
    isOpen: boolean
    onClose: () => void
    url: string
    refetch: Function;
}

export default function ConfirmationModal({ isOpen, onClose, url, refetch }: Props) {
    const [isLoading, setLoading] = useState(false);
    const { mutateAsync } = useMutation((params: { domain: string }) => generateShopCustomURLService(params))
    const { showToast } = useAppToast()
    const { fetchShop, shop } = useAppStore()

    const generateShopCustomURL = async () => {
        setLoading(true)
        try {
            await mutateAsync({ domain: url })
            await fetchShop({ shopName: shop.name })
            await refetch()
            showToast({ message: "The entered URL has been set as your shop’s custom URL", type: "success" })
            onClose()
        } catch (error) {
            showToast({ message: (error as Error).message, type: "error" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <AppModal modalRootProps={{ isOpen, onClose, isCentered: true, size: "2xl" }} modalContentProps={{ background: "#141414" }}>
            <ModalHeaderData
                modalHeaderProps={{
                    px: { lg: "48px !important", md: "32px !important", base: "16px !important" },
                    padding: "0px",
                    paddingBlock: "0px",
                    backgroundColor: '#141414'
                }}
                title='Add custom URL'
                description={`You are about to set "${url}" for your shop’s custom URL. \n Be aware that you will have to contact support to make changes. \n Do you want to proceed?`}
            >
                <Flex gap={6} justifyContent={"space-between"} mt={"38px"}>
                    <Button width={"45%"} disabled={isLoading} variant='secondary' onClick={onClose}>No</Button>
                    <Button width={"45%"} onClick={generateShopCustomURL} disabled={isLoading} isLoading={isLoading}>Yes, The entered URL is correct</Button>
                </Flex>
            </ModalHeaderData>
        </AppModal>
    )
}
