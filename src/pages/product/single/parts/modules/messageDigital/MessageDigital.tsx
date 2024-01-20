import { VStack } from '@chakra-ui/react'
import AppTextarea from 'components/common/form/textarea/AppTextarea'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'

function MessageDigital() {
    const { state: { digitalDetail: { message } }, methods: { dispatch }, loading } = useContext(productContext)

    return (
        <VStack align="stretch">
            <AppTextarea loading={loading} value={message} onChange={e => dispatch({ type: "updateDigitalLinks", params: { message: e.target.value } })} label='Email Message' isRequired placeholder='e.g.,Your digital product is ready for download!' name='message' rows={8} />
        </VStack>
    )
}

export default MessageDigital