import { Box, Flex, FlexProps, Text } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import QouteIcon from '../../home/svgs/QouteIcon'
import { Feedback } from '../types/types'

interface Props extends FlexProps {
    feedback: Feedback
    hasQuote?: boolean
}

function FeedbackAuthor({ feedback, hasQuote = true, ...props }: Props) {
    const { isRTL } = useLocaleResources('common')

    const { authorName, authorImage, submittedAt } = feedback

    return (
        <Flex
            alignItems="center"
            gap={4}
            {...props}
        >
            <AppImage
                src={authorImage}
                alt={`${authorName} avatar`}
                width="48px"
                height="48px"
                borderRadius="50%"
            />

            <Box>
                <Text
                    fontSize={{ base: "14px", xl: "16px" }}
                    fontWeight={500}
                    color="text.white"
                    mb={1}
                >
                    {authorName}
                </Text>
                <Text
                    fontSize="12px"
                    color="text.subtext.placeholder.dark"
                    mb={1}
                >
                    {submittedAt}
                </Text>
            </Box>

            {hasQuote && <QouteIcon style={isRTL ? { marginRight: "auto" } : { marginLeft: "auto" }} />}
        </Flex>
    )
}

export default FeedbackAuthor