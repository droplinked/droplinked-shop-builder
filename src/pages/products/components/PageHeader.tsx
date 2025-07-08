import { DownloadMd } from 'assets/icons/Action/Download/DownloadMd'
import { Verticalmove2Md } from 'assets/icons/Navigation/VerticalMove2/Verticalmove2Md'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import React from 'react'
import ProductTypeSelector from './ProductTypeSelector/ProductTypeSelector'

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
                    leftIcon: <Verticalmove2Md />,
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
                    leftIcon: <DownloadMd />,
                    variant: "secondary",
                    fontSize: 14,
                    fontWeight: 500,
                    iconSpacing: "6px",
                    paddingInline: "14px",
                    onClick: onImportModalOpen,
                },
                {
                    title: "New Product",
                    leftIcon: <PlusMd />,
                    wrapper: <ProductTypeSelector />
                },
            ]}
        />
    )
}

export default PageHeader