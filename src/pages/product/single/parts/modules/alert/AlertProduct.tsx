import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import classes from './style.module.scss'

interface Iprops {
    text: string
}

function AlertProduct({ text }: Iprops) {
    return (
        <Flex alignItems="center" gap="10px">
            <AppIcons.InfoIcon className={classes.icon} />
            <AppTypography size='12px' color="#FEB900">{text}</AppTypography>
        </Flex>
    )
}

export default AlertProduct