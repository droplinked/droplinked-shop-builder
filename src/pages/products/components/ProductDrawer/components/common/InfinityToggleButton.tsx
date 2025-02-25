import { Box } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import React from "react"

interface Props {
    isActive: boolean,
    onToggle: () => void
}

function InfinityToggleButton({ isActive, onToggle }: Props) {
    return (
        <Box
            as='button'
            type="button"
            w={7}
            h={7}
            borderRadius={4}
            padding="6px"
            bgColor="#292929"
            onClick={onToggle}
        >
            {isActive ? <AppIcons.GreenInfinity /> : <AppIcons.GrayInfinity />}
        </Box>
    )
}

export default InfinityToggleButton