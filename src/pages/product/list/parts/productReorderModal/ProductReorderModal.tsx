import { Flex } from '@chakra-ui/react';
import AppModal from 'components/common/modal/AppModal';
import useAppToast from 'functions/hooks/toast/useToast';
import { getAllProductsService } from 'lib/apis/product/productServices';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from './components/Loading';
import ModalHeader from './components/ModalHeader';
import ProductList from './components/ProductList';

interface Props {
    isOpen: boolean;
    close: () => void;
}

function ProductReorderModal({ isOpen, close }: Props) {
    const [products, setProducts] = useState([])
    const { showToast } = useAppToast()
    const { isFetching } = useQuery({
        queryFn: getAllProductsService,
        onSuccess: (data) => setProducts(data.data),
        onError: () => {
            showToast({ type: "error", message: "Something went wrong!" })
            close()
        }
    })

    return (
        <AppModal
            open={isOpen}
            close={close}
            size="3xl"
            isCentered={false}
            contentProps={{ paddingX: 3, paddingY: 6 }}
        >
            <Flex flexDirection="column" gap={9}>
                <ModalHeader />
                {isFetching ?
                    <Loading /> :
                    <ProductList products={products} setProducts={setProducts} />
                }
            </Flex>
        </AppModal>
    )
}

export default ProductReorderModal