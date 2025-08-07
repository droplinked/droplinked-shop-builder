import { Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    isOpen: boolean
    onDrawerClose: () => void
}

function ShippingProfileDrawerLayout({ isOpen, onDrawerClose, children }: Props) {
    const { isRTL } = useLocaleResources('common')
    const placement = isRTL ? 'left' : 'right'

    return (
        <Drawer
            isOpen={isOpen}
            placement={placement}
            size="lg"
            onClose={onDrawerClose}
            trapFocus={false}
            autoFocus={false}
        >
            <DrawerOverlay background="rgba(0, 0, 0, 0.75)" />
            <DrawerContent
                maxWidth="680px"
                width="100%"
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

export default ShippingProfileDrawerLayout
