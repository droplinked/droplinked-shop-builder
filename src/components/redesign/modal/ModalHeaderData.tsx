import { Flex, ModalCloseButton, ModalHeader, ModalHeaderProps, Text } from '@chakra-ui/react'
import React, { PropsWithChildren, ReactNode } from 'react'
import ModalHeaderIconWrapper from '../modal-header-icon-wrapper/ModalHeaderIconWrapper'

interface Props extends PropsWithChildren {
    icon?: ReactNode
    title: string
    description?: string
    modalHeaderProps?: ModalHeaderProps
}

function ModalHeaderData({ icon, title, description, modalHeaderProps, children }: Props) {
    return (
        <ModalHeader
            display="flex"
            flexDirection="column"
            gap={2}
            {...modalHeaderProps}
        >
            <Flex justifyContent="space-between">
                {icon
                    ? <ModalHeaderIconWrapper>{icon}</ModalHeaderIconWrapper>
                    : <Text fontSize={{ base: 20, md: 24 }} fontWeight={700} color="text.white">{title}</Text>
                }
                <ModalCloseButton position="static" color="white" />
            </Flex>

            {icon && (
                <Text
                    marginTop={4}
                    fontSize={{ base: 20, md: 24 }}
                    fontWeight={700}
                    color="text.white"
                >
                    {title}
                </Text>
            )}

            {description && (
                <Text fontSize={{ base: 14, md: 16 }} color="text.subtext.placeholder.light">
                    {description}
                </Text>
            )}

            {children}
        </ModalHeader>
    )
}

export default ModalHeaderData