import PageGrid from 'components/redesign/page-grid/PageGrid'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

export function ChangelogError() {
    const { t } = useLocaleResources('changelogPage')

    return (
        <PageGrid.Root>
            <PageGrid.Header
                title={t('ChangelogError.title')}
                description={t('common:genericError')}
            />
        </PageGrid.Root>
    )
} 