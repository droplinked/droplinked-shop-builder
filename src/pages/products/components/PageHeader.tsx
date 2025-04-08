import PageGrid from 'components/redesign/page-grid/PageGrid'
import React from 'react'
import RightContent from './PageHeaderRightContent/RightContent'

interface ProductHeaderProps {
    onImportModalOpen: () => void
    onReorderModalOpen: () => void
    productsCount: number
    isActionEnabled: boolean
}

function PageHeader({ onImportModalOpen, onReorderModalOpen, productsCount, isActionEnabled }: ProductHeaderProps) {
    return (
        <PageGrid.Header
            title="Products"
            description="Manage products all in one place. Easily create, view, and track them here."
            rightContent={
                <RightContent
                    onImportModalOpen={onImportModalOpen}
                    onReorderModalOpen={onReorderModalOpen}
                    productsCount={productsCount}
                    isActionEnabled={isActionEnabled}
                />
            }
        />
    )
}

export default PageHeader