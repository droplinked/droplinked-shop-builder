import { Box, Flex, FormLabel, useRadio, useRadioGroup } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from 'react'
import { PaymentLinkColorPallete, PaymentLinkContext } from '../../context/PaymentLinkContext'

const colorPalletes: { value: PaymentLinkColorPallete, bgColor: string }[] = [
    { value: "LIGHT", bgColor: "#FFFFFF" }
]

export default function ColorPalletes() {
    const { paymentLinkData, updatePaymentLink } = useContext(PaymentLinkContext)
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-color-pallete',
        onChange: (value: PaymentLinkColorPallete) => updatePaymentLink('colorPallete', value),
        value: paymentLinkData.colorPallete
    })

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <AppTypography fontSize={16} fontWeight={600} color={"#fff"}>Color Pallete</AppTypography>
            <Flex alignItems={"center"} gap={4} {...getRootProps()}>
                {colorPalletes.map((theme, i) => <ColorPalleteRadio key={i} theme={theme} {...getRadioProps({ value: theme.value })} />)}
            </Flex>
        </Flex>
    )
}

function ColorPalleteRadio({ ...props }) {
    const { theme, ...radioProps } = props
    const { state: { isChecked }, getInputProps, htmlProps, getLabelProps } = useRadio(radioProps)

    return (
        <FormLabel
            margin={0}
            padding={1}
            border={`1.5px solid ${isChecked ? "#2BCFA1" : "#3C3C3C"}`}
            borderRadius={16}
            cursor='pointer'
            {...htmlProps}
            {...getLabelProps()}
        >
            <input {...getInputProps()} hidden />
            <Box
                width={14}
                height={4}
                borderRadius={"inherit"}
                bgColor={theme.bgColor}
            />
        </FormLabel>
    )
}