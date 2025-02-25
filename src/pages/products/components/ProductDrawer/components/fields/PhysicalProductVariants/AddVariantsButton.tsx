import { ButtonProps } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import BlueButton from 'components/redesign/button/BlueButton'
import React from 'react'

function AddVariantsButton(props: ButtonProps) {
    return (
        <BlueButton
            w="full"
            gap={2}
            border="1px solid #292929"
            borderRadius={8}
            padding="12px 16px"
            fontSize={16}
            sx={{ path: { stroke: "#179EF8" } }}
            {...props}
        >
            <AppIcons.BlackPlus />
            Add Varaints
        </BlueButton>
    )
}

export default AddVariantsButton