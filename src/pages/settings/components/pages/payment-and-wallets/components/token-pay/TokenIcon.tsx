import AppIcons from 'assest/icon/Appicons';
import React from 'react'

export default function TokenIcon({ symbol }: { symbol: string }) {
    const renderIcon = (symbol: string) => {
        switch (symbol) {
            case 'SKALE':
                return <AppIcons.Skale />;
            case 'BNB':
                return <AppIcons.BnbChain />;
            case "BINANCE_PEG_BSC_USD":
                return <AppIcons.BnbChain />;
            case 'BASE':
                return <AppIcons.BlueBase />;
            case 'LINEA':
                return <AppIcons.Linea />;
            case 'MATIC':
                return <AppIcons.Polygon />;
            case 'ETHEREUM':
                return <AppIcons.ETH />;
            case 'SOL':
                return <AppIcons.Solana />;
            case 'BITLAYER':
                return <AppIcons.Bitlayer />;
            case 'XRP':
                return <AppIcons.XRPL />;
            case 'REDBELLY':
                return <AppIcons.Redbelly />;
            case 'RBNT':
                return <AppIcons.Redbelly />;
            case 'USDC':
                return <AppIcons.Usdc />;
            case 'USDT':
                return <AppIcons.Usdt />;
            default:
                return null;
        }
    };
    return (
        renderIcon(symbol)
    )
}
