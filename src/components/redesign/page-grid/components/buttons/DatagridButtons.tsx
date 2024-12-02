import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { IDataGridButtons } from './interface'

function DataGridButtons({ buttons }: IDataGridButtons) {
    return (
        <Flex gap="10px" flexDirection="row-reverse">
            {buttons.map((el: any, key: number) => {
                const Tag = el.to ? Link : Fragment
                return (
                    <Tag key={key} {...el.to && { to: el.to }}>
                        <Button _hover={{ backgroundColor: el?.backgroundColor, opacity: "0.8" }} sizes='medium' {...el.onClick && { onClick: () => el.onClick() }} {...el.buttonProps}>{el.caption}</Button>
                    </Tag>
                )
            })}
        </Flex>
    )
}

export default DataGridButtons