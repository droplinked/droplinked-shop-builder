import { Box, Flex, FormLabel, SimpleGrid, useRadio, useRadioGroup } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useContext } from 'react'
import { PaymentLinkContext, PaymentLinkVariantsStyle } from '../../context/PaymentLinkContext'

const variants: { image: string, title: string, description: string, value: PaymentLinkVariantsStyle }[] = [
    { image: "https://upload-file-droplinked.s3.amazonaws.com/72a84a0503d3101e0ea6849ee6f439bcbc12cd67ec9cd6b0a39f0d7dfe0b7894.png", title: "Dropdown", description: "Variants are being shown in dropdowns.", value: "DROPDOWN" },
    { image: "https://upload-file-droplinked.s3.amazonaws.com/3a903c634288adec531ae8c36ac288cc6ebaa93438c532aa14724636add26e18.png", title: "Selector", description: "All variants are visible at once.", value: "SELECTOR" },
]

export default function VariantsStyle() {
    const { t } = useLocaleResources('payment-link');
    const { paymentLinkData, updatePaymentLink } = useContext(PaymentLinkContext)
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-variants-style',
        onChange: (value: PaymentLinkVariantsStyle) => updatePaymentLink('variantsStyle', value),
        value: paymentLinkData.variantsStyle
    })

    return (
        <Flex direction={"column"} gap={4} sx={{ "*": { userSelect: "none" } }}>
            <Flex direction={"column"} gap={1}>
                <AppTypography fontSize={16} fontWeight={600} color={"#fff"}>{t('components.settings.variantsStyle.title')}</AppTypography>
                <AppTypography fontSize={14} fontWeight={400} color={"#fff"}>{t('components.settings.variantsStyle.description')}</AppTypography>
            </Flex>

            <SimpleGrid columns={{ base: 1, xl: 2 }} gap={6} {...getRootProps()}>
                {variants.map((variant) => (
                    <VariantStyleRadio key={variant.value} variant={variant} {...getRadioProps({ value: variant.value })} t={t} />
                ))}
            </SimpleGrid>
        </Flex>
    )
}


function VariantStyleRadio({ ...props }) {
    const { variant, t, ...radioProps } = props
    const { state: { isChecked }, getInputProps, htmlProps, getLabelProps } = useRadio(radioProps)

    const getLocalizedTitle = (value: string) => {
        if (value === 'DROPDOWN') return t('components.settings.variantsStyle.options.dropdown.title');
        if (value === 'SELECTOR') return t('components.settings.variantsStyle.options.selector.title');
        return variant.title;
    };

    const getLocalizedDescription = (value: string) => {
        if (value === 'DROPDOWN') return t('components.settings.variantsStyle.options.dropdown.description');
        if (value === 'SELECTOR') return t('components.settings.variantsStyle.options.selector.description');
        return variant.description;
    };

    return (
        <FormLabel
            flexGrow={1}
            height={"100%"}
            margin={0}
            padding={4}
            border="1.5px solid"
            borderColor={`${isChecked ? "#2BCFA1" : "neutral.gray.700"}`}
            borderRadius={8}
            cursor='pointer'
            {...htmlProps}
            {...getLabelProps()}
        >
            <input {...getInputProps()} hidden />
            <Box borderRadius={4} padding={6} bgColor={"neutral.gray.700"}>
                <AppImage height={"64px"} src={variant.image} objectFit={"contain"} />
            </Box>
            <AppTypography mt={4} fontSize={16} fontWeight={600} color={"#fff"}>{getLocalizedTitle(variant.value)}</AppTypography>
            <AppTypography mt={1} fontSize={14} fontWeight={400} color={"#fff"}>{getLocalizedDescription(variant.value)}</AppTypography>
        </FormLabel>
    )
}