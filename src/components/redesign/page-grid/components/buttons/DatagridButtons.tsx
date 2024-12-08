import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React from 'react'
import { IDataGridButtons } from './interface'

function DataGridButtons({ buttons }: IDataGridButtons) {
    return (
        <Flex gap="10px" flexDirection="row-reverse">
            {buttons.map((button, index: number) => {
                const { caption, ...buttonProps } = button
                return (
                    <Button
                        key={index}
                        _hover={{ opacity: "0.8" }}
                        {...buttonProps}
                    >
                        {caption}
                    </Button>
                )
            })}
        </Flex>
    )
}

export default DataGridButtons