import { Form, Formik, FormikProvider } from 'formik'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import { initialValues, validationSchema } from 'pages/products/utils/formSchema'
import { ProductFormValues } from 'pages/products/utils/types'
import React from 'react'
import FormContent from './FormContent'
import ProductDrawerFooter from './ProductDrawerFooter'
import ProductDrawerHeader from './ProductDrawerHeader'

interface Props {
    onClose: () => void
}

function ProductForm({ onClose }: Props) {
    const { selectedProductType, resetProductPageState } = useProductPageStore(s => ({
        selectedProductType: s.selectedProductType,
        resetProductPageState: s.resetProductPageState
    }))

    const formInitialValues: ProductFormValues = {
        ...initialValues,
        product_type: selectedProductType,
    }

    const handleSubmit = (values: ProductFormValues) => {
        console.log(values.action)
    }

    const handleClose = () => {
        resetProductPageState()
        onClose()
    }

    return (
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
                        <ProductDrawerFooter onClose={handleClose} />
                    </Form>
                </FormikProvider>
            )}
        </Formik>
    )
}

export default ProductForm