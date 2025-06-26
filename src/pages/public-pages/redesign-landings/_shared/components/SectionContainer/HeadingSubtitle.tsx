import { Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    subTitle?: string
    hasTypographyText?: boolean
}

export default function HeadingSubtitle({ subTitle, hasTypographyText }: Props) {
    if (!subTitle) return null

    return (
        <Text
            color="text.subtext.placeholder.dark"
            textAlign="center"
            fontSize={{ base: 14, lg: 16 }}
            fontWeight="400"
            lineHeight={{ base: "20px", lg: "24px" }}
            whiteSpace="pre-wrap"
            mb={hasTypographyText ? "48px" : 0}
        >
            {subTitle}
        </Text>
    )
}
