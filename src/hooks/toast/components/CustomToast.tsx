import React from "react";
import { toast } from "sonner";
import {
    Box,
    Flex,
    Text,
    CloseButton,
    useMediaQuery
} from "@chakra-ui/react";
import { InformationMd } from "assets/icons/Sign/Information/InformationMd";

type ToastType = "success" | "error" | "info" | "warning";

interface CustomToastProps {
    id: string | number;
    title: string;
    description?: string;
    type: ToastType;
}

export const CustomToast = (props: CustomToastProps) => {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
    const { id, title, description, type } = props;

    const bgColor = {
        success: "#003E68",
        error: "#670010",
        info: "#222",
        warning: "#B77B00",
    }[type];

    const borderColor = {
        success: "#179EF8",
        error: "#F24",
        info: "#333",
        warning: "#FFD951",
    }[type];

    const Icon = InformationMd

    return (
        <Box
            borderRadius="8px"
            bg={bgColor}
            border="1px solid"
            borderColor={borderColor}
            boxShadow="md"
            width="full"
            minWidth={isSmallerThan768 ? "100%" : "350px"}
            maxWidth="400px"
            p={4}
        >
            <Flex alignItems={description ? "flex-start" : "center"}>
                <Box color={borderColor} mt={1} mr={3}>
                    <Icon color="#fff" />
                </Box>
                <Box flex="1">
                    <Text fontWeight="700" fontSize={14} color={"#fff"}>
                        {title}
                    </Text>
                    {description && (
                        <Text mt={1} fontSize={14} fontWeight={400} color={"#fff"}>
                            {description}
                        </Text>
                    )}
                </Box>
                <CloseButton
                    size="sm"
                    ml={2}
                    color={"#fff"}
                    onClick={() => toast.dismiss(id)}
                />
            </Flex>
        </Box>
    );
};
