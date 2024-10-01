import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import D3FAQAccordions from './D3FAQAccordions'
import D3FAQContent from './D3FAQContent'

function D3FAQ() {
    return (
        <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            alignSelf={"start"}
            gap={12}
        >
            <D3FAQContent />
            <D3FAQAccordions />
        </SimpleGrid>
    )
}

export default D3FAQ