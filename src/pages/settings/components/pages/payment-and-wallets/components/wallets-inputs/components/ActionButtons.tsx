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
    <Flex gap={1} alignItems={"center"}>
        {/* Edit button is disabled during editing mode */}
        <Box
            as="button"
            type='button'
            onClick={onEdit}
            disabled={isEditing}
            _disabled={{ cursor: "not-allowed" }}
            sx={{ path: { stroke: isEditing ? "#4f4f4f" : "#fff" } }}
        >
            <AppIcons.Edit style={{ width: "24px", height: "24px" }} />
        </Box>
        {/* Delete button is disabled when this is the only wallet */}
        <Box
            as="button"
            type='button'
            onClick={onDelete}
            disabled={isSingleWallet}
            _disabled={{ cursor: "not-allowed" }}
            sx={{ path: { stroke: isSingleWallet ? "#4f4f4f" : "#FF2244" } }}
        >
            <AppIcons.RedTrash style={{ width: "24px", height: "24px" }} />
        </Box>
    </Flex>
);
