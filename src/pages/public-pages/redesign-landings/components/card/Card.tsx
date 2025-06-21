import { Box, Flex, Text } from "@chakra-ui/react";
import IconWrapper from "components/redesign/icon-wrapper/IconWrapper";
import React from "react";

interface Props {
    icon: React.ReactNode;
    title: string;
    description: string;
    animation?: React.ReactNode;
    gridColumn?: string | { base?: string; md?: string; lg?: string };
}

export default function Card({ icon, title, description, animation, gridColumn }: Props) {
    return (
        <Flex
            flexDirection="column"
            border="1px solid"
            borderColor="neutral.gray.900"
            borderRadius={16}
            gridColumn={gridColumn}
        >
            <Flex flexDirection="column" gap={4} p={6}>
                <IconWrapper
                    border="1px solid"
                    borderColor="neutral.gray.900"
                    background="neutral.background"
                    icon={icon}
                />
                <Box>
                    <Text fontSize={20} fontWeight={500} color="text.white" mb={1}>
                        {title}
                    </Text>
                    <Text
                        fontSize={16}
                        fontWeight={400}
                        color="text.subtext.placeholder.dark"
                        mb={1}
                    >
                        {description}
                    </Text>
                </Box>
            </Flex>
            {animation}
        </Flex>
    );
}