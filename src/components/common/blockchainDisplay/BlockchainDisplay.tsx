import AppIcons from 'assest/icon/Appicons';
import React, { useMemo } from 'react'
import classes from './style.module.scss'

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
    }), [props])

    return show === "icon" ? chains[blockchain]?.icon || <AppIcons.File {...props} /> : chains[blockchain]?.name || blockchain
}

export default BlockchainDisplay