import { Box, Flex, VStack } from '@chakra-ui/react';
import BlockchainDisplay from 'components/common/blockchainDisplay/BlockchainDisplay';
import AppImage from 'components/common/image/AppImage';
import AppTypography from 'components/common/typography/AppTypography';
import React, { useContext } from 'react';
import { ModalRequestContext } from '../../context';
import { ModalReqDetailsStyles } from './style-component';
import useAppStore from 'lib/stores/app/appStore';
import { currencyConvertion } from 'lib/utils/helpers/currencyConvertion';

function ModalRequestDetails() {
    const { product, sku } = useContext(ModalRequestContext)
    const { LabelText } = ModalReqDetailsStyles
    const chain = sku?.recordData?.recordNetwork
    const { shop: { currency } } = useAppStore();
    return (
        <Flex gap={5} alignItems="center">
            <Box width={"50%"}><AppImage src={product.media && product.media[0].url} borderRadius="8px" /></Box>
            <Box width={"100%"}>
                <VStack align={"stretch"} spacing={.5}>
                    <AppTypography marginBottom={2} fontSize="2xl">{product.title}</AppTypography>
                    <LabelText>Commission: %{sku?.recordData?.commision}</LabelText>
                    <LabelText>Total Price: {currency?.symbol}{currencyConvertion(sku?.price, currency?.conversionRateToUSD, false)} {currency?.abbreviation}</LabelText>
                    <LabelText>Your earning: {currency?.symbol}{currencyConvertion(sku?.publisherEarning, currency?.conversionRateToUSD, false)}  {currency?.abbreviation}</LabelText>
                    <Flex alignItems={"center"} gap={2} paddingTop={2}>
                        <BlockchainDisplay show='icon' blockchain={chain} props={{ width: "16px" }} />
                        {chain && (
                            <AppTypography fontSize={14}>
                                <BlockchainDisplay show='name' blockchain={chain} />
                            </AppTypography>
                        )}
                    </Flex>
                </VStack>
            </Box>
        </Flex>
    )
}

export default ModalRequestDetails