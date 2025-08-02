import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import BookDemoForm from './BookDemoForm'

export default function BookDemoFormSection() {
    return (
        <Flex
            height="100%"
            direction="column"
            padding={{ base: 4, md: 6 }}
        >
            <Heading
                marginBottom="2px"
                fontSize={{ base: 18, md: 20 }}
                fontWeight={500}
                color="text.white"
            >
                Request Meeting
            </Heading>
            <Text
                marginBottom={6}
                fontSize={14}
                color="text.subtext.placeholder.light"
            >
                Complete the form below to have a team member coordinate time with you.
            </Text>
            <BookDemoForm />
        </Flex>
    )
}
