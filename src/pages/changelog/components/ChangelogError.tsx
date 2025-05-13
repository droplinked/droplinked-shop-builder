import PageGrid from 'components/redesign/page-grid/PageGrid'
import React from 'react'

interface ChangelogErrorProps {
    error: unknown
}

export function ChangelogError({ error }: ChangelogErrorProps) {
    return (
        <PageGrid.Root>
            <PageGrid.Header
                title='Error'
                description={error instanceof Error ? error.message : 'Something went wrong. Please try again later.'}
            />
        </PageGrid.Root>
    )
} 