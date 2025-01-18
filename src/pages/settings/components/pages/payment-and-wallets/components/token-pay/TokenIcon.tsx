import AppIcons from 'assest/icon/Appicons';
import React from 'react'

export default function TokenIcon({ name }: { name: string }) {
    const renderIcon = (name: string) => {
        switch (name) {
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
            default:
                return null;
        }
    };
    return (
        renderIcon(name)
    )
}
