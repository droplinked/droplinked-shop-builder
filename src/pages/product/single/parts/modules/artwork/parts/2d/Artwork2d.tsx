import { useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect, useState } from 'react'
import artwork2dContext, { artwork2dStates } from './context'
import Printful from './parts/printful/Printful'

function Artwork2d() {
    const [States, setStates] = useState(artwork2dStates)
    const { state: { artwork, positions, printful_template_id } } = useContext(productContext)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => setStates(artwork2dStates), [artwork])

    useEffect(() => positions && setStates(prev => ({ ...prev, position: positions })), [positions])

    return (
        <artwork2dContext.Provider value={{ ...States, setStates }} >
            <BasicButton onClick={onOpen} variant={printful_template_id ? "outline" : "solid"} sizes="medium">{printful_template_id ? "Edit Design" : 'Add Artwork'}</BasicButton>
            {isOpen && <Printful close={onClose} open={isOpen} />}
        </ artwork2dContext.Provider>
    )
}

export default Artwork2d