import { HStack, Text } from '@chakra-ui/react'
import React from 'react'

interface Iprops {
    label:string
    isRequired:boolean
}

function FieldLabel({isRequired,label}:Iprops) {
    return (
        <>
            {label && (
                <HStack>
                    <Text fontSize={"large"} color={"#FFF"}>{label}</Text>
                    {isRequired && <Text fontSize={"medium"} color="#2EC99E">*</Text>}
                </HStack>
            )}
        </>
    )
}

export default FieldLabel