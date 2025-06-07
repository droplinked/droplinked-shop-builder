import { GridItem, GridItemProps } from '@chakra-ui/react'
import React from 'react'

export const HeaderContainer = ({ children, ...rest }: GridItemProps) => {
    return (
        <GridItem
            as="header"
            position="sticky"
            top={0}
            borderBottom="1px solid"
            borderColor="neutral.gray.800"
            backgroundColor="neutral.background"
            zIndex={999}
            display="flex"
            {...rest}
        >
            {children}
        </GridItem>
    )
} 