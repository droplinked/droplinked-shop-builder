import { Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    isOpen: boolean
    onDrawerClose: () => void
}

function ProductDrawerLayout({ isOpen, onDrawerClose, children }: Props) {
    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            size="lg"
            onClose={onDrawerClose}
            trapFocus={false}
            autoFocus={false}
        >
            <DrawerOverlay background="rgba(0, 0, 0, 0.75)" />
            <DrawerContent
                maxWidth="780px"
                width="780px"
                marginBlock={4}
                marginInline={10}
                borderRadius={16}
                bgColor="#141414"
                overflow="hidden"
                sx={{
                    overflowY: 'scroll',
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}
            >
                {children}
            </DrawerContent>
        </Drawer>
    )
}

export default ProductDrawerLayout