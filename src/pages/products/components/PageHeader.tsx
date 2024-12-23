import PageGrid from 'components/redesign/page-grid/PageGrid'
import React from 'react'
import RightContent from './PageHeaderRightContent/RightContent'

interface ProductHeaderProps {
    handleProductTypeSelection: (productType: string) => void
    onImportModalOpen: () => void
    onReorderModalOpen: () => void
}

function PageHeader({ handleProductTypeSelection, onImportModalOpen, onReorderModalOpen }: ProductHeaderProps) {
    return (
        <PageGrid.Header
            title="Products"
            description="Manage products all in one place. Easily create, view, and track them here."
            rightContent={
                <RightContent
                    onImportModalOpen={onImportModalOpen}
                    handleProductTypeSelection={handleProductTypeSelection}
                    onReorderModalOpen={onReorderModalOpen}
                />
            }
        />
    )
}

export default PageHeader