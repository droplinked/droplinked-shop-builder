import { Box, Flex, IconButton, Popover, PopoverBody, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react'
import { CloseMd } from 'assets/icons/Sign/Close/CloseMd'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import Button, { AppButtonProps } from 'components/redesign/button/Button'
import React from 'react'

export default function MobileFloatingMenu({ actionButtons }: { actionButtons: AppButtonProps[] }) {
    const { isOpen, onClose, onOpen } = useDisclosure()

    if (!actionButtons?.length) {
        return null
    }

    return (
        <Box position="fixed" bottom="16px" right="16px" zIndex={99999}>
            <Popover
                isOpen={isOpen}
                onClose={onClose}
                placement="top-end"
                closeOnBlur={true}
            >
                <PopoverTrigger>
                    <IconButton
                        aria-label="Menu"
                        icon={isOpen ? <CloseMd color='#fff' /> : <PlusMd color='#000' />}
                        onClick={onOpen}
                        borderRadius={8}
                        size="lg"
                        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.2)"
                        border="1px solid neutral.gray.700"
                        background={isOpen ? "button.default.secondary" : "button.default.primary"}
                        _active={{
                            background: isOpen ? "button.default.secondary !important" : "button.default.primary !important"
                        }}
                        _hover={{
                            background: isOpen ? "button.default.secondary !important" : "button.default.primary !important"
                        }}
                    />
                </PopoverTrigger>
                <PopoverContent
                    width="auto"
                    bg="transparent"
                    border="none"
                    pb={4}
                >
                    <PopoverBody p={0}>
                        <Flex
                            direction="column"
                            gap="1rem"
                            minWidth="150px"
                        >
                            {actionButtons?.map((button, index) => (
                                <Button
                                    key={index}
                                    {...button}
                                    onClick={(e) => {
                                        button.onClick?.(e);
                                    }}
                                    width="100%"
                                >
                                    {button.title}
                                </Button>
                            ))}
                        </Flex>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
    )
}
