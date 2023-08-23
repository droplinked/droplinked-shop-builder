import { useDisclosure } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import BasicButton from 'components/common/BasicButton/BasicButton'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import artwork2dContext, { artwork2dStates } from './context'
import Printful from './parts/printful/Printful'

function Artwork2d() {
    const [States, setStates] = useState(artwork2dStates)
    const { state: { artwork, positions, printful_template_id, custome_external_id } } = useContext(productContext)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => setStates(artwork2dStates), [artwork])

    useEffect(() => positions && setStates(prev => ({ ...prev, position: positions })), [positions])

    return (
        <artwork2dContext.Provider value={{ ...States, setStates }} >
            <BasicButton onClick={onOpen} variant={printful_template_id ? "outline" : "solid"} sizes="medium">{printful_template_id ? "Edit Design" : 'Design Product'}</BasicButton>
            {isOpen && <Printful generate_externaID={custome_external_id} close={onClose} open={isOpen} />}
        </ artwork2dContext.Provider>
    )
}

export default Artwork2d