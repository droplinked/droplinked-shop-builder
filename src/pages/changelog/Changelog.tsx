import PageGrid from 'components/redesign/page-grid/PageGrid'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React from 'react'
import ChangelogEntry from './components/ChangelogEntry'

function Changelog() {
    // const { } = useChangelogEntry()

    return (
        <PageGrid.Root>
            <PageGrid.Header
                title='Updates and Releases'
                description='Learn more about the latest features and improvements.'
            />
            <RuledGrid
                width="full"
                columns={1}
                nested
                borderTop="1px solid"
                borderColor="neutral.gray.800"
            >
                <ChangelogEntry />
                <ChangelogEntry />
                <ChangelogEntry />
                <ChangelogEntry />
                <ChangelogEntry />
            </RuledGrid>
        </PageGrid.Root>
    )
}

export default Changelog