import { ModalBody } from '@chakra-ui/react'
import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import AppModal from 'components/redesign/modal/AppModal'
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData'
import useInvalidateProductsQuery from 'hooks/products/useInvalidateProducts'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { getAllProductsService } from 'services/product/productServices'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import ProductList from './ProductList'
import ProductReorderLoading from './ProductReorderLoading'
import localeEn from 'locales/products/en.json'
import localeAr from 'locales/products/ar.json'

interface Props {
    isOpen: boolean
    onClose: () => void
}

function ProductReorderModal({ isOpen, onClose }: Props) {
    const { t } = useLocaleResources('products',{ en:localeEn , ar:localeAr});
    const [products, setProducts] = useState([])
    const [initialProducts, setInitialProducts] = useState([])
    const { invalidateProductsQuery } = useInvalidateProductsQuery()
    const { showToast } = useAppToast()

    const { isFetching } = useQuery({
        queryFn: getAllProductsService,
        onSuccess: (data) => {
            setProducts(data.data)
            setInitialProducts(data.data)
        },
        onError: () => {
            showToast({ type: 'error', message: t('common:error') })
            onClose()
        }
    })

    function handleCloseModal() {
        const hasOrderChanged = products.some((product, index) => product._id !== initialProducts[index]?._id)
        if (hasOrderChanged) invalidateProductsQuery()
        onClose()
    }

    return (
        <AppModal
            modalRootProps={{ isOpen, onClose: handleCloseModal, size: '2xl' }}
            modalContentProps={{ width: '600px', gap: 0, paddingBlock: 0 }}
        >
            <ModalHeaderData
                icon={<BoxLg color="white" />}
                title={t('ProductReorderModal.title')}
                description={t('ProductReorderModal.description')}
                modalHeaderProps={{
                    bgColor: '#141414',
                    paddingBlock: { lg: '48px !important', md: '32px !important', base: '16px !important' },
                    paddingBottom: { lg: '36px !important', md: '32px !important', base: '16px !important' }
                }}
            />
            <ModalBody padding="0px !important">
                {
                    isFetching
                        ? <ProductReorderLoading />
                        : <ProductList products={products} setProducts={setProducts} />
                }
            </ModalBody>
        </AppModal>
    )
}

export default ProductReorderModal