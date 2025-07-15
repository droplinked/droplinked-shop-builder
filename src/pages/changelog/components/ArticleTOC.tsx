import { Box, Flex } from '@chakra-ui/react'
import { ListMd } from 'assets/icons/Navigation/List/ListMd'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { ChangelogEntry } from 'services/changelog/interfaces'
import React, { useEffect, useState } from 'react'
import { extractHeadings, parseBlocknoteTexteditorContent } from 'utils/helpers/blocknoteUtils'
import SectionHeader from './SectionHeader'

interface Props {
    changelogItem: ChangelogEntry
}

/**
 * TableOfContents - Displays a navigable table of contents for a blog post
 */
function ArticleTOC({ changelogItem }: Props) {
    const [selectedHeading, setSelectedHeading] = useState("")
    const { t } = useLocaleResources('changelogPage')

    const initialContent = parseBlocknoteTexteditorContent(changelogItem?.description)
    const headings = extractHeadings(initialContent)

    // Scroll to heading by ID with smooth behavior
    const scrollToHeading = (headingId: string) => {
        const element = document.querySelector(`[data-id="${headingId}"]`)
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
            setSelectedHeading(headingId)
        }
    }

    // Update selected heading based on scroll position
    useEffect(() => {
        if (headings.length === 0) return

        const handleScroll = () => {
            const headingElements = headings.map(h => ({
                id: h.id,
                element: document.querySelector(`[data-id="${h.id}"]`) as HTMLElement
            })).filter(h => h.element)

            if (headingElements.length === 0) return

            // Find first heading that's in viewport or above
            for (const heading of headingElements) {
                const rect = heading.element.getBoundingClientRect()
                if (rect.top >= 0 || rect.bottom > 0) {
                    setSelectedHeading(heading.id)
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [headings])

    if (!headings.length) return null

    return (
        <Flex direction="column" gap={4}>
            <SectionHeader
                icon={<ListMd color='#fff' />}
                title={t('articleToc')}
            />

            <Flex
                as="ul"
                position="relative"
                direction="column"
                borderLeft="2px solid"
                borderColor="neutral.gray.800"
                listStyleType="none"
                sx={{
                    '& li.active': {
                        color: "text.white",
                        borderLeftColor: "neutral.white"
                    },
                    '& li': {
                        borderLeft: "2px solid",
                        borderLeftColor: "transparent",
                        marginLeft: "-2px"
                    }
                }}
            >
                {headings.map((heading, index) => (
                    <Box
                        key={index}
                        as="li"
                        padding="8px 16px"
                        color="text.subtext.placeholder.dark"
                        transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                        cursor="pointer"
                        onClick={() => scrollToHeading(heading.id)}
                        className={selectedHeading === heading.id ? "active" : ""}
                    >
                        {heading.text}
                    </Box>
                ))}
            </Flex>
        </Flex>
    )
}

export default ArticleTOC