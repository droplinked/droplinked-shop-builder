import { useDisclosure } from '@chakra-ui/react'
import CircleRecordModal from 'components/modals/circle-record-modal/CircleRecordModal'
import { Form, Formik, FormikProvider } from 'formik'
import useInvalidateProductsQuery from 'hooks/products/useInvalidateProducts'
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter'
import useProductSubmission from 'pages/products/hooks/useProductSubmission'
import { getFormInitialValues } from 'pages/products/utils/formHelpers'
import { validationSchema } from 'pages/products/utils/formSchema'
import { ProductType } from 'pages/products/utils/types'
import React from 'react'
import DropInfoModal from '../ProductTable/components/drop-info-modal/DropInfoModal'
import FormContent from './FormContent'
import ProductDrawerFooter from './ProductDrawerFooter'
import ProductDrawerHeader from './ProductDrawerHeader'

interface Props {
    selectedProductType: ProductType
    onDrawerClose: () => void
    product?: any
}

function ProductForm({ selectedProductType, onDrawerClose, product }: Props) {
    const { invalidateProductsQuery } = useInvalidateProductsQuery()
    const { convertPrice } = useCurrencyConverter()

    const { isOpen: isDropModalOpen, onOpen: openDropModal, onClose: closeDropModal } = useDisclosure()
    const { isOpen: isCircleModalOpen, onOpen: openCircleModal, onClose: closeCircleModal } = useDisclosure()

    // Hook Integration for form submission and modals
    const { handleSubmit, recordProduct, savedProduct, selectedChain, transactionHash } = useProductSubmission({
        closeProductFormDrawer: onDrawerClose,
        openDropModal,
        openCircleModal,
        closeCircleModal: handleCircleModalClose
    })

    // Handling modal closures and cache invalidation
    function handleDropModalClose() {
        closeDropModal()
        onDrawerClose()
        invalidateProductsQuery()
    }

    function handleCircleModalClose() {
        closeCircleModal()
        onDrawerClose()
        invalidateProductsQuery()
    }

    // Initial values for Formik
    const initialValues = getFormInitialValues({ product, selectedProductType, convertPrice })

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnMount={false}
                context={{ ...initialValues }}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <FormikProvider value={formik}>
                        <Form>
                            <ProductDrawerHeader />
                            <FormContent />
                            <ProductDrawerFooter onClose={onDrawerClose} />
                        </Form>
                    </FormikProvider>
                )}
            </Formik>

            {/* DropInfoModal: Opens only after successful record */}
            {isDropModalOpen && (
                <DropInfoModal
                    product={savedProduct}
                    isOpen={isDropModalOpen}
                    onClose={handleDropModalClose}
                />
            )}

            {/* CircleRecordModal: Opens conditionally for Circle */}
            {isCircleModalOpen && (
                <CircleRecordModal
                    isOpen={isCircleModalOpen}
                    onClose={handleCircleModalClose}
                    selectedChain={selectedChain}
                    recordFunction={recordProduct}
                />
            )}
        </>
    )
}

export default ProductForm