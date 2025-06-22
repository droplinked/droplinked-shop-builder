import { Box } from "@chakra-ui/react";
import React from "react";

export default function CardHoverEffect() {
    return (
        <>
            <Box
                position="absolute"
                top={0}
                left={0}
                w="full"
                h="full"
                bgImage="url(https://upload-file-droplinked.s3.amazonaws.com/67d24e75abf96fe4cdd2c9092aa85834d55de9c119f8dc77308161c9553d8293.png)"
                bgSize="cover"
                bgPosition="50%"
                bgRepeat="no-repeat"
                mixBlendMode="exclusion"
                opacity={0}
                transition="opacity 0.3s ease-in-out"
                _groupHover={{ opacity: 1 }}
            />
            <Box
                position="absolute"
                top={0}
                left={0}
                w="full"
                h="full"
                bg="#2BCFA1"
                mixBlendMode="color"
                opacity={0}
                transition="opacity 0.3s ease-in-out"
                _groupHover={{ opacity: 1 }}
            />
            <Box
                position="absolute"
                top={0}
                left={0}
                w="full"
                h="full"
                bg="linear-gradient(180deg, #0A0A0A 0%, rgba(10, 10, 10, 0.00) 50%)"
                opacity={0}
                transition="opacity 0.3s ease-in-out"
                _groupHover={{ opacity: 1 }}
            />
        </>
    );
}
