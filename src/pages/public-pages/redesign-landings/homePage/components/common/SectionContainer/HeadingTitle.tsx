import { Heading } from '@chakra-ui/react'
import React from 'react'

export default function HeadingTitle({ title }: { title?: string }) {
    if (!title) return null

    return (
        <Heading
            as="h1"
            color="neutral.white"
            textAlign="center"
            mb={{ base: 2, lg: 4 }}
            fontSize={{ base: 24, md: 36, lg: 48 }}
            fontWeight="500"
            lineHeight={{ base: "36px", md: "52px", lg: "64px" }}
            whiteSpace="pre-wrap"
        >
            {title}
        </Heading>
    )
}
