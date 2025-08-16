import { PlusSm } from 'assets/icons/Sign/Plus/PlusSm'
import PageEmptyState from 'components/redesign/page-empty-state/PageEmptyState'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import ProductTypeSelector from '../ProductTypeSelector/ProductTypeSelector'

function EmptyProductList() {
    const { t } = useLocaleResources('products')

    return (
        <PageEmptyState
            image="https://upload-file-droplinked.s3.amazonaws.com/34486d750011c9c70ff3a03fce40a866be649d583f049a1dbfa341c551d8e7f6_or.png"
            imageProps={{ width: '420px', height: '352px', alt: t('EmptyProductList.alt') }}
            title={t('EmptyProductList.description')}
            action={{
                text: t('PageHeader.actions.newProduct'),
                icon: <PlusSm color="#2BCFA1" />,
                onClick: () => { }, // handled by wrapper
                wrapper: (btn) => (
                    <ProductTypeSelector placement="top">
                        {btn}
                    </ProductTypeSelector>
                )
            }}
        />
    )
}

export default EmptyProductList