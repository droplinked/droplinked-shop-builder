import { Box, Flex, Text } from '@chakra-ui/react'
import { ListMd } from 'assets/icons/Navigation/List/ListMd'
import { ChangelogEntry } from 'lib/apis/changelog/interfaces'
import React, { useEffect, useRef, useState } from 'react'
import SectionHeader from './SectionHeader'

const headings = [
    'Transforming Ideas into Digital Solutions',
    'Behind the Scenes: Our Design Philosophy',
    'Innovative Approaches to Problem Solving',
    'Maximizing Performance and Optimization',
    'Creating Seamless User Experiences'
]

interface Props {
    changelogItem: ChangelogEntry
}

// "Table of Contents"(TOC)
function ArticleTOC({ changelogItem }: Props) {
    const [selectedHeading, setSelectedHeading] = useState<string>(headings[0])
    const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 })
    const headingRefs = useRef<(HTMLButtonElement | null)[]>([])

    useEffect(() => {
        const selectedIndex = headings.indexOf(selectedHeading)
        const selectedElement = headingRefs.current[selectedIndex]

        if (selectedElement) {
            setIndicatorStyle({
                top: selectedElement.offsetTop,
                height: selectedElement.offsetHeight
            })
        }
    }, [selectedHeading])

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
                        ref={el => headingRefs.current[index] = el}
                        as="button"
                        padding="8px 16px"
                        textAlign="left"
                        color={selectedHeading === heading ? "text.white" : "text.subtextPlaceholder.dark"}
                        onClick={() => setSelectedHeading(heading)}
                        transition="color 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                        {heading}
                    </Text>
                ))}
            </Flex>
        </Flex>
    )
}

export default ArticleTOC