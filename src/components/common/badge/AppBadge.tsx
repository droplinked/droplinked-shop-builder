import { Badge, BadgeProps } from '@chakra-ui/react'
import React from 'react'

interface Iprops extends BadgeProps {
    text: string | number
}

function AppBadge(props: Iprops) {
    return (
        <Badge variant='outline' colorScheme='green' padding={"10px 20px"} borderRadius="100px" {...props}>
            {props.text}
        </Badge>
    )
}

export default AppBadge