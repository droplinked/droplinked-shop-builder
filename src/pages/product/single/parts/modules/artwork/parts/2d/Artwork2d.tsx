import { useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppModal from 'components/common/modal/AppModal'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import artwork2dContext from './context'
import Printful from './parts/printful/Printful'
import PrintfullTechniques from './parts/techniques/PrintfullTechniques'

function Artwork2d() {
    const [States, setStates] = useState(null)
    const { state: { positions, printful_template_id, technique }, methods: { updateState } } = useContext(productContext)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const isTechnique = useMemo(() => technique || printful_template_id, [printful_template_id, States, technique])

    useEffect(() => { !printful_template_id && updateState("technique", null) }, [isOpen, printful_template_id])

    useEffect(() => { positions && setStates(prev => ({ ...prev, position: positions })) }, [positions])

    return (
        <artwork2dContext.Provider value={{ ...States, setStates: (key, value) => setStates(prev => ({ ...prev, [key]: value })) }} >
            <BasicButton onClick={onOpen} variant={printful_template_id ? "outline" : "solid"} sizes="medium">{printful_template_id ? "Edit Design" : 'Design Maker'}</BasicButton>
            {isOpen && (
                <AppModal isCentered={false} title="Create a Product Template" contentProps={{ maxWidth: isTechnique ? "1100px" : "330px", width: "95%", padding: "30px 10px" }} close={() => isTechnique ? {} : onClose()} open={true}>
                    {isTechnique ? <Printful close={onClose} /> : <PrintfullTechniques />}
                </AppModal>
            )}
        </ artwork2dContext.Provider>
    )
}

export default Artwork2d