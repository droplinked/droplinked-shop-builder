import { Badge, BadgeProps } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

interface Props extends BadgeProps, PropsWithChildren { }

function D3Badge({ children, ...props }: Props) {
    return (
        <Badge
            padding="8px 24px"
            border="1px solid rgba(255, 255, 255, 0.16)"
            borderRadius="500px"
            bg="radial-gradient(50% 100% at 50% 0%, rgba(43, 207, 161, 0.04) 0%, rgba(43, 207, 161, 0.08) 100%)"
            boxShadow="inset 0px -2px 4px 0px rgba(128, 237, 207, 0.32)"
            backdropFilter="blur(6px)"
            fontSize={16}
            fontWeight={500}
            color="#80EDCF"
            textTransform="capitalize"
            {...props}
        >
            {children}
        </Badge>
    )
}

export default D3Badge