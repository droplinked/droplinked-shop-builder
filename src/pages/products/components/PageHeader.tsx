import PageGrid from 'components/redesign/page-grid/PageGrid'
import React from 'react'
import RightContent from './pageHeaderRightContent/RightContent'

interface ProductHeaderProps {
    onProductTypeModalOpen: () => void
    onImportModalOpen: () => void
    onReorderModalOpen: () => void
}

function PageHeader({ onProductTypeModalOpen, onImportModalOpen, onReorderModalOpen }: ProductHeaderProps) {
    return (
        <PageGrid.Header
            title="Products"
            description="Manage products all in one place. Easily create, view, and track them here."
            rightContent={
                <RightContent onImportModalOpen={onImportModalOpen} onProductTypeModalOpen={onProductTypeModalOpen} onReorderModalOpen={onReorderModalOpen} />
            }
        />
    )
}

export default PageHeader