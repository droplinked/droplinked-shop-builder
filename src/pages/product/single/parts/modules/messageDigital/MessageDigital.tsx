import { VStack } from '@chakra-ui/react'
import AppTextarea from 'components/common/form/textarea/AppTextarea'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'

function MessageDigital() {
    const { state, methods: { dispatch }, loading } = useContext(productContext)

    return (
        <VStack align="stretch">
            <AppTextarea
                label='Email Message'
                name='message'
                placeholder='e.g.,Your digital product is ready for download!'
                value={state?.digitalDetail?.message}
                rows={8}
                loading={loading}
                onChange={e => dispatch({ type: "updateDigitalLinks", params: { message: e.target.value } })}
            />
        </VStack>
    )
}

export default MessageDigital