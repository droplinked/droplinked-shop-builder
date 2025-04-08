import { useDisclosure } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import Input from 'components/redesign/input/Input'
import useAppToast from 'hooks/toast/useToast'
import { getShopDNSInformationService } from 'lib/apis/shop/shopServices'
import useAppStore from 'lib/stores/app/appStore'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import ConfirmationModal from './components/ConfirmationModal'
import DnsModal from './components/DnsModal'

export default function CustomURL() {
    const { shop } = useAppStore()
    const { shopDomain } = shop
    const { showToast } = useAppToast()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { isOpen: isDnsModalOpen, onClose: onDnsModalClose, onOpen: onDnsModalOpen } = useDisclosure()
    const [url, setUrl] = useState("")

    const { isFetching, data, refetch } = useQuery({
        queryKey: "shopDNSInformation",
        queryFn: () => getShopDNSInformationService(),
        onError: () => {
            showToast({ message: "Unable to fetch DNS Information", type: "error" })
        }
    })

    return (
        <SectionContent
            title="Custom URL"
            description='Enter domain without “www.” and then add the provided DNS details in domain settings.'
            rightContent={
                <Input
                    inputProps={{ isDisabled: isFetching, placeholder: "Domain.com", value: shopDomain, onChange: (e) => setUrl(e.target.value) }}
                    inputContainerProps={{ padding: 2, paddingLeft: 4 }}
                    rightElement={
                        <Button borderRadius={4} isDisabled={shopDomain ? false : !url} isLoading={isFetching} onClick={shopDomain ? onDnsModalOpen : onOpen} fontSize={"12px"} height={"32px"} paddingInline={{ base: 3, lg: 3 }} padding={1}>
                            {shopDomain ? "DNS Info" : "Add"}
                        </Button>
                    }
                />
            }
        >
            <ConfirmationModal refetch={refetch} isOpen={isOpen} onClose={onClose} url={url} />
            <DnsModal data={data?.data?.data} isOpen={isDnsModalOpen} onClose={onDnsModalClose} />
        </SectionContent>
    )
}
