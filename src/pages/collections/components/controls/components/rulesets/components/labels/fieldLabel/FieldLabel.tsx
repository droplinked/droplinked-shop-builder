import { Box, HStack } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography, { IAppTypography } from 'components/common/typography/AppTypography'
import React from 'react'
import FieldLabelReuqired from './parts/required/FieldLabelReuqired'

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
                            <AppTypography fontSize='16px' color={color ? color : "#FFF"} {...textProps}>{label}</AppTypography>
                            {isRequired && <FieldLabelReuqired />}
                        </HStack>
                    </AppSkeleton>
                </Box>
            )}
        </>
    )
}

export default FieldLabel