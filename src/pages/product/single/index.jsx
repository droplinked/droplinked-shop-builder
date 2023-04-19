import { VStack } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import Introduction from './parts/introduction'
import TechnicalProduct from './parts/technical'
import { initialStatesProduct, productContext } from './context'
import Properties from './parts/properties'
import Variants from './parts/variants'

function ProductSingle() {
    const [State, setState] = useState(initialStatesProduct)

    const updateState = useCallback((element, value) => {
        if ([typeof element, typeof value].includes("undefined")) return false
        setState(prev => ({ ...prev, [element]: value }))
    }, [])

    return (
        <productContext.Provider value={{
            state: State,
            methods: { updateState }
        }}>
            <VStack spacing={5}>
                <Introduction />
                <TechnicalProduct />
                <Properties />
                <Variants />
            </VStack>
        </productContext.Provider>
    )
}

export default ProductSingle