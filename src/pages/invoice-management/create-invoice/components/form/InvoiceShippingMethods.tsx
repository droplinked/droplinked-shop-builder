import { Box, Circle, Flex, FormLabel, useRadio, useRadioGroup } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useState } from 'react'
import ToggleableSection from '../ToggleableSection'

export default function InvoiceShippingMethods() {
    const [paymentMethod, setPaymentMethod] = useState("")
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-payment-method',
        onChange: (value: string) => setPaymentMethod(value),
        value: paymentMethod,
    })

    const shippingMethods = [
        { title: "Standard", price: 6, fulfillmentDate: "2 business days", estimatedDelivery: "2 business days" },
        { title: "Express", price: 6, fulfillmentDate: "2 business days", estimatedDelivery: "2 business days" },
        { title: "Priority", price: 6, fulfillmentDate: "2 business days", estimatedDelivery: "2 business days" },
    ]

    return (
        <ToggleableSection
            title='Shipping'
            description='Shipping methods are based on the type of inventory and address on the invoice.'
        >
            <Flex direction="column" gap={4} {...getRootProps()}>
                {shippingMethods.map((method) => (
                    <ShippingMethodRadio
                        key={method.title}
                        method={method}
                        {...getRadioProps({ value: method.title })}
                    />
                ))}
            </Flex>
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
                        <ShippingMethodDetails title="Fulfillment Date" value={method.fulfillmentDate} isChecked={isChecked} />
                        <ShippingMethodDetails title="Estimated Delivery" value={method.estimatedDelivery} isChecked={isChecked} />
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