import { Box, Drawer as ChakraDrawer, ChakraProps, DrawerCloseButton, DrawerContent, DrawerContentProps, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, Text } from '@chakra-ui/react'
import AppButton, { AppButtonProps } from 'components/redesign/button/AppButton'
import React, { PropsWithChildren, ReactNode } from 'react'

interface Props extends PropsWithChildren {
    isOpen: boolean
    onClose: () => void
    title: string
    description?: string
    icon?: ReactNode
    drawerFooterProps?: ChakraProps
    discardButtonText?: string
    saveButtonText?: string
    discardButtonProps?: AppButtonProps
    saveButtonProps?: AppButtonProps
    isLoading?: boolean
    onClick?: () => void
    headerContent?: React.ReactNode;
    drawerContentStyle?: DrawerContentProps
    drawerHeaderStyle?: ChakraProps
    showSubmitButtons?: boolean
    headingStyle?: ChakraProps
    descriptionStyle?: ChakraProps
    showCloseIcon?: boolean
    placement?: 'top' | 'right' | 'bottom' | 'left'
}

function Drawer({
    isOpen,
    onClose,
    children,
    title,
    description,
    descriptionStyle,
    icon,
    drawerFooterProps,
    discardButtonProps,
    saveButtonProps,
    discardButtonText = 'Discard',
    saveButtonText = 'Save',
    isLoading = false,
    onClick,
    headerContent,
    drawerContentStyle,
    headingStyle,
    drawerHeaderStyle,
    showSubmitButtons,
    showCloseIcon = true,
    placement = "right"
}: Props) {
    const isCentered = placement === 'top' || placement === 'bottom'

    return (
        <ChakraDrawer
            isOpen={isOpen}
            placement={placement}
            size="md"
            onClose={onClose}
        >
            <DrawerOverlay background="rgba(0, 0, 0, 0.75)" />
            <DrawerContent
                {...!isCentered && {
                    marginBlock: { base: 0, md: 4 },
                    marginInline: { base: 0, md: 10 }
                }}
                {...!isCentered && { borderRadius: { base: 0, md: 16 } }}
                {...isCentered && { borderTopRadius: { base: 0, md: 16 } }}
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
                    flexDirection="column"
                    gap={6}
                    borderBottom="1px solid"
                    borderColor={"neutral.gray.800"}
                    padding={9}
                    {...drawerHeaderStyle}
                >
                    <Flex justifyContent="space-between" alignItems="baseline" width="100%">
                        <Box>
                            {icon}
                            {title &&
                                <Flex flexDirection="column" gap={1}>
                                    <Heading as="h3" fontSize={{ base: 20, md: 24 }} fontWeight={700} color="#FFF" {...headingStyle}>
                                        {title}
                                    </Heading>
                                    {description &&
                                        <Text fontSize={{ base: 14, md: 16 }} color="#B1B1B1" {...descriptionStyle}>
                                            {description}
                                        </Text>
                                    }
                                </Flex>
                            }
                        </Box>
                        {showCloseIcon && <DrawerCloseButton position="static" color="white" />}
                    </Flex>
                    {headerContent}
                </DrawerHeader>

                {children}

                {showSubmitButtons &&
                    <DrawerFooter
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderTop="1px solid"
                        borderColor={"neutral.gray.800"}
                        padding={9}
                        css={{ button: { fontSize: 14, fontWeight: 500 } }}
                        {...drawerFooterProps}
                    >
                        <AppButton
                            type="button"
                            variant="secondary"
                            isDisabled={isLoading}
                            onClick={onClose}
                            {...discardButtonProps}
                        >
                            {discardButtonText}
                        </AppButton>

                        <Flex gap={4} {...saveButtonProps?.width && { width: saveButtonProps?.width }}>
                            <AppButton
                                type="button"
                                isDisabled={isLoading}
                                isLoading={isLoading}
                                onClick={onClick}
                                {...saveButtonProps}
                            >
                                {saveButtonText}
                            </AppButton>
                        </Flex>
                    </DrawerFooter>
                }
            </DrawerContent>
        </ChakraDrawer>
    )
}

export default Drawer
