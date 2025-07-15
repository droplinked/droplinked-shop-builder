import { ButtonProps } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import BlueButton from 'components/redesign/button/BlueButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

// Local translations for this component
const localEn = {
  addVariantsButton: "Add Variants"
}

const localAr = {
  addVariantsButton: "إضافة متغيرات"
}

function AddVariantsButton(props: ButtonProps) {
    const { t } = useLocaleResources('products', { en: localEn, ar: localAr })

    return (
        <BlueButton
            w="full"
            gap={2}
            border="1px solid"
            borderColor="neutral.gray.800"
            borderRadius={8}
            padding="12px 16px"
            fontSize={16}
            sx={{ path: { stroke: "#179EF8" } }}
            {...props}
        >
            <AppIcons.BlackPlus />
            {t('physicalProductVariants.addVariantsButton')}
        </BlueButton>
    )
}

export default AddVariantsButton