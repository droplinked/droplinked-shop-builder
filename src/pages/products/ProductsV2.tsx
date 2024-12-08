import { Form, Formik, FormikProvider } from 'formik'
import React from 'react'
import ProductPageLayout from './components/ProductPageLayout/ProductPageLayout'

function ProductsV2() {
    const handleSubmit = (values: any) => {

    }

    return (
        <Formik
            initialValues={{}}
            validationSchema={{}}
            validateOnChange={false}
            onSubmit={handleSubmit}
        >
            {formik =>
                <FormikProvider value={formik}>
                    <Form>
                        <ProductPageLayout />
                    </Form>
                </FormikProvider>
            }
        </Formik>
    )
}

export default ProductsV2