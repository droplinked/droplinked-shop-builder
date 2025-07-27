import { Flex } from '@chakra-ui/react'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { useHasPermission } from 'stores/app/appStore'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useState } from 'react'
import ProductFormAccordion from '../common/ProductFormAccordion'
import SwitchBox from '../common/SwitchBox'
import PositionOptions from '../fields/POD/PODMint2Merch/PositionOptions'
import WalletOptions from '../fields/POD/PODMint2Merch/WalletOptions'

function PODMint2MerchAccordion() {
    const { t } = useLocaleResources('products');
    const { values: { m2m_positions_options, m2m_positions, m2m_services }, setFieldValue } = useProductForm()

    const [isM2MEnabled, setIsM2MEnabled] = useState(
        !!(m2m_positions.length || m2m_services.length)
    )

    const hasPermission = useHasPermission()
    const { showToast } = useAppToast()

    function handleMintToMerchToggle(checked: boolean) {
        if (!hasPermission("mint_to_merch") && checked) {
            showToast({ message: t('permissionErrors.permissionDenied'), type: "error" })
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
            label={t('ProductForm.accordions.podMint2Merch.label')}
            accessLevel='Premium'
        >
            <SwitchBox
                title={t('ProductForm.accordions.podMint2Merch.title')}
                description={t('ProductForm.accordions.podMint2Merch.description')}
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