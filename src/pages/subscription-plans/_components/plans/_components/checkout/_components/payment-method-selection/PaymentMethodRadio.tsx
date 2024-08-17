import { Circle, Flex, FormLabel, useRadio } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function PaymentMethodRadio({ ...props }) {
    const { paymentMethod: { label, icon }, ...radioProps } = props
    const { state: { isChecked }, getInputProps, htmlProps, getLabelProps } = useRadio(radioProps)

    return (
        <FormLabel
            margin={0}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            border={`1.5px solid ${isChecked ? "#2BCFA1" : "#3C3C3C"}`}
            borderRadius={8}
            padding={4}
            bg={isChecked ? "#2BCFA11A" : "transparent"}
            cursor='pointer'
            {...htmlProps}
            {...getLabelProps()}
            sx={{ "*": { transition: "inherit" } }}
        >
            <input {...getInputProps()} hidden />
            <Flex align={"center"} gap={3}>
                <Circle size={5} border={`1.5px solid ${isChecked ? "#2BCFA1" : "#fff"}`} >
                    <Circle size={2.5} bg={"#2BCFA1"} opacity={isChecked ? 1 : 0} />
                </Circle>
                {label === "Stripe" ?
                    <AppTypography fontSize={14} fontWeight={isChecked ? 500 : 400} color={isChecked ? "#2BCFA1" : "#fff"}>{label}</AppTypography> :
                    <Flex alignItems={"center"} sx={isChecked ? { "svg path": { stroke: "#2BCFA1" } } : {}}>
                        <AppIcons.Token />
                        <AppTypography fontSize={14} fontWeight={isChecked ? 500 : 400} color={isChecked ? "#2BCFA1" : "#fff"}>{label}</AppTypography>
                    </Flex>
                }
            </Flex>
            {icon}
        </FormLabel>
    )
}

export default PaymentMethodRadio