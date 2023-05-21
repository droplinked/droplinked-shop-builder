import { Box, HStack, Text, TextProps } from '@chakra-ui/react'
import AppSkeleton from 'components/shared/skeleton/AppSkeleton'
import AppTypography from 'components/shared/typography/AppTypography'
import React from 'react'
import FieldLabelReuired from './parts/required/FieldLabelReuired'

export interface IFieldLabel {
    label: string
    isRequired?: boolean
    loading?: boolean
    color?: string
}

function FieldLabel({ isRequired, label, loading, color }: IFieldLabel) {
    return (
        <>
            {label && (
                <Box width={"fit-content"}>
                    <AppSkeleton isLoaded={loading}>
                        <HStack>
                            <AppTypography size='16px' color={"#FFF" || color}>{label}</AppTypography>
                            {isRequired && <FieldLabelReuired />}
                        </HStack>
                    </AppSkeleton>
                </Box>
            )}
        </>
    )
}

export default FieldLabel