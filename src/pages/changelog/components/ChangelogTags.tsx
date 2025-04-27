import { Flex } from '@chakra-ui/react'
import { TagMd } from 'assets/icons/Finance/Tag/TagMd'
import React from 'react'
import ChangelogBadge from './ChangelogBadge'
import SectionHeader from './Sectionheader'

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
            <SectionHeader
                icon={<TagMd color='#fff' />}
                title="Tags"
            />

            {renderTags()}
        </Flex>
    )
}

export default ChangelogTags