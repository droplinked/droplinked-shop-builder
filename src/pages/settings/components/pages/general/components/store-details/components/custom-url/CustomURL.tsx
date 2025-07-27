import { useDisclosure } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import AppInput from 'components/redesign/input/AppInput'
import useAppToast from 'hooks/toast/useToast'
import { getShopDNSInformationService } from 'services/shop/shopServices'
import useAppStore from 'stores/app/appStore'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import ConfirmationModal from './components/ConfirmationModal'
import DnsModal from './components/DnsModal'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function CustomURL() {
    const { shop } = useAppStore()
    const { shopDomain } = shop
    const { showToast } = useAppToast()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { isOpen: isDnsModalOpen, onClose: onDnsModalClose, onOpen: onDnsModalOpen } = useDisclosure()
    const [url, setUrl] = useState("")
    const { t } = useLocaleResources('settings');

    const { isFetching, data, refetch } = useQuery({
        queryKey: "shopDNSInformation",
        queryFn: () => getShopDNSInformationService(),
        onError: () => {
            showToast({ message: t("CustomURL.errors.fetchDNS"), type: "error" })
        }
    })

    return (
        <SectionContent
            title={t("CustomURL.title")}
            description={t("CustomURL.description")}
            rightContent={
                <AppInput
                    inputProps={{
                        isDisabled: isFetching,
                        placeholder: t("CustomURL.placeholder"),
                        value: Array.isArray(shopDomain) ? shopDomain[0] : shopDomain,
                        onChange: (e) => setUrl(e.target.value)
                    }}
                    inputContainerProps={{ padding: 2, paddingLeft: 4 }}
                    rightElement={
                        <AppButton isDisabled={shopDomain ? false : !url} isLoading={isFetching} onClick={shopDomain ? onDnsModalOpen : onOpen} fontSize={"12px"} height={"32px"} paddingInline={{ base: 3, lg: 3 }} padding={1}>
                            {shopDomain ? t("CustomURL.dnsInfo") : t("CustomURL.add")}
                        </AppButton>
                    }
                />
            }
        >
            <ConfirmationModal refetch={refetch} isOpen={isOpen} onClose={onClose} url={url} />
            <DnsModal data={data?.data?.data} isOpen={isDnsModalOpen} onClose={onDnsModalClose} />
        </SectionContent>
    )
}
