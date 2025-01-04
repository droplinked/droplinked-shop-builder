import { Flex, useBoolean } from '@chakra-ui/react'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import SwitchBox from '../common/SwitchBox'
import PositionOptions from '../fields/POD/PODMint2Merch/PositionOptions'
import WalletOptions from '../fields/POD/PODMint2Merch/WalletOptions'

function PODMint2MerchAccordion() {
    const { values: { m2m_positions_options } } = useProductForm()
    const [flag, setFlag] = useBoolean(false)

    const handleToggle = () => {
        if (m2m_positions_options.length > 0) {
            setFlag.toggle()
        }
    }

    return (
        <ProductFormAccordion label='Mint to Merch'>
            <SwitchBox
                title='Mint to Merch'
                description='Enable customers to directly print their NFT artwork on the POD product.'
                isChecked={flag}
                onToggle={handleToggle}
            >
                {flag && (
                    <Flex direction="column" gap={9} mt={5}>
                        <PositionOptions />
                        <WalletOptions />
                    </Flex>
                )}
            </SwitchBox>
        </ProductFormAccordion>
    )
}

export default PODMint2MerchAccordion