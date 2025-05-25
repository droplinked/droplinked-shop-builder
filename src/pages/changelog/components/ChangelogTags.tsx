import { Flex } from '@chakra-ui/react'
import { TagMd } from 'assets/icons/Finance/Tag/TagMd'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { ChangelogEntry } from 'lib/apis/changelog/interfaces'
import React from 'react'
import ChangelogBadge from './ChangelogBadge'
import SectionHeader from './SectionHeader'

interface Props {
    changelogItem: ChangelogEntry
    withHeading?: boolean
}

function ChangelogTags({ changelogItem, withHeading }: Props) {
    const { t } = useLocaleResources('changelogPage')

    const tags = changelogItem.tags

    if (!tags.length) return null

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
                title={t('tags')}
            />

            {renderTags()}
        </Flex>
    )
}

export default ChangelogTags