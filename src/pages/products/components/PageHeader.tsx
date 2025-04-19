import PageGrid from 'components/redesign/page-grid/PageGrid'
import React from 'react'
import RightContent from './PageHeaderRightContent/RightContent'

interface ProductHeaderProps {
    onImportModalOpen: () => void
    onReorderModalOpen: () => void
    isActionEnabled: boolean
}

function PageHeader({ onImportModalOpen, onReorderModalOpen, isActionEnabled }: ProductHeaderProps) {
    return (
        <PageGrid.Header
            title="Products"
            description="Manage products all in one place. Easily create, view, and track them here."
            rightContent={
                <RightContent
                    onImportModalOpen={onImportModalOpen}
                    onReorderModalOpen={onReorderModalOpen}
                    isActionEnabled={isActionEnabled}
                />
            }
        />
    )
}

export default PageHeader