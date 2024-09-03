import { Flex } from '@chakra-ui/react'
import React from 'react'
import SectionedContent from './components/SectionedContent'

function CreateInvoice() {
    return (
        <Flex direction={"column"}>
            <SectionedContent title="Client Details"></SectionedContent>
        </Flex>
    )
}

export default CreateInvoice