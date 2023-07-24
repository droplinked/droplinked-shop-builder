import AppIcons from 'assest/icon/Appicons';
import React, { useMemo } from 'react'
import { JsxAttribute, JsxAttributes } from 'typescript';

interface IProps {
    blockchain: string
    props?: any
}
function IconBlockchain({ blockchain, props }: IProps) {

    const icon = useMemo(() => {
        switch (blockchain) {
            case "CASPER":
                return <AppIcons.casperIcon {...props} />
            case "STACKS":
                return <AppIcons.stacks {...props} />
            default:
                return null
        }
    }, [blockchain, props])

    return icon
}

export default IconBlockchain