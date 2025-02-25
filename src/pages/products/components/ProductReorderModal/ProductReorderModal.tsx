import { ModalBody } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import useInvalidateProductsQuery from 'functions/hooks/products/useInvalidateProducts';
import useAppToast from 'functions/hooks/toast/useToast';
import { getAllProductsService } from 'lib/apis/product/productServices';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import ProductList from './ProductList';
import ProductReorderLoading from './ProductReorderLoading';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

function ProductReorderModal({ isOpen, onClose }: Props) {
    const [products, setProducts] = useState([])
    const { invalidateProductsQuery } = useInvalidateProductsQuery()
    const { showToast } = useAppToast()
    const { isFetching } = useQuery({
        queryFn: getAllProductsService,
        onSuccess: (data) => setProducts(data.data),
        onError: () => {
            showToast({ type: "error", message: "Something went wrong!" })
            onClose()
        }
    })

    const handleCloseModal = () => {
        invalidateProductsQuery()
        onClose()
    }

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose: handleCloseModal, size: "2xl" }}
            modalContentProps={{ width: "600px", gap: 0, paddingBlock: 0 }}
        >
            <ModalHeaderData
                icon={<AppIcons.HeaderProductBox />}
                title='Reorder Products'
                description='Organize products by dragging and dropping them in the order that they should be displayed on the storefront.'
                modalHeaderProps={{
                    bgColor: "#141414",
                    paddingBlock: { lg: "48px !important", md: "32px !important", base: "16px !important" },
                    paddingBottom: { lg: "36px !important", md: "32px !important", base: "16px !important" }
                }}
            />
            <ModalBody padding="0px !important">
                {isFetching ? <ProductReorderLoading /> : <ProductList products={products} setProducts={setProducts} />}
            </ModalBody>
        </AppModal>
    )
}

export default ProductReorderModal