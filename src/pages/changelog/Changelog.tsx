import PageGrid from 'components/redesign/page-grid/PageGrid'
import useIntersectionObserver from 'hooks/intersection-observer/useIntersectionObserver'
import React from 'react'
import ChangelogEntryCard from './components/ChangelogEntryCard'
import { ChangelogEntryLoading } from './components/ChangelogEntryLoading'
import { ChangelogError } from './components/ChangelogError'
import { ChangelogGrid } from './components/ChangelogGrid'
import useChangelogEntries from './hooks/useChangelogEntries'

function Changelog() {
    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, isError, error } = useChangelogEntries()
    const entries = data?.pages?.flatMap(page => page.data.data) ?? []

    const lastEntryObserver = useIntersectionObserver<HTMLDivElement>(() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage()
    }, [hasNextPage, isFetchingNextPage])

    if (isError) return <ChangelogError error={error} />

    return (
        <PageGrid.Root>
            <PageGrid.Header
                title='Updates and Releases'
                description='Learn more about the latest features and improvements.'
            />
            {entries.length === 0 && isFetching
                ? <ChangelogEntryLoading count={3} />
                : (
                    <ChangelogGrid>
                        {entries.map((entry, index) => (
                            <ChangelogEntryCard
                                key={entry._id}
                                entry={entry}
                                ref={index === entries.length - 1 ? lastEntryObserver : undefined}
                            />
                        ))}
                        {isFetchingNextPage && <ChangelogEntryLoading count={3} />}
                    </ChangelogGrid>
                )}
        </PageGrid.Root>
    )
}

export default Changelog