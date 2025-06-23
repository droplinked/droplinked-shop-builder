import { Heading, Text } from '@chakra-ui/react'
import React from 'react'

function NewsletterHeader() {
    return (
        <>
            <Heading
                as="h3"
                fontSize={{ base: 16, md: 18, xl: 24 }}
                fontWeight={500}
                color="text.white"
            >
                Stay up to date
            </Heading>
            <Text
                marginTop={1}
                marginBottom={4}
                fontSize={{ base: 14, xl: 16 }}
                color="text.subtext.placeholder.dark"
            >
                Join our mailing list to stay up to date with the latest news
            </Text>
        </>

    )
}

export default NewsletterHeader 