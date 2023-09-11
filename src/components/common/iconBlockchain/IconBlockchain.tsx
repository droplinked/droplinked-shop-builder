import AppIcons from 'assest/icon/Appicons';
import React, { useMemo } from 'react'
import classes from './style.module.scss'

interface IProps {
    blockchain: string
    props?: any
}
function IconBlockchain({ blockchain, props }: IProps) {

    const icon = useMemo(() => {
        switch (blockchain) {
            case "CASPER":
                return <AppIcons.CasperIcon {...props} />
            case "STACKS":
                return <AppIcons.Stacks {...props} />
            case "POLYGON":
                return <AppIcons.Polygon {...props} />
            case "RIPPLE":
                return <AppIcons.Ripple className={classes.ripple} {...props} />
            case "BINANCE":
                return <AppIcons.Binance {...props} />
            default:
                return <AppIcons.File {...props} />
        }
    }, [blockchain, props])

    return icon
}

export default IconBlockchain