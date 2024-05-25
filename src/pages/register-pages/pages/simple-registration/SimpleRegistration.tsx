import { useDisclosure } from '@chakra-ui/react'
import SimpleRegistrationModal from 'components/modals/simple-registration-modal/SimpleRegistrationModal'
import React, { useEffect } from 'react'

function SimpleRegistration() {
    const { isOpen, onOpen } = useDisclosure()

    useEffect(() => { onOpen() }, [onOpen])

    return (
        <>
            {isOpen && <SimpleRegistrationModal isOpen={isOpen} />}
        </>
    )
}

export default SimpleRegistration