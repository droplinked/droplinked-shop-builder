import AppIcons from 'assest/icon/Appicons';
import React, { useMemo } from 'react';
import classes from './style.module.scss';

interface IProps {
    blockchain: string
    show: "name" | "icon"
    props?: any
}
function BlockchainDisplay({ blockchain, props, show }: IProps) {

    const chains = useMemo(() => ({
        "CASPER": {
            icon: <AppIcons.CasperIcon {...props} />,
            name: 'Casper'
        },
        "STACKS": {
            icon: <AppIcons.Stacks {...props} />,
            name: 'Stacks'
        },
        "NEAR": {
            icon: <AppIcons.NearWalletIcon  {...props} />,
            name: 'Near'
        },
        "POLYGON": {
            icon: <AppIcons.Polygon {...props} />,
            name: 'Polygon'
        },
        "XRPLSIDECHAIN": {
            icon: <AppIcons.Ripple className={classes.ripple} {...props} />,
            name: 'XRPL Sidechain'
        },
        "BINANCE": {
            icon: <AppIcons.Binance {...props} />,
            name: 'Binance'
        },
        "BASE": {
            icon: <AppIcons.Base className={classes.base} {...props} />,
            name: 'Base'
        },
        "STRIPE": {
            icon: <AppIcons.Stripe {...props} />,
            name: 'Stripe'
        },
        "LINEA": {
            icon: <AppIcons.Linea className={classes.ripple} {...props} />,
            name: 'Linea'
        },
        "UNISAT": {
            icon: <AppIcons.Unisat {...props} />,
            name: 'Unisat'
        },
        "HEDERA": {
            icon: <AppIcons.Hedera {...props} />,
            name: 'Hedera'
        },
        "SKALE": {
            icon: <AppIcons.Skale {...props} />,
            name: 'Skale'
        },
        "UNSTOPPABLEDOMAINS": {
            icon: <AppIcons.UnstoppableDomainsIcon {...props} />,
            name: 'Unstoppable domain'
        },
        "XUMM": {
            icon: <AppIcons.Xumm {...props} />,
            name: 'Xumm'
        },
        "ETH": {
            icon: <AppIcons.ETH {...props} />,
            name: 'Eth'
        },
        "XRPL": {
            icon: <AppIcons.XRPL {...props} />,
            name: 'Xrpl'
        },
        "BITCOIN": {
            icon: <AppIcons.Bitcoin {...props}/>,
            name: "Bitcoin"
        }
    }), [props])

    return show === "icon" ? chains[blockchain]?.icon || <AppIcons.File {...props} /> : chains[blockchain]?.name || blockchain
}

export default BlockchainDisplay