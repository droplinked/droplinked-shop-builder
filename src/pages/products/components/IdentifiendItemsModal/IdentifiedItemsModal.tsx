import { DownloadMd } from 'assets/icons/Action/Download/DownloadMd'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import React, { useState } from 'react'
import IdentifiedItemsBody from './IdentifiedItemsBody';
import IdentifiedItemsFooter from './IdentifiedItemsFooter';
import useProductPageStore from 'pages/products/stores/ProductPageStore';
import { UseImportWithUrl } from 'pages/products/hooks/useImportWithUrl';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    importWithUrl: UseImportWithUrl
}

export default function IdentifiedItemsModal({ isOpen, onClose, importWithUrl }: Props) {
    const { crawledProducts } = useProductPageStore();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const { crawlingSelectedLoading, crawlSelectedProducts } = importWithUrl
    const crawledProductsCount = crawledProducts?.length || 0;
    const selectedProductsCount = selectedProducts?.length || 0;

    const handleClick = (url: string) => {
        const newSelectedProducts = selectedProducts.includes(url)
            ? selectedProducts.filter((item) => item !== url)
            : [...selectedProducts, url]

        setSelectedProducts(newSelectedProducts)
    }

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose, size: "6xl", isCentered: true }}
            modalContentProps={{ gap: 0, paddingBlock: 0 }}
        >
            <ModalHeaderData
                icon={<DownloadMd color='#fff' />}
                title="Identified Items"
                description={`The product importer successfully identified ${crawledProductsCount} items.`}
                descriptionProps={{
                    color: "#B1B1B1 !important",
                }}
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" }
                }}
            />
            <IdentifiedItemsBody
                handleClick={handleClick}
                selectedProducts={selectedProducts}
                crawledProduct={crawledProducts}
            />
            <IdentifiedItemsFooter selectedProductsCount={selectedProductsCount} />
        </AppModal>
    )
}
