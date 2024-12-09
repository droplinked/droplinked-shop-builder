import { Form, Formik, FormikProvider } from 'formik'
import { initialValues, ProductFormValues, validationSchema } from 'pages/products/utils/formSchema'
import React from 'react'
import DrawerFooter from './components/Drawer/DrawerFooter'
import DrawerHeader from './components/Drawer/DrawerHeader'
import DrawerRoot from './components/Drawer/DrawerRoot'
import FormContent from './components/FormContent'

interface Props {
    isOpen: boolean
    onClose: () => void
}

function ProductDrawer({ isOpen, onClose }: Props) {
    const handleSubmit = (values: ProductFormValues) => {
        const action = values.action
        console.log(action)
    }

    return (
        <DrawerRoot isOpen={isOpen} onClose={onClose}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnChange={false}
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