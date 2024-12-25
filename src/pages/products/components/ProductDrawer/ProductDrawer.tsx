import { Form, Formik, FormikProvider } from 'formik'
import { initialValues, validationSchema } from 'pages/products/utils/formSchema'
import { ProductFormValues, ProductType } from 'pages/products/utils/types'
import React from 'react'
import FormContent from './components/FormContent'
import DrawerFooter from './components/common/DrawerFooter'
import DrawerHeader from './components/common/DrawerHeader'
import DrawerRoot from './components/common/DrawerRoot'

interface Props {
    selectedProductType: ProductType
    isOpen: boolean
    onClose: () => void
}

function ProductDrawer({ selectedProductType, isOpen, onClose }: Props) {
    const formInitialValues: ProductFormValues = {
        ...initialValues,
        product_type: selectedProductType,
    }

    const handleSubmit = (values: ProductFormValues) => {
        const action = values.action
        console.log(action)
    }

    return (
        <DrawerRoot isOpen={isOpen} onClose={onClose}>
            <Formik
                initialValues={formInitialValues}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={handleSubmit}
            >
                {formik =>
                    <FormikProvider value={formik}>
                        <Form>
                            <DrawerHeader />
                            <FormContent />
                            <DrawerFooter onClose={onClose} />
                        </Form>
                    </FormikProvider>
                }
            </Formik>
        </DrawerRoot>
    )
}

export default ProductDrawer