import { Text } from "@chakra-ui/react"
import React, { PropsWithChildren } from "react"
import { Link as RouterLink } from "react-router-dom"

const baseTextStyles = {
    fontSize: 14,
    fontWeight: 500,
    color: "#179EF8",
    _hover: { textDecoration: "underline" }
}

interface Props extends PropsWithChildren {
    onClick?: () => void
    to?: string
}

function InteractiveText({ onClick, to, children }: Props) {
    return to ?
        <Text as={RouterLink} to={to} {...baseTextStyles}>
            {children}
        </Text>
        :
        <Text as="button" {...baseTextStyles} onClick={onClick}>
            {children}
        </Text>
}

export default InteractiveText