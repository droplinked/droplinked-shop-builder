import { Flex, HStack, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import BlockchainNetwork from '../variants/parts/table/parts/recordModal/parts/form/parts/blockchainNetwork/BlockchainNetwork'

interface Props {
    showDetails: boolean
    setDetailsVisibility: (checked: boolean) => void
}

function DigitalProductNetwork({ showDetails, setDetailsVisibility }: Props) {
    const { productID, state: { publish_status, sku, digitalDetail }, methods: { dispatch, updateState } } = useContext(productContext)
    const { showToast } = useAppToast()

    const handleSwitchChange = (checked: boolean) => {
        if (productID && publish_status === "PUBLISHED")
            return showToast({ type: "error", message: "You have already published this product" })

        setDetailsVisibility(checked)
        if (!checked) {
            dispatch({ type: "updateDigitalLinks", params: { chain: "" } })
            const updatedSku = { ...sku[0], royalty: null }
            updateState('sku', [updatedSku])
        }
    }

    return (
        <Flex direction={"column"} gap={6}>
            <Flex gap={3}>
                <AppSwitch isChecked={showDetails} onChange={({ target: { checked } }) => handleSwitchChange(checked)} />
                <VStack align='stretch' color="#C2C2C2" spacing={1}>
                    <AppTypography fontSize={14} fontWeight='bold'>Drop</AppTypography>
                    <AppTypography fontSize={14}>Enable recording this digital good onchain and select a network to drop it on.</AppTypography>
                </VStack>
            </Flex>
            {showDetails &&
                <VStack align="stretch">
                    <BlockchainNetwork
                        error={null}
                        onChange={e => dispatch({ type: "updateDigitalLinks", params: { chain: e } })}
                        value={digitalDetail?.chain}
                    />
                    <HStack alignItems="center">
                        <AppIcons.Info />
                        <AppTypography color="#757575" fontSize='14px'>All product details will be recorded as an NFT on your selected blockchain wallet. <a style={{ color: "#25BB92" }} target={"_blank"}>Learn more</a></AppTypography>
                    </HStack>
                </VStack>
            }
        </Flex>
    )
}

export default DigitalProductNetwork