import { Box } from "@chakra-ui/react"
import React from "react"

export default function CardHoverEffect({ isStatic }: { isStatic: boolean }) {
    const defaultOpacity = isStatic ? 1 : 0

    return (
        <>
            <Box
                position="absolute"
                top={0}
                left={0}
                w="full"
                h="full"
                bgImage="url(https://upload-file-droplinked.s3.amazonaws.com/d5015d5fd7a596899973fa59c29f6ec6093415eb45f76049cf83e18aeb7cfb14.png)"
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
                opacity={defaultOpacity}
                transition="opacity 0.3s ease-in-out"
                _groupHover={{ opacity: 1 }}
            />
        </>
    )
}
