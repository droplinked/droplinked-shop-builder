import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React from 'react'
import { ButtonGridProps } from './interface'

function ButtonGrid({ buttons }: ButtonGridProps) {
    return (
        <Flex flexDirection="row-reverse" gap={4}>
            {buttons.map((button, index: number) => {
                const { caption, ...buttonProps } = button
                return (
                    <Button
                        key={index}
                        _hover={{ opacity: "0.8" }}
                        paddingBlock="10px"
                        paddingInline="14px"
                        fontSize={14}
                        fontWeight={500}
                        {...buttonProps}
                    >
                        {caption}
                    </Button>
                )
            })}
        </Flex>
    )
}

export default ButtonGrid