import { HStack, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import BlockchainNetwork from '../variants/parts/table/parts/recordModal/parts/form/parts/blockchainNetwork/BlockchainNetwork'

function NetworkDigital() {
    return (
        <VStack align="stretch">
            <BlockchainNetwork
                error={null}
                onChange={(e) => console.log("blockchain", e)}
                value={[]}
            />
            <HStack alignItems="center">
                <AppIcons.Info />
                <AppTypography color="#757575" size='14px'>??? NFT Creating Blockchain.. <a style={{ color: "#25BB92" }} target={"_blank"}>Learn more</a></AppTypography>
            </HStack>
        </VStack>
    )
}

export default NetworkDigital