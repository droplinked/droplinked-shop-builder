import { AvatarGroup, Box } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import { SupportedChains } from 'lib/apis/shop/interfaces'
import React from 'react'

export default function TokensIcon({ chains }: { chains: SupportedChains[] }) {

    const renderIcon = (type: string) => {
        switch (type) {
            case 'SKALE':
                return <AppIcons.Skale />;
            case 'BINANCE':
                return <AppIcons.BnbChain />;
            case 'BNBCHAIN':
                return <AppIcons.BnbChain />;
            case 'BASE':
                return <AppIcons.BlueBase />;
            case 'LINEA':
                return <AppIcons.Linea />;
            case 'POLYGON':
                return <AppIcons.Polygon />;
            case 'ETHEREUM':
                return <AppIcons.ETH />;
            case 'SOLANA':
                return <AppIcons.Solana />;
            case 'BITLAYER':
                return <AppIcons.Bitlayer />;
            case 'XRPLSIDECHAIN':
                return <AppIcons.XRPL />;
            case 'REDBELLY':
                return <AppIcons.Redbelly />;
            default:
                return null;
        }
    };

    return (
        <AvatarGroup>
            {chains.map((chain, index) => (
                <Box sx={{ svg: { width: "16px", height: "16px" } }} p={3} borderRadius={"100%"} border={"1px solid #292929"} bg={"#1c1c1c"} key={index}>
                    {renderIcon(chain.type)}
                </Box>
            ))}
        </AvatarGroup>
    )
}
