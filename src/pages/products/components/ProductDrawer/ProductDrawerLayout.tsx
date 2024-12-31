import { Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    isOpen: boolean
    onClose: () => void
}

function ProductDrawerLayout({ isOpen, onClose, children }: Props) {
    const resetProductPageState = useProductPageStore(s => s.resetProductPageState)

    const handleDrawerClose = () => {
        resetProductPageState()
        onClose()
    }

    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            size="lg"
            onClose={handleDrawerClose}
        >
            <DrawerOverlay background="rgba(0, 0, 0, 0.75)" />
            <DrawerContent
                maxWidth="780px"
                width="780px"
                marginBlock={4}
                marginInline={10}
                borderRadius={16}
                bgColor="#141414"
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