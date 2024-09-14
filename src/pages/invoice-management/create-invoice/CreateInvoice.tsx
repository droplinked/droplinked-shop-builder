import { Flex } from '@chakra-ui/react'
import { Formik, FormikProvider } from 'formik'
import React, { useEffect } from 'react'
import * as Yup from 'yup'
import Button from '../components/Button'
import SectionedContent from './components/SectionedContent'
import InvoiceAddress from './components/form/InvoiceAddress'
import InvoiceContactInformation from './components/form/InvoiceContactInformation'
import InvoiceProductTable from './components/form/InvoiceProductTable'
import InvoiceShippingMethods from './components/form/InvoiceShippingMethods'
import InvoiceSummary from './components/form/InvoiceSummary'
import useInvoiceStore, { Cart, InvoiceFormSchema } from './store/invoiceStore'

export default function CreateInvoice() {
    const updateCart = useInvoiceStore((state) => state.updateCart)
    const areAllProductsDigital = useInvoiceStore((state) => state.areAllProductsDigital)

    const initialValues: InvoiceFormSchema = {
        email: '',
        address: {
            firstName: '',
            lastName: '',
            addressLine1: '',
            addressLine2: '',
            country: '',
            city: '',
            state: '',
            zip: '',
            addressType: 'CUSTOMER',
            phoneNumber: ''
        }
    }

    const handleSubmit = (values) => {
        console.log('Form submitted:', values)
    }

    useEffect(() => {
        return () => { updateCart({} as Cart) }
    }, [updateCart])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {formik => (
                <FormikProvider value={formik}>
                    <Flex direction={{ base: "column", lg: "row" }} gap={6}>
                        <Flex flex={1} direction={"column"} gap={"inherit"}>
                            <InvoiceProductTable />

                            <SectionedContent title="Client Details">
                                <InvoiceContactInformation />
                                {!areAllProductsDigital && <InvoiceAddress />}
                                {!areAllProductsDigital && <InvoiceShippingMethods />}
                            </SectionedContent>
                        </Flex>

                        <Flex direction={"column"} gap={6}>
                            <InvoiceSummary />
                            <Button type='submit'>Create Invoice</Button>
                        </Flex>
                    </Flex>
                </FormikProvider>
            )}
        </Formik>
    )
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    address: Yup.object().shape({
        firstName: Yup.string(),
        lastName: Yup.string(),
        addressLine1: Yup.string(),
        addressLine2: Yup.string(),
        country: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        zip: Yup.string(),
        addressType: Yup.string(),
        phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Must be exactly 10 digits')
    })
})