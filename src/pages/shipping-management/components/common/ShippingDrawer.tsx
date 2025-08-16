import { Box, BoxProps, Drawer as ChakraDrawer, DrawerFooter as ChakraDrawerFooter, DrawerHeader as ChakraDrawerHeader, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Heading, Text } from '@chakra-ui/react'
import AppButton, { AppButtonProps } from 'components/redesign/button/AppButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { PropsWithChildren } from 'react'

interface DrawerRootProps extends PropsWithChildren {
    isOpen: boolean
    onClose: () => void
}

function DrawerRoot({ isOpen, onClose, children }: DrawerRootProps) {
    const { isRTL } = useLocaleResources('common')
    const placement = isRTL ? 'left' : 'right'

    return (
        <ChakraDrawer
            isOpen={isOpen}
            placement={placement}
            size="lg"
            onClose={onClose}
            trapFocus={false}
            autoFocus={false}
        >
            <DrawerOverlay background="rgba(0, 0, 0, 0.75)" />
            <DrawerContent
                maxWidth="600px"
                width="100%"
                marginBlock={4}
                marginInline={9}
                border="1px solid"
                borderColor="neutral.gray.800"
                borderRadius={16}
                bgColor="neutral.background"
                sx={{
                    overflowY: 'scroll',
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}
            >
                {children}
            </DrawerContent>
        </ChakraDrawer>
    )
}

interface DrawerHeaderProps {
    title: string
    description?: string
}

function DrawerHeader({ title, description }: DrawerHeaderProps) {
    return (
        <ChakraDrawerHeader
            display="flex"
            gap={6}
            borderBottom="1px solid"
            borderColor="neutral.gray.800"
            padding={9}
        >
            <Flex flex={1} direction="column" gap={1}>
                {description && (
                    <Text fontSize={14} color="text.subtext.placeholder.dark">
                        {description}
                    </Text>
                )}
                <Heading as="h3" fontSize={24} fontWeight={700} color="text.white">
                    {title}
                </Heading>
            </Flex>
            <DrawerCloseButton position="static" color="white" />
        </ChakraDrawerHeader>
    )
}

interface DrawerFooterProps {
    primaryText?: string
    secondaryText?: string
    onPrimary?: () => void
    onSecondary?: () => void
    primaryButtonProps?: AppButtonProps
    secondaryButtonProps?: AppButtonProps
}

function DrawerFooter({
    primaryText = 'Save',
    secondaryText = 'Discard',
    onPrimary,
    onSecondary,
    primaryButtonProps,
    secondaryButtonProps,
}: DrawerFooterProps) {
    return (
        <ChakraDrawerFooter
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderTop="1px solid"
            borderColor="neutral.gray.800"
            padding={9}
        >
            <AppButton
                type="button"
                variant="secondary"
                onClick={onSecondary}
                {...secondaryButtonProps}
            >
                {secondaryText}
            </AppButton>

            <AppButton type="button" onClick={onPrimary} {...primaryButtonProps}>
                {primaryText}
            </AppButton>
        </ChakraDrawerFooter>
    )
}

function DrawerBody({ children, ...props }: BoxProps) {
    return (
        <Box
            padding={9}
            {...props}
        >
            {children}
        </Box>
    )
}

const ShippingDrawer = Object.assign(DrawerRoot, {
    Header: DrawerHeader,
    Footer: DrawerFooter,
    Body: DrawerBody,
})

export default ShippingDrawer