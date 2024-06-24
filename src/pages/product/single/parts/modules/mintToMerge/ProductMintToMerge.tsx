import { Box, Checkbox, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { useHasPermission } from 'lib/stores/app/appStore'
import AppErrors from 'lib/utils/statics/errors/errors'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import ProductPositions from '../positions/ProductPositions'
import ProductM2m from './parts/m2m/ProductM2m'
import M2MPlaceholder from './parts/placeholder/M2MPlaceholder'

function ProductMintToMerge() {
    const hasPermission = useHasPermission()
    const { showToast } = useAppToast()
    const [CheckBox, setCheckBox] = useState(false)
    const { state: { m2m_positions, m2m_positions_options, m2m_services, isAddToCartDisabled }, store: { state: { variants } }, methods: { updateState }, loading } = useContext(productContext)

    // onChange checkbox
    const checkBoxHandle = useCallback((e: any) => {
        const checked = e.target.checked

        if (!hasPermission("mint_to_merch") && checked)
            return showToast({ message: AppErrors.permission.permission_denied, type: "error" })

        if (!checked) {
            updateState("m2m_positions", [])
            updateState("m2m_services", [])
        }
        setCheckBox(e.target.checked)
    }, [])

    // set true if exist m2m_positions
    useEffect(() => {
        if (m2m_positions.length || m2m_services.length || isAddToCartDisabled) setCheckBox(true)
    }, [m2m_positions])

    // if not exist m2m_positions_options checkbox unchecked 
    useEffect(() => {
        if (!m2m_positions_options.length) setCheckBox(false)
    }, [m2m_positions_options])

    return (
        <VStack align={"stretch"} spacing={4}>
            <Box>
                <AppSkeleton isLoaded={loading} width={"70%"}>
                    <Checkbox isDisabled={!m2m_positions_options.length} size='md' isChecked={CheckBox} alignItems="flex-start" colorScheme='green' onChange={checkBoxHandle}>
                        <VStack align='stretch' color="#C2C2C2" paddingLeft={2} spacing={1}>
                            <AppTypography fontSize='14px' fontWeight='bold'>Mint to Merch</AppTypography>
                            <AppTypography fontSize="14px">
                                Enable customers to directly print their NFT artwork on the POD product
                            </AppTypography>
                        </VStack>
                    </Checkbox>
                </AppSkeleton>
            </Box>

            {CheckBox && variants ? (
                <VStack align="stretch" backgroundColor="#141414" borderRadius="8px" padding="20px 25px" spacing="48px">
                    <ProductPositions />
                    <ProductM2m />
                    <M2MPlaceholder />
                </VStack>
            ) : null}
        </VStack >
    )
}

export default ProductMintToMerge