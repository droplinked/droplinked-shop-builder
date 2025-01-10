import { useDisclosure } from '@chakra-ui/react'
import CircleRecordModal from 'components/modals/circle-record-modal/CircleRecordModal'
import { Form, Formik, FormikProvider } from 'formik'
import useInvalidateProductsQuery from 'functions/hooks/products/useInvalidateProducts'
import useProductSubmission from 'pages/products/hooks/useProductSubmission'
import { getFormInitialValues } from 'pages/products/utils/formHelpers'
import { validationSchema } from 'pages/products/utils/formSchema'
import { ProductType } from 'pages/products/utils/types'
import React from 'react'
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
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { handleSubmit, selectedChain, recordProduct } = useProductSubmission({
        closeProductFormDrawer: onDrawerClose,
        openCircleModal: onOpen,
        closeCircleModal: handleCircleModalClose
    })

    function handleCircleModalClose() {
        onClose()
        onDrawerClose()
        invalidateProductsQuery()
    }

    const initialValues = getFormInitialValues({ product, selectedProductType })

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                context={{ product_type: initialValues.product_type }}
                validateOnChange={false}
                validateOnBlur={false}
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

            {isOpen && (
                <CircleRecordModal
                    isOpen={isOpen}
                    onClose={handleCircleModalClose}
                    selectedChain={selectedChain}
                    recordFunction={recordProduct}
                />
            )}
        </>
    )
}

export default ProductForm