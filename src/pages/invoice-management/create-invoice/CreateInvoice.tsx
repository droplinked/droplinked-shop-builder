import { Flex, useDisclosure } from '@chakra-ui/react'
import { Form, Formik, FormikProvider } from 'formik'
import useAppToast from 'functions/hooks/toast/useToast'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import FullScreenLoader from '../components/FullScreenLoader'
import InvoiceDetailsModal from '../components/invoice-details/InvoiceDetailsModal'
import useInvoiceInformation from '../hooks/useInvoiceInformation'
import InvoiceClientDetails from './components/form/InvoiceClientDetails'
import InvoiceProductTable from './components/form/InvoiceProductTable'
import InvoiceSummary from './components/form/InvoiceSummary'
import { InvoiceFormSchema, findSelectedShippingMethod, getInvoiceFormInitialValues, getInvoiceValidationSchema } from './helpers/helpers'
import useCreateInvoice from './hooks/useCreateInvoice'
import useInvoiceStore from './store/invoiceStore'

export default function CreateInvoice() {
    const navigate = useNavigate()
    const { invoiceId } = useParams()
    const { isOpen, onOpen: openInvoiceDetailsModal, onClose: closeInvoiceDetailsModal } = useDisclosure()
    const { updateCart, resetCart, isAddressSwitchToggled, updateShippingMethod, isEditMode, updateIsEditMode } = useInvoiceStore()
    const { isInvoiceDataValid, createInvoice, updateInvoice, isLoading } = useCreateInvoice({ trigger: "CREATE_BUTTON", onSuccess: openInvoiceDetailsModal })
    const { data, isFetching } = useInvoiceInformation(invoiceId)
    const { showToast } = useAppToast()

    useEffect(() => {
        return () => { resetCart() }
    }, [resetCart])

    useEffect(() => {
        if (invoiceId && data?._id) {
            if (data.status !== "ACTIVE") {
                showToast({ message: "You cannot edit an invoice that is not active", type: "error" })
                navigate("/dashboard/invoice-management")
                return
            }
            updateCart(data)
            updateIsEditMode(true)
            const selectedShippingGroup = findSelectedShippingMethod(data.shippings)
            if (selectedShippingGroup) updateShippingMethod(selectedShippingGroup)
        }
    }, [invoiceId, data, updateCart, updateIsEditMode])

    if (isFetching) return <FullScreenLoader />

    const handleSubmit = (values: InvoiceFormSchema) => {
        if (!isInvoiceDataValid(values)) return
        isEditMode ? updateInvoice(values) : createInvoice(values)
    }

    const handleDiscard = () => {
        resetCart()
        navigate("/dashboard/invoice-management")
    }

    const closeInvoiceModal = () => {
        closeInvoiceDetailsModal()
        resetCart()
        navigate("/dashboard/invoice-management")
    }

    return (
        <>
            <Formik
                initialValues={getInvoiceFormInitialValues(invoiceId, data)}
                validationSchema={getInvoiceValidationSchema(isAddressSwitchToggled)}
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