import { Flex, Grid } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import { IPaymentPublicService } from 'lib/apis/shop/interfaces';
import React from 'react'
import TokenCard from './TokenCard';
import AppIcons from 'assets/icon/Appicons';
import AppTooltip from 'components/common/tooltip/AppTooltip';

interface Props {
    isEvm?: boolean;
    tokens: IPaymentPublicService[];
}

export default function TokensListContainer({ isEvm, tokens }: Props) {
    const evmTokens = tokens.filter(token => token.supportedChains?.some(chain => chain.group === 'EVM'));
    const solanaTokens = tokens.filter(token => token.supportedChains?.some(chain => chain.group === 'SOLANA'));
    const filteredList = isEvm ? evmTokens : solanaTokens
    const tooltipText = "In order to receive direct token payments, you must connect a Solana wallet. If not, all received money will be converted to USD/USDC and applied to credits."
    if (filteredList.length === 0) {
        return null;
    }

    return (
        <Flex flexDir={"column"} gap={6}>
            <Flex gap={2} alignItems={"center"}>
                <AppTypography color={"#fff"} fontSize={"16px"}>{isEvm ? "EVM" : "Solana"}</AppTypography>
                {!isEvm &&
                    <AppTooltip flexShrink={0} placement="bottom-start" label={tooltipText}>
                        <AppIcons.TooltipIcon fill={'#292929'} />
                    </AppTooltip>
                }
            </Flex>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={4}>
                {
                    filteredList.map((item) => {
                        return (
                            <TokenCard key={item._id} token={item} />
                        )
                    })
                }
            </Grid>
        </Flex>
    )
}
