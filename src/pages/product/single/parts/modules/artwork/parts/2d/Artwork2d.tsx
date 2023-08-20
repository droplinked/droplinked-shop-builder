import { Box, Flex, VStack } from '@chakra-ui/react'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect, useState } from 'react'
import artwork2dContext, { artwork2dStates } from './context'
import Artwork2dButtons from './parts/buttons/Artwork2dButtons'
import Artwork2dDetails from './parts/details/Artwork2dDetails'
import ArtworkModel from './parts/models/ArtworkModel'
import Printful from './parts/printful/Printful'

function Artwork2d() {
    const [States, setStates] = useState(artwork2dStates)
    const { state: { artwork, positions } } = useContext(productContext)

    useEffect(() => setStates(artwork2dStates), [artwork])

    useEffect(() => positions && setStates(prev => ({ ...prev, position: positions })), [positions])

    return (
        <artwork2dContext.Provider value={{ ...States, setStates }} >
            <VStack align="stretch" backgroundColor="#141414" padding="40px" spacing="30px">
                <Artwork2dDetails />
                <Printful />
                <Artwork2dButtons />
            </VStack>
        </ artwork2dContext.Provider>
    )
}

export default Artwork2d