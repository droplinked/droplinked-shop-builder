import { Button, Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import React from 'react'

interface Props {
    onPrev: () => void
    onNext: () => void
}

export default function PreviewModalArrows({ onPrev, onNext }: Props) {
    return (
        <Flex
            alignItems={"center"}
            gap={2}
            sx={{
                "button": { width: 12, height: 12, borderRadius: 8, background: "#fff", _hover: {} },
                "button:last-of-type": { "svg": { transform: "rotate(180deg)" } },
                "svg path": { stroke: "#000" }
            }}
        >
            <Button onClick={onPrev}><AppIcons.BackArrow /></Button>
            <Button onClick={onNext}><AppIcons.BackArrow /></Button>
        </Flex>
    )
}