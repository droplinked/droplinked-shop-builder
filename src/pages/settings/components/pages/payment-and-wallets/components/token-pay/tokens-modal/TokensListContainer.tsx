import { Flex, Grid } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import { IPaymentPublicService } from 'services/shop/interfaces';
import React from 'react'
import TokenCard from './TokenCard';
import AppIcons from 'assets/icon/Appicons';
import AppTooltip from 'components/common/tooltip/AppTooltip';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface Props {
    isEvm?: boolean;
    tokens: IPaymentPublicService[];
}

export default function TokensListContainer({ isEvm, tokens }: Props) {
    const { t } = useLocaleResources('settings');
    const evmTokens = tokens.filter(token => token.supportedChains?.some(chain => chain.group === 'EVM'));
    const solanaTokens = tokens.filter(token => token.supportedChains?.some(chain => chain.group === 'SOLANA'));
    const filteredList = isEvm ? evmTokens : solanaTokens
    const tooltipText = t('PaymentsWallets.tokens.solanaTooltip');

    if (filteredList.length === 0) {
        return null;
    }

    return (
        <Flex flexDir={"column"} gap={6}>
            <Flex gap={2} alignItems={"center"}>
                <AppTypography color={"neutral.white"} fontSize={"16px"}>
                    {isEvm ? t('PaymentsWallets.tokens.evm') : t('PaymentsWallets.tokens.solana')}
                </AppTypography>
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
