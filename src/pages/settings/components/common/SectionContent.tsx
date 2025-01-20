import { Box, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from "react"

interface Props {
    title: string;
    description?: string;
    badge?: React.ReactNode;
    rightContent?: React.ReactNode;
    children?: React.ReactNode;
}

function SectionContent({ title, badge, rightContent, description, children }: Props) {
    return (
        <Flex width={"100%"} gap={{ base: 4, lg: "48px", xl: "80px" }} justifyContent={"space-between"} flexDirection={{ base: "column", lg: "row" }} alignItems={"start"}>
            <Flex width={{ base: "100%", lg: "50%" }} flexDirection={"column"}>
                <Flex gap={4} alignItems={"center"}>
                    <AppTypography width={"max-content"} fontSize={{ base: "16px", md: "18px" }} fontWeight={500} color={"#fff"}>{title}</AppTypography>
                    {badge && badge}
                </Flex>
                <Box flex={1} marginTop={"4px"}>
                    <AppTypography whiteSpace={"break-spaces"} color={"#7B7B7B"} fontSize={{ base: "14px", md: "16px" }}>
                        {description && description}
                    </AppTypography>
                </Box>
                <Flex mt={1}>
                    {children}
                </Flex>
            </Flex>
            <Box width={"100%"}>
                {rightContent && rightContent}
            </Box>
        </Flex>
    );
}

export default SectionContent;