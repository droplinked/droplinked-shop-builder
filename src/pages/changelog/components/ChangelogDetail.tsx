import "@blocknote/core/fonts/inter.css"
import "@blocknote/react/style.css"
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import FullScreenLoading from "components/redesign/fullscreen-loading/FullScreenLoading"
import React from 'react'
import { formatDateToLongStyle } from "utils/helpers"
import useChangelogEntry from "../hooks/useChangelogEntry"
import ArticleTOC from "./ArticleTOC"
import ChangelogTags from './ChangelogTags'

function ChangelogDetail() {
    const { isFetching, data } = useChangelogEntry()
    const changelog = data?.data

    // const editor = useCreateBlockNote({ initialContent: JSON.parse(blog.content) })

    if (isFetching) return <FullScreenLoading />

    return (
        <Grid
            templateColumns={{
                base: '1fr',
                lg: '1fr 356px',
                xl: '1fr 387px',
                '2xl': '1fr 440px',
                '3xl': '1fr 600px'
            }}
            gap={6}
        >
            <Box>
                <Heading
                    as='h2'
                    marginBottom='9px'
                    fontSize={{ base: 24, md: 32, xl: 36 }}
                    color='text.white'
                >
                    {changelog?.title}
                </Heading>

                <DotSeparatedList marginBottom={9}>
                    <Text color='text.subtextPlaceholder.light'>Version {changelog?.version}</Text>
                    <Text color='text.subtextPlaceholder.light'>
                        {formatDateToLongStyle(new Date(changelog?.date))}
                    </Text>
                </DotSeparatedList>

                <Box display={{ base: 'block', lg: 'none' }} marginBottom={9}>
                    <ChangelogTags changelogItem={changelog} withHeading={true} />
                </Box>

                {/* <BlockNoteView editor={editor} editable={false} /> */}
            </Box>

            <Flex
                display={{ base: 'none', lg: 'flex' }}
                direction="column"
                gap={12}
            >
                <ArticleTOC changelogItem={changelog} />
                <ChangelogTags changelogItem={changelog} withHeading={true} />
            </Flex>
        </Grid>
    )
}

export default ChangelogDetail