import { VStack } from '@chakra-ui/react'
import AppTextarea from 'components/common/form/textarea/AppTextarea'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'

function MessageDigital() {
    const { state: { digitalDetail: { message } }, methods: { dispatch }, loading } = useContext(productContext)

    return (
        <VStack align="stretch">
            <AppTextarea loading={loading} value={message} onChange={e => dispatch({ type: "updateDigitalLinks", params: { message: e.target.value } })} label='Message' isRequired placeholder='e.g., We are pleased to share the original file with you. Please find the link below to access it:' name='message' rows={8} />
        </VStack>
    )
}

export default MessageDigital