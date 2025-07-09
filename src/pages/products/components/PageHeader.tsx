import { DownloadMd } from 'assets/icons/Action/Download/DownloadMd'
import { Verticalmove2Md } from 'assets/icons/Navigation/VerticalMove2/Verticalmove2Md'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import enLocale from  'locales/products/en.json'
import arLocale from  'locales/products/ar.json'
import ProductTypeSelector from './ProductTypeSelector/ProductTypeSelector'

interface ProductHeaderProps {
    onImportModalOpen: () => void
    onReorderModalOpen: () => void
    isActionEnabled: boolean
}

function PageHeader({ onImportModalOpen, onReorderModalOpen, isActionEnabled }: ProductHeaderProps) {
    
    const { t } = useLocaleResources('products', {
        en: enLocale,
        ar: arLocale
      });

    return (
        <PageGrid.Header
            title={t('pageHeader.title')}
            description={t('pageHeader.description')}
            actionButtons={[
                {
                    title: t('pageHeader.actions.reorderProducts'),
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
                    title: t('pageHeader.actions.import'),
                    leftIcon: <DownloadMd />,
                    variant: "secondary",
                    fontSize: 14,
                    fontWeight: 500,
                    iconSpacing: "6px",
                    paddingInline: "14px",
                    onClick: onImportModalOpen,
                },
                {
                    title: t('pageHeader.actions.newProduct'),
                    leftIcon: <PlusMd />,
                    wrapper: <ProductTypeSelector />
                },
            ]}
        />
    )
}

export default PageHeader