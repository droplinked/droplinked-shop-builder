import { Flex, Skeleton } from '@chakra-ui/react'
import MessageBox from 'components/redesign/message-box/MessageBox'
import Select from 'components/redesign/select/Select'
import { supportedChainsService } from 'lib/apis/sku/services'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import ProductFieldWrapper from '../common/ProductFieldWrapper'
import SwitchBox from '../common/SwitchBox'

function ProductDrop() {
    const { values: { digitalDetail }, setFieldValue } = useProductForm()
    console.log({ digitalDetail })
    const [isDropEnabled, setIsDropEnabled] = useState<boolean>(false)
    const { data, isFetching } = useQuery({
        queryFn: supportedChainsService,
        enabled: isDropEnabled
    })

    const blockchainNetworks = data?.data?.data || []

    const handleDropToggle = (checked: boolean): void => {
        setIsDropEnabled(checked)
        if (!checked) setFieldValue('digitalDetail', { ...digitalDetail, chain: '' })
    }

    const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const updatedDigitalDetail = { ...digitalDetail, chain: event.target.value }
        setFieldValue('digitalDetail', updatedDigitalDetail)
    }

    return (
        <SwitchBox
            title="Drop"
            description="Enable onchain records for this digital product."
            isChecked={isDropEnabled}
            onToggle={(e: React.ChangeEvent<HTMLInputElement>) => handleDropToggle(e.target.checked)}
        >
            {isDropEnabled && (
                <Flex direction="column" gap={6} mt={2}>
                    <ProductFieldWrapper
                        label="Blockchain Network"
                        description="Choose the blockchain network where product details will be recorded as an NFT."
                        rightContent={
                            <Skeleton isLoaded={!isFetching}>
                                <Select
                                    selectProps={{
                                        width: '174px',
                                        placeholder: 'Select network',
                                        value: digitalDetail?.chain,
                                        onChange: handleNetworkChange
                                    }}
                                    items={blockchainNetworks}
                                />
                            </Skeleton>
                        }
                    />
                    <MessageBox
                        title="Product Lock Notice"
                        description="Once this product is dropped, all details will be permanently locked and cannot be changed."
                        theme="warning"
                    />
                </Flex>
            )}
        </SwitchBox>
    )
}

export default ProductDrop