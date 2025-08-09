import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import { Form, Formik, FormikProvider } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import React from 'react'
import { createCustomShippingService } from 'services/custom-shipping/CustomShippingServices'
import * as Yup from 'yup'
import { CreateShippingRequest, SHIPPING_METHOD, Zone } from '../../types/shipping'
import ShippingDrawer from '../common/ShippingDrawer'
import GeneralInformationAccordion from './components/accordions/GeneralInformationAccordion'
import ZonesRatesAccordion from './components/accordions/ZonesRatesAccordion'

interface Props {
    isOpen: boolean
    onClose: () => void
    shippingProfile?: any
}

const ShippingProfileDrawer = ({ isOpen, onClose, shippingProfile }: Props) => {
    const isEditing = !!shippingProfile
    const { showToast } = useAppToast()
    const initialValues: CreateShippingRequest = shippingProfile || {
        name: '',
        zones: [],
    }

    const validationSchema = Yup.object({
        name: Yup.string().trim().required('Profile name is required'),
        zones: Yup.array()
            .of(
                Yup.object({
                    name: Yup.string().trim().required('Zone name is required'),
                    countries: Yup.array().of(Yup.string()).min(1, 'Select at least one country').required(),
                    shippingMethod: Yup.mixed().required(),
                    custom: Yup.object()
                        .shape({
                            type: Yup.string().required('Rate type is required'),
                            rateName: Yup.string().trim().required('Rate name is required'),
                            price: Yup.number().when('type', {
                                is: (val: string) => val === 'flat_rate',
                                then: (schema) => schema.typeError('Price must be a number').required('Price is required').min(0, 'Price cannot be negative'),
                                otherwise: (schema) => schema.notRequired(),
                            }),
                            pricePerWeight: Yup.number().when('type', {
                                is: (val: string) => val === 'weight_based',
                                then: (schema) => schema.typeError('Price per weight must be a number').required('Price per weight is required').min(0, 'Cannot be negative'),
                                otherwise: (schema) => schema.notRequired(),
                            }),
                            pricePerItem: Yup.number().when('type', {
                                is: (val: string) => val === 'item_count_based',
                                then: (schema) => schema.typeError('Price per item must be a number').required('Price per item is required').min(0, 'Cannot be negative'),
                                otherwise: (schema) => schema.notRequired(),
                            }),
                            estimatedDelivery: Yup.object({
                                minDays: Yup.number().typeError('Min days must be a number').required('Required').min(0),
                                maxDays: Yup.number().typeError('Max days must be a number').required('Required').min(Yup.ref('minDays'), 'Max must be >= Min'),
                            }).required('Estimated delivery is required'),
                        })
                        .nullable(),
                })
            )
            .min(1, 'Add at least one zone'),
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnMount={false}
            onSubmit={async (values, helpers) => {
                try {
                    if (!values.zones || values.zones.length === 0) {
                        showToast({ type: 'error', message: 'Please add at least one zone before creating the profile.' })
                        return
                    }

                    // Ensure each zone has required rate data when using custom method
                    const invalidZone = values.zones.find((z: Zone) => z.shippingMethod === SHIPPING_METHOD.CUSTOM && !z.custom)
                    if (invalidZone) {
                        showToast({ type: 'error', message: `Zone "${invalidZone.name}" requires rate details.` })
                        return
                    }

                    helpers.setSubmitting(true)
                    await createCustomShippingService(values)
                    showToast({ type: 'success', message: isEditing ? 'Shipping profile updated' : 'Shipping profile created' })
                    onClose()
                } catch (error: any) {
                    showToast({ type: 'error', message: error?.response?.data?.message || 'Failed to save shipping profile' })
                } finally {
                    helpers.setSubmitting(false)
                }
            }}
        >
            {formik => (
                <FormikProvider value={formik}>
                    <ShippingDrawer isOpen={isOpen} onClose={onClose}>
                        <ShippingDrawer.Header title={isEditing ? 'Edit Shipping Profile' : 'Create Shipping Profile'} />
                        <ShippingDrawer.Body>
                            <Form>
                                <AppAccordion
                                    display="flex"
                                    flexDirection="column"
                                    gap={4}
                                    multiCollapse
                                >
                                    <GeneralInformationAccordion />
                                    <ZonesRatesAccordion />
                                </AppAccordion>
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