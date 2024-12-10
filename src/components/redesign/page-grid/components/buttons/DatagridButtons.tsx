import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React from 'react'
import { IDataGridButtons } from './interface'

function DataGridButtons({ buttons }: IDataGridButtons) {
    return (
        <Flex flexDirection="row-reverse" gap={4}>
            {buttons.map((button, index: number) => {
                const { caption, ...buttonProps } = button
                return (
                    <Button
                        key={index}
                        fontSize={14}
                        fontWeight={500}
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