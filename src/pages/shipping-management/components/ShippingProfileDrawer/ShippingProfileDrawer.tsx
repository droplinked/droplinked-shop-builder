import { Form, Formik, FormikProvider } from 'formik'
import React from 'react'
import ShippingDrawer from '../common/ShippingDrawer'
import FormContent from './FormContent'

interface Props {
    isOpen: boolean
    onClose: () => void
    shippingProfile?: any
}

const ShippingProfileDrawer = ({ isOpen, onClose, shippingProfile }: Props) => {
    const isEditing = !!shippingProfile
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
                onClose()
            }}
        >
            {formik => (
                <FormikProvider value={formik}>
                    <ShippingDrawer isOpen={isOpen} onClose={onClose}>
                        <ShippingDrawer.Header title={isEditing ? 'Edit Shipping Profile' : 'Create Shipping Profile'} />
                        <ShippingDrawer.Body>
                            <Form>
                                <FormContent />
                            </Form>
                        </ShippingDrawer.Body>
                        <ShippingDrawer.Footer
                            primaryText={isEditing ? 'Update Profile' : 'Create Profile'}
                            secondaryText="Discard"
                            onPrimary={() => formik.submitForm()}
                            onSecondary={onClose}
                            primaryButtonProps={{ isLoading: formik.isSubmitting }}
                        />
                    </ShippingDrawer>
                </FormikProvider>
            )}
        </Formik>
    )
}

export default ShippingProfileDrawer
