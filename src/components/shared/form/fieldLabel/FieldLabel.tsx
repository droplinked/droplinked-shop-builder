import { Box, HStack, Text } from '@chakra-ui/react'
import AppSkeleton from 'components/shared/skeleton/AppSkeleton'
import React from 'react'
import FieldLabelReuired from './parts/required/FieldLabelReuired'

interface Iprops {
    label: string
    isRequired: boolean
    loading?: boolean
}

function FieldLabel({ isRequired, label, loading }: Iprops) {
    return (
        <>
            {label && (
                <Box width={"fit-content"}>
                    <AppSkeleton isLoaded={loading}>
                        <HStack>
                            <Text fontSize={"large"} color={"#FFF"}>{label}</Text>
                            {isRequired && <FieldLabelReuired />}
                        </HStack>
                    </AppSkeleton>
                </Box>
            )}
        </>
    )
}

export default FieldLabel