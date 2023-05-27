import { Box, ButtonProps } from '@chakra-ui/react'
import BasicButton, { IBasicButton } from 'components/common/BasicButton/BasicButton'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export interface IDatagridButtons {
    buttons?: Array<{
        caption: string
        onClick?: Function
        to?: string
        buttonProps?: IBasicButton
    }>
}

function DatagridButtons({ buttons }: IDatagridButtons) {
    return (
        <Box>
            {buttons.map((el, key) => {
                const Tag = el.to ? Link : Fragment
                return (
                    <Tag key={key} {...el.to && { to: el.to }}>
                        <BasicButton {...el.onClick && { onClick: () => el.onClick() }} {...el.buttonProps}>{el.caption}</BasicButton>
                    </Tag>
                )
            })}
        </Box>
    )
}

export default DatagridButtons