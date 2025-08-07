import { Form, Formik, FormikProvider } from 'formik'
import React from 'react'
import FormContent from './FormContent'
import ShippingProfileDrawerHeader from './ShippingProfileDrawerHeader'
import ShippingProfileDrawerFooter from './ShippingProfileDrawerFooter'

interface Props {
    onDrawerClose: () => void
    shippingProfile?: any
}

const ShippingProfileForm = ({ onDrawerClose, shippingProfile }: Props) => {
    const initialValues = shippingProfile || {
        name: '',
        zones: [],
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, helpers) => {
                console.log('Submitting Shipping Profile', values)
                helpers.setSubmitting(false)
                onDrawerClose()
            }}
        >
            {formik => (
                <FormikProvider value={formik}>
                    <Form>
                        <ShippingProfileDrawerHeader isEditing={!!shippingProfile} />
                        <FormContent />
                        <ShippingProfileDrawerFooter
                            onClose={onDrawerClose}
                            isSubmitting={formik.isSubmitting}
                            isEditing={!!shippingProfile}
                        />
                    </Form>
                </FormikProvider>
            )}
        </Formik>
    )
}

export default ShippingProfileForm
