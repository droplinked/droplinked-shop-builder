import PageGrid from 'components/redesign/page-grid/PageGrid'
import useIntersectionObserver from 'hooks/intersection-observer/useIntersectionObserver'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/changelog/ar.json'
import enLocale from 'locales/changelog/en.json'
import React from 'react'
import ChangelogEntryCard from './components/ChangelogEntryCard'
import { ChangelogEntryLoading } from './components/ChangelogEntryLoading'
import { ChangelogError } from './components/ChangelogError'
import { ChangelogGrid } from './components/ChangelogGrid'
import useChangelogEntries from './hooks/useChangelogEntries'
import arLocale from './translations/ar.json'
import enLocale from './translations/en.json'

function Changelog() {
    const { t } = useLocaleResources('changelogPage', {
        en: enLocale,
        ar: arLocale
    })
    const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage, isError, error } = useChangelogEntries()
    const entries = data?.pages?.flatMap(page => page.data.data) ?? []

    const lastEntryObserver = useIntersectionObserver<HTMLDivElement>(() => {
        if (hasNextPage) fetchNextPage()
    }, [hasNextPage, fetchNextPage])

    if (isError) return <ChangelogError error={error} />

    return (
        <PageGrid.Root>
            <PageGrid.Header
                title={t('header.title')}
                description={t('header.description')}
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