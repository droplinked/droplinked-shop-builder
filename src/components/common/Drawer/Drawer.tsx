import { Drawer as ChakraDrawer, DrawerContent, DrawerOverlay, DrawerHeader, DrawerCloseButton, DrawerFooter, Flex, Heading, DrawerContentProps } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    isOpen: boolean
    onClose: () => void
    title: string
    discardButtonText?: string
    saveButtonText?: string
    isLoading?: boolean
    onClick?: () => void
    drawerContentStyle?: DrawerContentProps
}

function Drawer({
    isOpen,
    onClose,
    children,
    title,
    discardButtonText = 'Discard',
    saveButtonText = 'Save',
    isLoading = false,
    onClick,
    drawerContentStyle,
}: Props) {
    return (
        <ChakraDrawer
            isOpen={isOpen}
            placement="right"
            size="md"
            onClose={onClose}
        >
            <DrawerOverlay background="rgba(0, 0, 0, 0.75)" />
            <DrawerContent
                marginBlock={{ base: 0, md: 4 }}
                marginInline={{ base: 0, md: 10 }}
                borderRadius={{ base: 0, md: 16 }}
                bgColor="#141414"
                overflow="hidden"
                sx={{
                    overflowY: 'scroll',
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}
                {...drawerContentStyle}
            >
                <DrawerHeader
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom="1px solid #292929"
                    padding={9}
                >
                    <Heading as="h3" fontSize={24} fontWeight={700} color="#FFF">
                        {title}
                    </Heading>
                    <DrawerCloseButton position="static" color="white" />
                </DrawerHeader>

                {children}

                <DrawerFooter
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderTop="1px solid #292929"
                    padding={9}
                    css={{ button: { fontSize: 14, fontWeight: 500 } }}
                >
                    <Button
                        type="button"
                        variant="secondary"
                        isDisabled={isLoading}
                        onClick={onClose}
                    >
                        {discardButtonText}
                    </Button>

                    <Flex gap={4}>
                        <Button
                            type="button"
                            isDisabled={isLoading}
                            isLoading={isLoading}
                            onClick={onClick}
                        >
                            {saveButtonText}
                        </Button>
                    </Flex>
                </DrawerFooter>
            </DrawerContent>
        </ChakraDrawer>
    )
}

export default Drawer
