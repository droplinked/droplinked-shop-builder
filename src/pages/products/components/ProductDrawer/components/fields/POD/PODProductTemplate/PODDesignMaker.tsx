import { useDisclosure } from '@chakra-ui/react'
import React from 'react'
import DesignMakerButton from './DesignMakerButton'
import DesignMakerModal from './DesignMakerModal/DesignMakerModal'

function PODDesignMaker() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <DesignMakerButton onClick={onOpen} />
            <DesignMakerModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default PODDesignMaker