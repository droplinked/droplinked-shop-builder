import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { ExternalarrowMd } from 'assets/icons/Navigation/ExternalArrow/ExternalarrowMd'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
import { ChangelogEntry } from 'lib/apis/changelog/interfaces'
import React, { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDateToLongStyle, getTimeAgo } from 'utils/helpers'
import ChangelogTags from './ChangelogTags'

interface Props {
    entry: ChangelogEntry
}

const ChangelogEntryCard = forwardRef<HTMLDivElement, Props>(function (props, ref) {
    const { entry } = props
    const navigate = useNavigate()

    return (
        <Flex
            ref={ref}
            direction={{ base: "column", lg: "row" }}
            padding={{ base: 4, md: 6, lg: 4, "2xl": 6 }}
            gap={{ base: 6, "2xl": 12, "3xl": 20 }}
        >
            <Flex minW="200px" direction="column" gap={1}>
                <Text fontSize={{ base: 16, xl: 18 }} fontWeight={500} color="text.subtext.placeholder.light">
                    {formatDateToLongStyle(new Date(entry.date))}
                </Text>
                <Text fontSize={{ base: 14, xl: 16 }} color="text.subtext.placeholder.dark">
                    {getTimeAgo(entry.date)}
                </Text>
            </Flex>

            <Box>
                <Heading as="h3" marginBottom={3} fontSize={{ base: 18, xl: 20 }} color="text.white">
                    Update {entry.version}
                </Heading>

                <ChangelogTags changelogItem={entry} />

                <Heading as="h3" marginTop={6} marginBottom={1} fontSize={{ base: 16, xl: 18 }} color="text.white">
                    {entry.title}
                </Heading>

                <Text marginBottom={3} noOfLines={2} fontSize={{ base: 14, xl: 16 }} color="text.subtext.placeholder.light">
                    {entry.summary}
                </Text>

                <InteractiveText
                    iconRight={<ExternalarrowMd color="#179ef8" />}
                    onClick={() => navigate(`/analytics/changelog/${entry._id}`)}
                >
                    Read More
                </InteractiveText>
            </Box>
        </Flex>
    )
})

export default ChangelogEntryCard