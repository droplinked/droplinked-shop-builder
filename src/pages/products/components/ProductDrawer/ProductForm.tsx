import { useDisclosure } from '@chakra-ui/react'
import CircleRecordModal from 'components/modals/circle-record-modal/CircleRecordModal'
import { Form, Formik, FormikProvider } from 'formik'
import useProductSubmission from 'pages/products/hooks/useProductSubmission'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import { initialValues, validationSchema } from 'pages/products/utils/formSchema'
import { ProductFormValues } from 'pages/products/utils/types'
import React from 'react'
import { useQueryClient } from 'react-query'
import FormContent from './FormContent'
import ProductDrawerFooter from './ProductDrawerFooter'
import ProductDrawerHeader from './ProductDrawerHeader'

interface Props {
    onDrawerClose: () => void
}

function ProductForm({ onDrawerClose }: Props) {
    const queryClient = useQueryClient()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const selectedProductType = useProductPageStore(s => s.selectedProductType)

    const { handleSubmit, selectedChain, recordProduct } = useProductSubmission({
        closeProductFormDrawer: onDrawerClose,
        openCircleModal: onOpen,
        closeCircleModal: handleCircleModalClose
    })

    const formInitialValues: ProductFormValues = {
        ...initialValues,
        product_type: selectedProductType
    }

    function handleCircleModalClose() {
        onClose()
        onDrawerClose()
        queryClient.invalidateQueries(["PRODUCTS"])
    }

    return (
        <>
            <Formik
                initialValues={formInitialValues}
                validationSchema={validationSchema}
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