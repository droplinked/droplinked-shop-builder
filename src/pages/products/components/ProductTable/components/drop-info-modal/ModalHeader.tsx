import AppIcons from 'assest/icon/Appicons'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import React from 'react'
import ProductDetails from './ProductDetails'

function ModalHeader({ product }: { product: any }) {
    return (
        <ModalHeaderData
            icon={<AppIcons.HeaderProductBox />}
            title='Drop Information'
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