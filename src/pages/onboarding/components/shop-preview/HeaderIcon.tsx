import { Box } from "@chakra-ui/react"
import React from "react"

interface HeaderIconProps {
    size?: string
}

const HeaderIcon: React.FC<HeaderIconProps> = ({ size = "36px" }) => (
    <Box
        position="relative"
        w={size}
        h={size}
        borderRadius={8}
        background="#1c1c1c"
    />
)

export default HeaderIcon
