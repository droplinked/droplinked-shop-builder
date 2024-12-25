import PageGrid from 'components/redesign/page-grid/PageGrid'
import React from 'react'
import RightContent from './PageHeaderRightContent/RightContent'

interface ProductHeaderProps {
    onImportModalOpen: () => void
    onReorderModalOpen: () => void
}

function PageHeader({ onImportModalOpen, onReorderModalOpen }: ProductHeaderProps) {
    return (
        <PageGrid.Header
            title="Products"
            description="Manage products all in one place. Easily create, view, and track them here."
            rightContent={
                <RightContent
                    onImportModalOpen={onImportModalOpen}
                    onReorderModalOpen={onReorderModalOpen}
                />
            }
        />
    )
}

export default PageHeader