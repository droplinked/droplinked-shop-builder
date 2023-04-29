import { Box, HStack, Text } from '@chakra-ui/react'
import AppSkeleton from 'components/shared/skeleton/AppSkeleton'
import React from 'react'

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
                            {isRequired && <Text fontSize={"medium"} color="#2EC99E">*</Text>}
                        </HStack>
                    </AppSkeleton>
                </Box>
            )}
        </>
    )
}

export default FieldLabel