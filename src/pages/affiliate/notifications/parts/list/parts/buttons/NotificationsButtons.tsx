import { Box, useDisclosure, VStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import React, { useState } from 'react'
import NotificationsModal from './parts/modal/NotificationsModal'

function NotificationsButtons() {
    const modal = useDisclosure()
    const [Accept, setAccept] = useState<Boolean | null>(null)
 
    return (
        <>
            <VStack align={"stretch"}>
                <Box>
                    <BasicButton
                        width="100%"
                        maxWidth="150px"
                        click={() => {
                            setAccept(true)
                            modal.onOpen()
                        }}
                    >
                        Accept
                    </BasicButton>
                </Box>
                <Box>
                    <BasicButton
                        width="100%"
                        click={() => {
                            setAccept(false)
                            modal.onOpen()
                        }}
                        maxWidth="150px"
                        cancelType
                    >
                        Deny
                    </BasicButton>
                </Box>
            </VStack>
            <NotificationsModal accept={Accept} close={modal.onClose} open={modal.isOpen} />
        </>
    )
}

export default NotificationsButtons