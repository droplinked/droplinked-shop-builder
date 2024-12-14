import { Flex, Skeleton } from '@chakra-ui/react'
import MessageBox from 'components/redesign/message-box/MessageBox'
import Select from 'components/redesign/select/Select'
import { supportedChainsService } from 'lib/apis/sku/services'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import ProductFieldWrapper from '../common/ProductFieldWrapper'
import SwitchBox from '../common/SwitchBox'

function ProductDrop() {
    const [showMore, setShowMore] = useState(false)
    const { data, isFetching } = useQuery({
        queryFn: supportedChainsService,
        enabled: showMore
    })
    const chains = data?.data?.data || []

    return (
        <SwitchBox
            title='Drop'
            description='Enable onchain records for this digital product.'
            isChecked={showMore}
            onToggle={(e) => setShowMore(e.target.checked)}
        >
            {showMore && (
                <Flex direction="column" gap={6} mt={2}>
                    <ProductFieldWrapper
                        label='Blockchain Network'
                        description='Choose the blockchain network where product details will be recorded as an NFT.'
                        rightContent={
                            <Skeleton isLoaded={!isFetching}>
                                <Select
                                    selectProps={{ placeholder: "Select network", width: "174px" }}
                                    items={chains}
                                />
                            </Skeleton>
                        }
                    />
                    <MessageBox
                        title='Product Lock Notice'
                        description='Once this product is dropped, all details will be permanently locked and cannot be changed.'
                        theme='warning'
                    />
                </Flex>
            )}

        </SwitchBox>
    )
}

export default ProductDrop