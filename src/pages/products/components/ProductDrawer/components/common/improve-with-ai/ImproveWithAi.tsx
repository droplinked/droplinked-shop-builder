import { ChakraProps, Flex, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import Button from "components/redesign/button/Button";
import React from "react";

interface Props {
    handleSelectItem?: (item: string) => void;
    isLoading?: boolean;
    isLoaded?: boolean;
    BoxStyles?: ChakraProps;
}

export default function ImproveWithAi({ handleSelectItem, isLoading, isLoaded, BoxStyles }: Props) {
    const { onOpen, isOpen, onClose } = useDisclosure();

    return (
        <Flex {...BoxStyles}>
            <Button
                variant="secondary"
                border={"1px solid #292929"}
                borderRadius={"4px"}
                background={"#1c1c1c"}
                fontSize={12}
                fontWeight={500}
                color={"#2bcfa1"}
                onClick={onOpen}
                leftIcon={<AppIcons.MagicWind width={"16px"} height={"16px"} />}
            >
                Improve With AI
            </Button>
        </Flex>
    );
}
