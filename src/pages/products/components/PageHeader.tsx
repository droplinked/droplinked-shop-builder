import AppIcons from 'assets/icon/Appicons'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import ProductTypesPopover from './PageHeaderRightContent/ProductTypesPopover/ProductTypesPopover'
import enLocale from  'locales/products/en.json'
import arLocale from  'locales/products/ar.json'
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
                    title: t('pageHeader.actions.import'),
                    leftIcon: <AppIcons.Download />,
                    variant: "secondary",
                    fontSize: 14,
                    fontWeight: 500,
                    iconSpacing: "6px",
                    paddingInline: "14px",
                    onClick: onImportModalOpen,
                },
                {
                    title: t('pageHeader.actions.newProduct'),
                    leftIcon: <AppIcons.BlackPlus />,
                    wrapper: <ProductTypesPopover />
                },
            ]}
        />
    )
}

export default PageHeader