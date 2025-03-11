import { Box } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

function TabletCardsContainer({ children }: PropsWithChildren) {
    return (
        <Box
            as="section"
            height="100%"
        >
            {children}
        </Box>
    )
}

export default TabletCardsContainer