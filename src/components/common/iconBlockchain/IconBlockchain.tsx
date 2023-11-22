import AppIcons from 'assest/icon/Appicons';
import React, { useMemo } from 'react'
import classes from './style.module.scss'

interface IProps {
    blockchain: string
    props?: any
}
function IconBlockchain({ blockchain, props }: IProps) {

    const icon = useMemo(() => ({
        "CASPER": <AppIcons.CasperIcon {...props} />,
        "STACKS": <AppIcons.Stacks {...props} />,
        "NEAR": <AppIcons.NearWalletIcon  {...props} />,
        "POLYGON": <AppIcons.Polygon {...props} />,
        "XRPLSIDECHAIN": <AppIcons.Ripple className={classes.ripple} {...props} />,
        "BINANCE": <AppIcons.Binance {...props} />,
        "BASE": <AppIcons.Base className={classes.base} {...props} />,
    }), [props])

    return icon[blockchain] || <AppIcons.File {...props} />
}

export default IconBlockchain