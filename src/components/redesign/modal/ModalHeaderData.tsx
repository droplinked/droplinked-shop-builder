import { Flex, ModalCloseButton, ModalHeader, ModalHeaderProps, Text, TextProps } from '@chakra-ui/react';
import React, { PropsWithChildren, ReactNode } from 'react';
import ModalHeaderIconWrapper from '../modal-header-icon-wrapper/ModalHeaderIconWrapper';

/**
 * ModalHeaderData Component - Standardized modal header with icon support
 * 
 * Provides a consistent layout for modal headers with optional icon,
 * title, description text, and properly positioned close button.
 * 
 * @param {object} props - Component props
 * @param {ReactNode} [props.icon] - Optional icon to display in the header
 * @param {string} props.title - Title text for the modal
 * @param {string} [props.description] - Optional description text below the title
 * @param {ModalHeaderProps} [props.modalHeaderProps] - Additional props for the modal header
 * @param {TextProps} [props.descriptionProps] - Additional props for the description text
 * @param {React.ReactNode} [props.children] - Additional content to render in the header
 */
interface Props extends PropsWithChildren {
    icon?: ReactNode;
    title: string;
    description?: string;
    modalHeaderProps?: ModalHeaderProps;
    descriptionProps?: TextProps;
}

function ModalHeaderData({ icon, descriptionProps, title, description, modalHeaderProps, children }: Props) {
    return (
        <ModalHeader
            {...modalHeaderProps}
            css={{ p: { color: 'white' } }}
        >
            <Flex justifyContent="space-between">
                {icon
                    ? <ModalHeaderIconWrapper>{icon}</ModalHeaderIconWrapper>
                    : <Text fontSize={{ base: 20, md: 24 }} fontWeight={700}>{title}</Text>
                }
                <ModalCloseButton position="static" color="white" />
            </Flex>

            {icon && (
                <Text mt={6} mb={description ? 0 : 2} fontSize={{ base: 20, md: 24 }} fontWeight={700}>{title}</Text>
            )}

            {description && <Text mt={2} fontSize={{ base: 14, md: 16 }} {...descriptionProps}>{description}</Text>}

            {children}
        </ModalHeader>
    )
}

export default ModalHeaderData