import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useAppToast from 'hooks/toast/useToast'
import { generateShopCustomURLService } from 'services/shop/shopServices'
import useAppStore from 'stores/app/appStore'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

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
    const { t } = useLocaleResources('settings');

    const generateShopCustomURL = async () => {
        setLoading(true)
        try {
            await mutateAsync({ domain: url })
            await fetchShop({ shopName: shop.name })
            await refetch()
            showToast({ message: t("settings.storeDetails.customURL.success.urlSet"), type: "success" })
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
                title={t("settings.storeDetails.customURL.confirmModal.title")}
                description={t("settings.storeDetails.customURL.confirmModal.description", { url })}
            >
                <Flex gap={6} justifyContent={"space-between"} mt={"38px"}>
                    <AppButton variant='secondary' width={"45%"} disabled={isLoading} onClick={onClose}>
                        {t("settings.storeDetails.customURL.confirmModal.no")}
                    </AppButton>
                    <AppButton width={"45%"} onClick={generateShopCustomURL} disabled={isLoading} isLoading={isLoading}>
                        {t("settings.storeDetails.customURL.confirmModal.yes")}
                    </AppButton>
                </Flex>
            </ModalHeaderData>
        </AppModal>
    )
}
