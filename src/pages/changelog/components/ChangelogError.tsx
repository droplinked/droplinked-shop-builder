import PageGrid from 'components/redesign/page-grid/PageGrid'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

interface ChangelogErrorProps {
    error: unknown
}

export function ChangelogError({ error }: ChangelogErrorProps) {
    const { t } = useLocaleResources('changelogPage')

    return (
        <PageGrid.Root>
            <PageGrid.Header
                title={t('error.title')}
                description={t('error.description')}
            />
        </PageGrid.Root>
    )
} 