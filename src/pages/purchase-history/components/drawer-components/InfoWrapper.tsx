import { Flex, FlexProps, Text, TextProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
    title?: string
    flexProps?: FlexProps
    textProps?: TextProps
}

export default function InfoWrapper({ children, title, flexProps, textProps }: Props) {
    return (
        <Flex
            border="1px solid #292929"
            borderRadius={16}
            p={{ base: 4, md: 6 }}
            gap={6}
            flexDirection="column"
            {...flexProps}
        >
            {title && <Text color="#fff" fontSize={16} fontWeight={500} {...textProps}>{title}</Text>}
            {children}
        </Flex>
    )
}
