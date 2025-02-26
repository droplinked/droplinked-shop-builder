import { Box, Circle, Flex, FormLabel, useRadio } from "@chakra-ui/react"
import AppTypography from "components/common/typography/AppTypography"
import { useCurrencyConverter } from "hooks/useCurrencyConverter/useCurrencyConverter";
import React from "react"

export default function ShippingMethodRadio({ method, ...radioProps }) {
    const { state: { isChecked }, getInputProps, htmlProps, getLabelProps } = useRadio(radioProps)
    const { getFormattedPrice } = useCurrencyConverter()

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
                        <AppTypography>{getFormattedPrice({ amount: method?.price, toFixed: true })}</AppTypography>
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