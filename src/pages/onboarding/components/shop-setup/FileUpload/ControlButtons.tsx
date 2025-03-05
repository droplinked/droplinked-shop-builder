import { Flex, IconButton } from "@chakra-ui/react";
import { Refresh1Md } from "assets/icons/Action/Refresh1/Refresh1Md";
import { TrashMd } from "assets/icons/Action/Trash/TrashMd";
import React from "react";

interface ControlButtonsProps {
    onEdit: (e: React.MouseEvent) => void
    onRemove: (e: React.MouseEvent) => void
}

const ControlButtons = ({ onEdit, onRemove }: ControlButtonsProps) => (
    <Flex position="absolute" top={2} right={2} gap={2}>
        <IconButton
            aria-label="Edit image"
            icon={<Refresh1Md color="#fff" />}
            background={"#292929"}
            _hover={{ background: "#292929" }}
            borderRadius={8}
            onClick={onEdit}
        />
        <IconButton
            aria-label="Delete image"
            icon={<TrashMd color="#fff" />}
            background={"#292929"}
            _hover={{ background: "#292929" }}
            borderRadius={8}
            onClick={onRemove}
        />
    </Flex>
);

export default ControlButtons;
