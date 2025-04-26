import { Flex, Heading } from '@chakra-ui/react'
import { TagMd } from 'assets/icons/Finance/Tag/TagMd'
import React from 'react'
import ChangelogBadge from './ChangelogBadge'

interface Props {
    changelogItem?: any
    withHeading?: boolean
}

function ChangelogTags({ changelogItem, withHeading }: Props) {
    const tags = changelogItem?.tags || ["integration", "new feature", "deprecation", "improvement", "bugfix"]

    const renderTags = () => (
        <Flex flexWrap="wrap" gap={2}>
            {tags.map((item, index) => <ChangelogBadge key={index} label={item} />)}
        </Flex>
    )

    if (!withHeading) return renderTags()

    return (
        <Flex direction="column" gap={4}>
            <Flex alignItems="center" gap={2}>
                <TagMd color='#fff' />
                <Heading as="h3" fontSize={{ base: 16, xl: 18 }} fontWeight={500} color="text.white">
                    Tags
                </Heading>
            </Flex>

            {renderTags()}
        </Flex>
    )
}

export default ChangelogTags