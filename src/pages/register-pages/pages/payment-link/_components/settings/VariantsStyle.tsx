import { Box, Flex, FormLabel, useRadio, useRadioGroup } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from 'react'
import { PaymentLinkContext, PaymentLinkVariantsStyle } from '../../context/PaymentLinkContext'

const variants: { image: string, title: string, description: string, value: PaymentLinkVariantsStyle }[] = [
    { image: "https://upload-file-droplinked.s3.amazonaws.com/72a84a0503d3101e0ea6849ee6f439bcbc12cd67ec9cd6b0a39f0d7dfe0b7894.png", title: "Dropdown", description: "Variants are being shown in dropdowns.", value: "DROPDOWN" },
    { image: "https://upload-file-droplinked.s3.amazonaws.com/3a903c634288adec531ae8c36ac288cc6ebaa93438c532aa14724636add26e18.png", title: "Selector", description: "All variants are visible at once.", value: "SELECTOR" },
]

export default function VariantsStyle() {
    const { paymentLinkData, updatePaymentLink } = useContext(PaymentLinkContext)
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-variants-style',
        onChange: (value: PaymentLinkVariantsStyle) => updatePaymentLink('variantsStyle', value),
        value: paymentLinkData.variantsStyle
    })

    return (
        <Flex direction={"column"} gap={4}>
            <Flex direction={"column"} gap={1}>
                <AppTypography fontSize={16} fontWeight={600} color={"#fff"}>Variants Style</AppTypography>
                <AppTypography fontSize={14} fontWeight={400} color={"#fff"}>Choose how you want product variants to be shown</AppTypography>
            </Flex>

            {/* <SimpleGrid columns={{ base: 1, xl: 2 }} gap={6} {...getRootProps()}>
                {variants.map((variant) => (
                    <VariantStyleRadio key={variant.value} variant={variant} {...getRadioProps({ value: variant.value })} />
                ))}
            </SimpleGrid> */}

            <Flex direction={"column"} gap={6} {...getRootProps()}>
                {variants.map((variant) => (
                    <VariantStyleRadio key={variant.value} variant={variant} {...getRadioProps({ value: variant.value })} />
                ))}
            </Flex>
        </Flex>
    )
}


function VariantStyleRadio({ ...props }) {
    const { variant, ...radioProps } = props
    const { state: { isChecked }, getInputProps, getRadioProps, htmlProps, getLabelProps } = useRadio(radioProps)

    return (
        <FormLabel margin={0} cursor='pointer' {...htmlProps} {...getLabelProps()}>
            <input {...getInputProps()} hidden />
            <Flex
                {...getRadioProps()}
                direction={"column"} gap={4}
                padding={4}
                border={`1.5px solid ${isChecked ? "#2BCFA1" : "#3C3C3C"}`}
                borderRadius={8}
            >
                <Box borderRadius={4} padding={6} bgColor={"#3C3C3C"}>
                    <AppImage height={"61px"} src={variant.image} objectFit={"contain"} />
                </Box>
                <Box>
                    <AppTypography fontSize={16} fontWeight={600} color={"#fff"}>{variant.title}</AppTypography>
                    <AppTypography fontSize={14} fontWeight={400} color={"#fff"}>{variant.description}</AppTypography>
                </Box>
            </Flex>
        </FormLabel>
    )
}