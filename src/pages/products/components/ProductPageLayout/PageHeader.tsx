import AppIcons from 'assest/icon/Appicons'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import React from 'react'

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
            buttons={[
                {
                    caption: "New Product",
                    leftIcon: <AppIcons.BlackPlus />,
                    onClick: onProductTypeModalOpen
                },
                {
                    caption: "Import",
                    variant: "secondary",
                    leftIcon: <AppIcons.Download />,
                    onClick: onImportModalOpen
                },
                {
                    caption: "Reorder Products",
                    variant: "secondary",
                    leftIcon: <AppIcons.VerticalMove />,
                    onClick: onReorderModalOpen
                }
            ]}
        />
    )
}

export default PageHeader