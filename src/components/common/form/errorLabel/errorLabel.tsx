import { Text } from '@chakra-ui/react'
import React from 'react'

function ErrorLabel({ message }) {
    return (
        <>
            {message && <Text position={"relative"} left={4} fontSize={"13px"} color='red.300'>{message}</Text>}
        </>
    )
}

export default ErrorLabel