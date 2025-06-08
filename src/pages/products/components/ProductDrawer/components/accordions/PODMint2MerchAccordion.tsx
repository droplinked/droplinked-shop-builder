import { Flex } from '@chakra-ui/react'
import useAppToast from 'hooks/toast/useToast'
import { useHasPermission } from 'stores/app/appStore'
import AppErrors from 'utils/constants/errors'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useState } from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import SwitchBox from '../common/SwitchBox'
import PositionOptions from '../fields/POD/PODMint2Merch/PositionOptions'
import WalletOptions from '../fields/POD/PODMint2Merch/WalletOptions'

function PODMint2MerchAccordion() {
    const { values: { m2m_positions_options, m2m_positions, m2m_services }, setFieldValue } = useProductForm()

    const [isM2MEnabled, setIsM2MEnabled] = useState(
        !!(m2m_positions.length || m2m_services.length)
    )

    const hasPermission = useHasPermission()
    const { showToast } = useAppToast()

    function handleMintToMerchToggle(checked: boolean) {
        if (!hasPermission("mint_to_merch") && checked) {
            showToast({ message: AppErrors.permission.permissionDenied, type: "error" })
            return
        }

        setIsM2MEnabled(checked)

        if (!checked) {
            setFieldValue("m2m_positions", [])
            setFieldValue("m2m_services", [])
        }
    }

    return (
        <ProductFormAccordion
            label="Mint to Merch"
            accessLevel='Premium'
        >
            <SwitchBox
                title="Mint to Merch"
                description="Enable customers to directly print their NFT artwork on the POD product."
                switchProps={{
                    isDisabled: !m2m_positions_options.length,
                    isChecked: isM2MEnabled,
                    onChange: (e) => handleMintToMerchToggle(e.target.checked)
                }}
            >
                {isM2MEnabled && (
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