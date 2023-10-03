import { HStack, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import BlockchainNetwork from '../variants/parts/table/parts/recordModal/parts/form/parts/blockchainNetwork/BlockchainNetwork'

function NetworkDigital() {
    const { state: { product_type, digitalDetail: { chain } }, methods: { dispatch } } = useContext(productContext)

    return (
        <>
            {product_type === "DIGITAL" && (
                <VStack align="stretch">
                    <BlockchainNetwork
                        error={null}
                        onChange={e => dispatch({ type: "updateDigitalLinks", params: { chain: e } })}
                        value={chain}
                    />
                    <HStack alignItems="center">
                        <AppIcons.Info />
                        <AppTypography color="#757575" size='14px'>All product details will be recorded as an NFT on your selected blockchain wallet. <a style={{ color: "#25BB92" }} target={"_blank"}>Learn more</a></AppTypography>
                    </HStack>
                </VStack>
            )}
        </>
    )
}

export default NetworkDigital