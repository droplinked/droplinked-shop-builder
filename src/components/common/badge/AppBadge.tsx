import { Badge, BadgeProps } from '@chakra-ui/react'
import React from 'react'
import AppTypography from '../typography/AppTypography'

interface Iprops extends BadgeProps {
    text: string | number
}

function AppBadge(props: Iprops) {
    return (
        <Badge variant='outline' colorScheme='green' padding="10px 20px" borderRadius="100px" {...props}>
            <AppTypography size="" weight='normal'>{props.text}</AppTypography>
        </Badge>
    )
}

export default AppBadge