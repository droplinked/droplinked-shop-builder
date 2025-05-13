import AppIcons from 'assets/icon/Appicons'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import React from 'react'
import ProductTypesPopover from './PageHeaderRightContent/ProductTypesPopover/ProductTypesPopover'

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
            actionButtons={[
                {
                    title: "Reorder Products",
                    leftIcon: <AppIcons.VerticalMove />,
                    variant: "secondary",
                    fontSize: 14,
                    fontWeight: 500,
                    iconSpacing: "6px",
                    paddingInline: "14px",
                    onClick: onReorderModalOpen,
                    isDisabled: !isActionEnabled,
                },
                {
                    title: "Import",
                    leftIcon: <AppIcons.Download />,
                    variant: "secondary",
                    fontSize: 14,
                    fontWeight: 500,
                    iconSpacing: "6px",
                    paddingInline: "14px",
                    onClick: onImportModalOpen,
                },
                {
                    title: "New Product",
                    leftIcon: <AppIcons.BlackPlus />,
                    wrapper: <ProductTypesPopover />
                },
            ]}
        />
    )
}

export default PageHeader