import { Box, Flex, IconButton, Popover, PopoverBody, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react'
import { CloseMd } from 'assets/icons/Sign/Close/CloseMd'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import AppButton from 'components/redesign/button/AppButton'
import React from 'react'
import { ActionButtonProps } from '../interface'

function MobileFloatingMenu({ actionButtons }: { actionButtons: ActionButtonProps[] }) {
    const { isOpen, onClose, onOpen } = useDisclosure()

    if (!actionButtons?.length) return null

    return (
        <Box position="fixed" bottom="6rem" right="16px" zIndex={999}>
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
                            gap={1}
                            minWidth="150px"
                        >
                            {actionButtons?.map((button, index) => {
                                const ButtonComponent = (
                                    <AppButton
                                        key={index}
                                        width="100%"
                                        paddingBlock="10px"
                                        paddingInline="14px"
                                        fontSize={14}
                                        fontWeight={500}
                                        iconSpacing="6px"
                                        {...button}
                                    >
                                        {button.title}
                                    </AppButton>
                                )

                                if (button.wrapper) {
                                    return React.cloneElement(button.wrapper, { key: index }, ButtonComponent)
                                }

                                return ButtonComponent
                            })}
                        </Flex>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
    )
}

export default MobileFloatingMenu