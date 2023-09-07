import { Box, Checkbox, VStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import { appDeveloment } from 'lib/utils/app/variable'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import ProductPositions from '../positions/ProductPositions'
import ProductM2m from './parts/m2m/ProductM2m'

function ProductMintToMerge() {
    const [CheckBox, setCheckBox] = useState(false)
    const { state: { m2m_positions, m2m_positions_options }, store: { state: { variants } }, methods: { updateState }, loading } = useContext(productContext)

    // onChange checkbox
    const checkBoxHandle = useCallback((e: any) => {
        const checked = e.target.checked
        if (!checked) {
            updateState("m2m_positions", [])
            updateState("m2m_services", [])
        }
        setCheckBox(e.target.checked)
    }, [])

    // set true if exist m2m_positions
    useEffect(() => {
        if (m2m_positions.length) setCheckBox(true)
    }, [m2m_positions])

    // if not exist m2m_positions_options checkbox unchecked 
    useEffect(() => {
        if (!m2m_positions_options.length) setCheckBox(false)
    }, [m2m_positions_options])

    return (
        <VStack align={"stretch"} spacing={4}>
            <Box>
                <AppSkeleton isLoaded={loading} width={"70%"}>
                    <Checkbox isDisabled={!appDeveloment || !m2m_positions_options.length} size='md' isChecked={CheckBox} alignItems="flex-start" colorScheme='green' onChange={checkBoxHandle}>
                        <VStack align='stretch' paddingLeft={2} spacing={1}>
                            <AppTypography size='14px' weight='bolder'>Mint to Merch</AppTypography>
                            <AppTypography size="14px" color="lightGray">
                                Enable customers to directly print their NFT artwork on the POD product
                            </AppTypography>
                        </VStack>
                    </Checkbox>
                </AppSkeleton>
            </Box>

            {CheckBox && variants ? (
                <VStack align="stretch" backgroundColor="#141414" borderRadius="8px" padding="20px 25px" spacing={4}>
                    <AppTypography size='14px'>Customers Position Options</AppTypography>
                    <ProductPositions />
                    <AppTypography size='14px'>Customers Wallet Options</AppTypography>
                    <ProductM2m />
                </VStack>
            ) : null}
        </VStack >
    )
}

export default ProductMintToMerge