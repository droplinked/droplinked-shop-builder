import { Box } from "@chakra-ui/react"
import { InfinitySm } from 'assets/icons/Sign/Infinity/InfinitySm'
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
            bgColor="neutral.gray.800"
            onClick={onToggle}
        >
            {isActive ? <InfinitySm color="#2BCFA1" /> : <InfinitySm color="#7B7B7B" />}
        </Box>
    )
}

export default InfinityToggleButton