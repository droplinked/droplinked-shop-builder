import { Center } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

function HeaderIconContainer({ children }: PropsWithChildren) {
    return (
        <Center
            width={{ base: 9, md: 12 }}
            height={{ base: 9, md: 12 }}
            flexShrink={0}
            border="1px solid #333"
            borderRadius={8}
            bgColor="neutral.gray.850"
            sx={{
                "svg": { width: { base: 4, md: 6 }, height: { base: 4, md: 6 } }
            }}
        >
            {children}
        </Center>
    )
}

export default HeaderIconContainer