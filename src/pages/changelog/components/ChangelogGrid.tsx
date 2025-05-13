import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React from 'react'

interface Props {
    children: React.ReactNode
}

export function ChangelogGrid({ children }: Props) {
    return (
        <RuledGrid
            width="full"
            columns={1}
            nested
            borderTop="1px solid"
            borderColor="neutral.gray.800"
        >
            {children}
        </RuledGrid>
    )
} 