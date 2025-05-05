import { Box, Flex, Text } from '@chakra-ui/react'
import { ListMd } from 'assets/icons/Navigation/List/ListMd'
import { ChangelogEntry } from 'lib/apis/changelog/interfaces'
import React, { useEffect, useRef, useState } from 'react'
import { Heading, extractHeadings, parseBlocknoteTexteditorContent } from 'utils/helpers/blocknoteUtils'
import SectionHeader from './SectionHeader'

interface Props {
    changelogItem: ChangelogEntry
}

// "Table of Contents"(TOC)
function ArticleTOC({ changelogItem }: Props) {
    const initialContent = parseBlocknoteTexteditorContent(changelogItem?.description)
    const headings = extractHeadings(initialContent)
    const [selectedHeading, setSelectedHeading] = useState<Heading | null>(headings[0] || null)
    const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 })
    const headingRefs = useRef<(HTMLParagraphElement | null)[]>([])

    const scrollToHeading = (heading: Heading) => {
        setSelectedHeading(heading)
        const element = document.querySelector(`[data-id="${heading.id}"]`)
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    useEffect(() => {
        if (headings.length > 0 && !selectedHeading) setSelectedHeading(headings[0])

        const selectedIndex = headings.findIndex(h => h.id === selectedHeading?.id)
        const selectedElement = headingRefs.current[selectedIndex]

        if (selectedElement) {
            setIndicatorStyle({
                top: selectedElement.offsetTop,
                height: selectedElement.offsetHeight
            })
        }
    }, [selectedHeading, headings])

    if (!headings.length) return null

    return (
        <Flex direction="column" gap={4}>
            <SectionHeader
                icon={<ListMd color='#fff' />}
                title="In this article"
            />

            <Flex
                position="relative"
                direction="column"
                borderLeft="2px solid"
                borderColor="neutral.gray.800"
            >
                <Box
                    position="absolute"
                    left="-2px"
                    width="2px"
                    bg="neutral.white"
                    transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                    style={{
                        top: `${indicatorStyle.top}px`,
                        height: `${indicatorStyle.height}px`
                    }}
                />

                {headings.map((heading, index) => (
                    <Text
                        key={index}
                        as="button"
                        ref={el => headingRefs.current[index] = el}
                        padding="8px 16px"
                        textAlign="left"
                        color={selectedHeading?.id === heading.id ? "text.white" : "text.subtext.placeholder.dark"}
                        onClick={() => scrollToHeading(heading)}
                        transition="color 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                        {heading.text}
                    </Text>
                ))}
            </Flex>
        </Flex>
    )
}

export default ArticleTOC