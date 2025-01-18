import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';

interface ActionButtonsProps {
    onEdit: () => void;
    onDelete: () => void;
    isEditing: boolean;
    isSingleWallet: boolean;
}

export const ActionButtons = ({ onEdit, onDelete, isEditing, isSingleWallet }: ActionButtonsProps) => (
    <Flex gap={3} alignItems={"center"}>
        {/* Edit button is disabled during editing mode */}
        <Box
            as="button"
            type='button'
            onClick={onEdit}
            opacity={isEditing ? 0.5 : 1}
            cursor={isEditing ? "not-allowed" : "pointer"}
        >
            <AppIcons.Edit style={{ width: "24px", height: "24px" }} />
        </Box>
        {/* Delete button is disabled when this is the only wallet */}
        <Box
            as="button"
            type='button'
            onClick={onDelete}
            opacity={isSingleWallet ? 0.5 : 1}
            cursor={isSingleWallet ? "not-allowed" : "pointer"}
        >
            <AppIcons.RedTrash style={{ width: "24px", height: "24px" }} />
        </Box>
    </Flex>
);
