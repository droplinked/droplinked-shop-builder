import { Text } from '@chakra-ui/react'
import React from 'react'

export default function HeadingSubtitle({ subTitle }: { subTitle?: string }) {
    if (!subTitle) return null

    return (
        <Text
            color="text.subtext.placeholder.dark"
            textAlign="center"
            fontSize={{ base: 14, lg: 16 }}
            fontWeight="400"
            lineHeight={{ base: "20px", lg: "24px" }}
            whiteSpace="pre-wrap"
            mb={6}
        >
            {subTitle}
        </Text>
    )
}
