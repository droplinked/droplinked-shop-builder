import { Box, Circle, Flex, FormLabel, useDisclosure, useRadio, useRadioGroup } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { useFormikContext } from 'formik'
import useCreateInvoice from 'pages/invoice-management/create-invoice/hooks/useCreateInvoice'
import useInvoiceStore, { InvoiceFormSchema } from 'pages/invoice-management/create-invoice/store/invoiceStore'
import React from 'react'
import ToggleableSection from '../../ToggleableSection'
import ShippingMethodsLoading from './ShippingMethodsLoading'

export default function InvoiceShippingMethods() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { values, validateForm } = useFormikContext<InvoiceFormSchema>()
    const { isInvoiceDataValid, createInvoice, isLoading } = useCreateInvoice({ trigger: "SHIPPING_METHODS_SWITCH" })
    const { cart, selectedShippingMethod, updateShippingMethod } = useInvoiceStore()
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-payment-method',
        onChange: (shppingMethodId: string) => {
            const shippingGroup = cart.shippings.find(group => group.data.some(method => method.id === shppingMethodId))
            updateShippingMethod({ groupId: shippingGroup.groupId, shipmentId: shppingMethodId })
        },
        value: selectedShippingMethod?.shipmentId,
    })

    const handleToggle = async () => {
        const validationResult = await validateForm()
        if (Object.entries(validationResult).length > 0) return
        if (!isInvoiceDataValid(values)) return
        onOpen()
        createInvoice(values)
    }

    const renderContent = () => {
        if (isLoading) return <ShippingMethodsLoading />
        if (!cart.shippings?.length) return null
        return (
            <Flex direction="column" gap={4} {...getRootProps()}>
                {cart?.shippings.map((shippingGroup) => (
                    shippingGroup.data.map((shippingMethod) => (
                        <ShippingMethodRadio
                            key={shippingMethod.id}
                            method={shippingMethod}
                            {...getRadioProps({ value: shippingMethod.id })}
                        />
                    ))
                ))}
            </Flex>
        )
    }

    return (
        <ToggleableSection
            title='Shipping'
            description='Shipping methods are based on the type of inventory and address on the invoice.'
            isExpanded={isOpen}
            onToggle={isOpen ? onClose : handleToggle}
        >
            {renderContent()}
        </ToggleableSection>
    )
}

function ShippingMethodRadio({ method, ...radioProps }) {
    const { state: { isChecked }, getInputProps, htmlProps, getLabelProps } = useRadio(radioProps)

    return (
        <FormLabel
            margin={0}
            padding={4}
            border={`1.5px solid ${isChecked ? "#2BCFA1" : "#3C3C3C"}`}
            borderRadius={8}
            bgColor={isChecked ? "#2BCFA11A" : "transparent"}
            cursor="pointer"
            userSelect="none"
            sx={{ "p": { fontSize: 14, transition: "inherit" } }}
            {...htmlProps}
            {...getLabelProps()}
        >
            <input {...getInputProps()} hidden />
            <Flex gap={3}>
                <Circle flexShrink={0} size={5} border="1.5px solid" borderColor={isChecked ? "#2BCFA1" : "white"}>
                    <Circle size={2.5} bgColor={isChecked ? "#2BCFA1" : "white"} opacity={isChecked ? 1 : 0} />
                </Circle>
                <Box flex={1}>
                    <Flex alignItems="center" sx={{ "p": { fontWeight: 500, color: "white" } }}>
                        <AppTypography flex={1}>{method.title}</AppTypography>
                        <AppTypography>{method.price}</AppTypography>
                    </Flex>
                    <Flex mt={2} direction={{ base: "column", xl: "row" }} justifyContent="space-between" alignItems={{ base: "normal", xl: "center" }}>
                        <ShippingMethodDetails title="Estimated Delivery" value={method.delivery_estimation} isChecked={isChecked} />
                    </Flex>
                </Box>
            </Flex>
        </FormLabel>
    )
}

function ShippingMethodDetails({ title, value, isChecked }) {
    return (
        <Flex alignItems="center" gap={2}>
            <AppTypography fontWeight={400} color={isChecked ? "white" : "#BCBCBC"}>{title}</AppTypography>
            <Circle size={1} bgColor="#616161" />
            <AppTypography fontWeight={500} color="white">{value}</AppTypography>
        </Flex>
    )
}