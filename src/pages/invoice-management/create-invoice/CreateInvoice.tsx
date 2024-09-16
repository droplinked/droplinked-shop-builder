import { Flex, useDisclosure } from '@chakra-ui/react'
import { Form, Formik, FormikProvider } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import FullScreenLoader from '../components/FullScreenLoader'
import InvoiceDetailsModal from '../components/invoice-details/InvoiceDetailsModal'
import useInvoiceInformation from '../hooks/useInvoiceInformation'
import InvoiceClientDetails from './components/form/InvoiceClientDetails'
import InvoiceProductTable from './components/form/InvoiceProductTable'
import InvoiceSummary from './components/form/InvoiceSummary'
import { InvoiceFormSchema, getInvoiceFormInitialValues, getInvoiceValidationSchema } from './helpers/helpers'
import useCreateInvoice from './hooks/useCreateInvoice'
import useInvoiceStore from './store/invoiceStore'

export default function CreateInvoice() {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { updateCart, resetCart, areAllProductsDigital } = useInvoiceStore()
    const { isInvoiceDataValid, createInvoice, isLoading } = useCreateInvoice({ trigger: "CREATE_BUTTON", onSuccess: onOpen })
    const { invoiceId } = useParams()
    const { data, isFetching } = useInvoiceInformation(invoiceId)

    useEffect(() => {
        return () => { resetCart() }
    }, [resetCart])

    useEffect(() => {
        if (data?._id) updateCart(data)
    }, [data, updateCart])

    if (isFetching) return <FullScreenLoader />

    const handleSubmit = (values: InvoiceFormSchema) => {
        if (!isInvoiceDataValid(values)) return
        createInvoice(values)
    }

    const handleDiscard = () => {
        resetCart()
        navigate("/dashboard/invoice-management")
    }

    const closeInvoiceModal = () => {
        onClose()
        resetCart()
        navigate("/dashboard/invoice-management")
    }

    return (
        <>
            <Formik
                initialValues={getInvoiceFormInitialValues(invoiceId, data)}
                validationSchema={getInvoiceValidationSchema(areAllProductsDigital)}
                validateOnChange={false}
                onSubmit={handleSubmit}
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
                                        <Button type='submit' isLoading={isLoading} isDisabled={isLoading}>{`${invoiceId ? "Update" : "Create"} Invoice`}</Button>
                                        <Button variant='ghost' isDisabled={isLoading} onClick={handleDiscard}>Discard</Button>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Form>
                    </FormikProvider>
                )}
            </Formik>
            {isOpen && <InvoiceDetailsModal isOpen={isOpen} onClose={closeInvoiceModal} />}
        </>
    )
}