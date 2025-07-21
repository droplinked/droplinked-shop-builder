import AppIcons from 'assets/icon/Appicons'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import ProductDetails from './ProductDetails'

function ModalHeader({ product }: { product: any }) {
    const { t } = useLocaleResources('products');
    return (
        <ModalHeaderData
            icon={<AppIcons.HeaderProductBox />}
            title={t('DropInfoModal.title')}
            modalHeaderProps={{
                bgColor: "#141414",
                paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" },
                paddingBottom: { lg: "36px !important", md: "32px !important", base: "16px !important" }
            }}
        >
            <ProductDetails product={product} />
        </ModalHeaderData>
    )
}

export default ModalHeader