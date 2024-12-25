import { useDisclosure } from '@chakra-ui/react'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import DesignMakerButton from './DesignMakerButton'
import DesignMakerModal from './DesignMakerModal/DesignMakerModal'

function PODDesignMaker() {
    const { values: { printful_template_id } } = useProductForm()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <DesignMakerButton printful_template_id={printful_template_id} onClick={onOpen} />
            <DesignMakerModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default PODDesignMaker