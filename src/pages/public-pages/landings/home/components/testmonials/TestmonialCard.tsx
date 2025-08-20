import { Flex, FlexProps, Text } from '@chakra-ui/react'
import FeedbackAuthor from 'pages/public-pages/landings/_shared/components/FeedbackAuthor'
import { Feedback } from 'pages/public-pages/landings/_shared/types/types'
import React from 'react'

interface Props extends FlexProps {
    feedback: Feedback
}

export default function TestmonialCard({ feedback, ...flexProps }: Props) {

    return (
        <Flex
            height="100%"
            flexDirection="column"
            border="1px solid"
            borderColor="neutral.gray.900"
            borderRadius={16}
            padding={{ base: 4, xl: 6 }}
            background="neutral.websiteBackground"
            zIndex={1}
            {...flexProps}
        >
            <Text
                height={{ base: "max-content", md: "112px", lg: "156px" }}
                color="text.white"
                fontSize={{ base: "14px", xl: "16px" }}
                lineHeight={{ base: "24px", xl: "28px" }}
                fontWeight={500}
                mb="48px"
            >
                {feedback.content}
            </Text>

            <FeedbackAuthor feedback={feedback} marginTop="auto" />
        </Flex>
    )
}
