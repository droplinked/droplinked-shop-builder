import { ModalFooter } from '@chakra-ui/react'
import Button from 'pages/invoice-management/components/Button'
import React from 'react'

interface Props {
    file: File | null
    closeModal: () => void
}

function ImportProductModalFooter({ file, closeModal }: Props) {
    return (
        <ModalFooter
            display="flex"
            justifyContent="space-between"
            gap={{ xl: 6, base: 3 }}
            padding="36px !important"
        >
            <Button variant='secondary' onClick={closeModal}>Discard</Button>
            <Button isDisabled={!file}>Validate</Button>
        </ModalFooter>
    )
}

export default ImportProductModalFooter