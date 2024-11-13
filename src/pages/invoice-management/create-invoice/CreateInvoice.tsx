import { Flex, useDisclosure } from '@chakra-ui/react'
import FullScreenLoading from 'components/redesign/fullscreen-loading/FullScreenLoading'
import { Form, Formik, FormikProvider } from 'formik'
import useAppToast from 'functions/hooks/toast/useToast'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import InvoiceDetailsModal from '../components/invoice-details/InvoiceDetailsModal'
import useInvoiceInformation from '../hooks/useInvoiceInformation'
import InvoiceClientDetails from './components/form/InvoiceClientDetails'
import InvoiceSummary from './components/form/InvoiceSummary'
import { InvoiceFormSchema, findSelectedShippingMethod, getInvoiceFormInitialValues, getInvoiceValidationSchema } from './helpers/helpers'
import useCreateInvoice from './hooks/useCreateInvoice'
import useInvoiceStore from './store/invoiceStore'
import InvoiceProductTable from './components/form/product-table/InvoiceProductTable'

export default function CreateInvoice() {
    const navigate = useNavigate()
    const { invoiceId } = useParams()
    const { isOpen, onOpen: openInvoiceDetailsModal, onClose: closeInvoiceDetailsModal } = useDisclosure()
    const { updateCart, resetCart, updateIsAddressSwitchToggled, isAddressSwitchToggled, updateShippingMethod, isEditMode, updateIsEditMode } = useInvoiceStore()
    const { isInvoiceDataValid, createInvoice, updateInvoice, isLoading } = useCreateInvoice({ trigger: "CREATE_BUTTON", onSuccess: openInvoiceDetailsModal })
    const { data, isFetching } = useInvoiceInformation(invoiceId)
    const { showToast } = useAppToast()

    // This is used to reset cart when user navigates away
    useEffect(() => {
        return () => resetCart()
    }, [resetCart])

    // This is used to handle edit mode
    useEffect(() => {
        if (invoiceId && data?._id) {
            if (data.status !== "ACTIVE") {
                showToast({ message: "You cannot edit an invoice that is not active", type: "error" })
                navigate("/analytics/invoice-management")
                return
            }
            updateCart(data)
            updateIsEditMode(true)

            if (data.address?._id) updateIsAddressSwitchToggled(true)

            const selectedShippingGroup = findSelectedShippingMethod(data.shippings)
            if (selectedShippingGroup) updateShippingMethod(selectedShippingGroup)
        }
    }, [invoiceId, data, updateCart, updateIsEditMode])

    if (isFetching) return <FullScreenLoading />

    const handleSubmit = (values: InvoiceFormSchema) => {
        if (!isInvoiceDataValid(values)) return
        isEditMode ? updateInvoice(values) : createInvoice(values)
    }

    const handleDiscard = () => {
        resetCart()
        navigate("/analytics/invoice-management")
    }

    const closeInvoiceModal = () => {
        closeInvoiceDetailsModal()
        resetCart()
        navigate("/analytics/invoice-management")
    }

    return (
        <>
            <Formik
                initialValues={getInvoiceFormInitialValues(data)}
                validationSchema={getInvoiceValidationSchema(isAddressSwitchToggled)}
                validateOnChange={false}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <FormikProvider value={formik}>
                        <Form>
                            <Flex direction={{ base: "column", lg: "row" }} gap={6}>
                                <Flex flex={1} direction="column" gap="inherit">
                                    <InvoiceProductTable />
                                    <InvoiceClientDetails />
                                </Flex>

                                <Flex direction="column" gap={6}>
                                    <InvoiceSummary />
                                    <Flex direction="column" gap={4}>
                                        <Button type='submit' isLoading={isLoading} isDisabled={isLoading}>{`${invoiceId ? "Update" : "Create"} Invoice`}</Button>
                                        <Button type='button' variant='ghost' isDisabled={isLoading} onClick={handleDiscard}>Discard</Button>
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