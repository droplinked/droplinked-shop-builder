import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useAppToast from 'functions/hooks/toast/useToast'
import { ShopOAuth2Client } from 'lib/apis/shop/interfaces'
import { updateShopAPIKeyService } from 'lib/apis/shop/shopServices'
import { useCheckPermission } from 'lib/stores/app/appStore'
import React from 'react'
import { useMutation } from 'react-query'

interface Props {
    isOpen: boolean;
    onClose: () => void;
    refetch: () => void;
    selectedDomain: string;
    domains: string[];
}

export default function ConfirmationModal({ isOpen, onClose, refetch, selectedDomain, domains }: Props) {
    const { showToast } = useAppToast()
    const checkPermissionAndShowToast = useCheckPermission()
    const { mutateAsync, isLoading } = useMutation((params: ShopOAuth2Client) => updateShopAPIKeyService(params))

    const handleDeleteDomain = async () => {
        try {
            if (!checkPermissionAndShowToast("shopfront_apis")) return
            if (domains.length === 1) return

            const updatedDomains = domains.filter(domain => domain !== selectedDomain)
            await mutateAsync({ domains: updatedDomains })
            await refetch()
            showToast({ message: "Domain deleted successfully", type: "success" })
            onClose()
        } catch (error) {
            showToast({ message: (error as Error).message, type: "error" })
        }
    }

    return (
        <AppModal modalRootProps={{ isOpen, onClose, isCentered: true, size: "lg" }} modalContentProps={{ background: "#141414" }}>
            <ModalHeaderData
                backgroundColor='#141414'
                modalHeaderProps={{ px: { lg: "48px !important", md: "32px !important", base: "16px !important" }, padding: "0px", paddingBlock: "0px" }}
                title='Delete Domain'
                description="Are you sure you want to delete this Domain?"
            >
                <Flex gap={6} justifyContent={"space-between"} mt={"38px"}>
                    <Button width={"45%"} disabled={isLoading} variant='secondary' onClick={onClose}>Cancel</Button>
                    <Button width={"45%"} onClick={handleDeleteDomain} disabled={isLoading} isLoading={isLoading}>Delete</Button>
                </Flex>
            </ModalHeaderData>
        </AppModal>
    )
}
