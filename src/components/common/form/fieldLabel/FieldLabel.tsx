import { Box, HStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography, { IAppTypography } from 'components/common/typography/AppTypography'
import React from 'react'
import FieldLabelReuired from './parts/required/FieldLabelReuired'

export interface IFieldLabel {
    label: string
    isRequired?: boolean
    loading?: boolean
    color?: string
    textProps?: IAppTypography
}

function FieldLabel({ isRequired, label, loading, color, textProps }: IFieldLabel) {
    return (
        <>
            {label && (
                <Box width={"fit-content"}>
                    <AppSkeleton isLoaded={loading}>
                        <HStack>
                            <AppTypography fontSize='16px' color={color || "neutral.white"} {...textProps}>{label}</AppTypography>
                            {isRequired && <FieldLabelReuired />}
                        </HStack>
                    </AppSkeleton>
                </Box>
            )}
        </>
    )
}

export default FieldLabel