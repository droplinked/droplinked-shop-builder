import { Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    subTitle?: string
    hasTypographySvg?: boolean
}

export default function HeadingSubtitle({ subTitle, hasTypographySvg }: Props) {
    if (!subTitle) return null

    return (
        <Text
            color="text.subtext.placeholder.dark"
            textAlign="center"
            fontSize={{ base: 14, lg: 16 }}
            fontWeight="400"
            lineHeight={{ base: "20px", lg: "24px" }}
            whiteSpace={{ base: "normal", md: "pre-wrap" }}
            mb={hasTypographySvg ? "48px" : 0}
        >
            {subTitle}
        </Text>
    )
}
