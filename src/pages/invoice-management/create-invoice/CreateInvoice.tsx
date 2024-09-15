import { Flex } from '@chakra-ui/react'
import { Form, Formik, FormikProvider } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../components/Button'
import InvoiceClientDetails from './components/form/InvoiceClientDetails'
import InvoiceProductTable from './components/form/InvoiceProductTable'
import InvoiceSummary from './components/form/InvoiceSummary'
import useCreateInvoice from './hooks/useCreateInvoice'
import useInvoiceStore, { InvoiceFormSchema } from './store/invoiceStore'

export default function CreateInvoice() {
    const { resetCart, areAllProductsDigital } = useInvoiceStore()
    const navigate = useNavigate()
    const { createInvoice, isLoading } = useCreateInvoice()

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        note: Yup.string(),
        address: Yup.object().shape({
            firstName: Yup.string().when([], {
                is: () => !areAllProductsDigital,
                then: schema => schema.required("First Name is required"),
                otherwise: schema => schema
            }),
            lastName: Yup.string().when([], {
                is: () => !areAllProductsDigital,
                then: schema => schema.required("Last Name is required"),
                otherwise: schema => schema
            }),
            addressLine1: Yup.string().when([], {
                is: () => !areAllProductsDigital,
                then: schema => schema.required("Address Line 1 is required"),
                otherwise: schema => schema
            }),
            addressLine2: Yup.string(),
            country: Yup.string().when([], {
                is: () => !areAllProductsDigital,
                then: schema => schema.required("Country is required"),
                otherwise: schema => schema
            }),
            city: Yup.string().when([], {
                is: () => !areAllProductsDigital,
                then: schema => schema.required("City is required"),
                otherwise: schema => schema
            }),
            state: Yup.string().when([], {
                is: () => !areAllProductsDigital,
                then: schema => schema.required("State is required"),
                otherwise: schema => schema
            }),
            zip: Yup.string().when([], {
                is: () => !areAllProductsDigital,
                then: schema => schema.required("Zip Code is required"),
                otherwise: schema => schema
            }),
            addressType: Yup.string(),
            phoneNumber: Yup.string().when([], {
                is: () => !areAllProductsDigital,
                then: schema => schema.required("Phone Number is required"),
                otherwise: schema => schema
            })
        })
    })

    const initialValues: InvoiceFormSchema = {
        email: '',
        note: '',
        address: {
            firstName: '',
            lastName: '',
            addressLine1: '',
            addressLine2: '',
            country: 'United States',
            city: 'Los Alamitos',
            state: 'California',
            zip: '',
            addressType: 'CUSTOMER',
            phoneNumber: '+14155552671'
        }
    }

    const handleDiscard = () => {
        resetCart()
        navigate("/dashboard/invoice-management")
    }

    useEffect(() => {
        return () => { resetCart() }
    }, [resetCart])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={(values) => createInvoice({ trigger: "CREATE_BUTTON", formData: values })}
        >
            {formik => (
                <FormikProvider value={formik}>
                    <Form>
                        <Flex direction={{ base: "column", lg: "row" }} gap={6}>
                            <Flex flex={1} direction={"column"} gap={"inherit"}>
                                <InvoiceProductTable />
                                <InvoiceClientDetails />
                            </Flex>

                            <Flex direction={"column"} gap={6}>
                                <InvoiceSummary />
                                <Flex direction={"column"} gap={4}>
                                    <Button type='submit' isLoading={isLoading} isDisabled={isLoading}>Create Invoice</Button>
                                    <Button variant='ghost' isDisabled={isLoading} onClick={handleDiscard}>Discard</Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Form>
                </FormikProvider>
            )}
        </Formik>
    )
}