import { Badge, BadgeProps } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import AppTypography from '../typography/AppTypography'

interface Iprops extends BadgeProps {
    text: string | number
    status?: "green" | "red" | "gray"
}

function AppBadge(props: Iprops) {

    const handleStatus = useMemo(() => {
        switch (props.status) {
            case "green":
                return "green"
            case "red":
                return "red"
            case "gray":
                return "gray"
            default:
                return "green"
        }
    }, [props.status])

    return (
        <Badge variant='outline' colorScheme={props.status ? handleStatus : "green"} textTransform="capitalize" padding="10px 20px" borderRadius="100px" {...props}>
            <AppTypography fontWeight='bold'>{props.text}</AppTypography>
        </Badge>
    )
}

export default AppBadge