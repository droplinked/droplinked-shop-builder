import { Box, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from "react"

interface Props {
    title: string;
    description?: string;
    badge?: React.ReactNode;
    rightContent?: React.ReactNode;
    children: React.ReactNode;
}

function SectionContainer({ title, badge, rightContent, description, children }: Props) {
    return (
        <Flex my={{ base: "24px", md: "36px", lg: "48px" }} width={"100%"} flexDirection={"column"}>
            <Flex gap={4} alignItems={"center"}>
                <AppTypography fontSize={{ base: "18px", md: "20px" }} fontWeight={700} color={"#fff"}>{title}</AppTypography>
                {badge && badge}
            </Flex>
            <Flex width={"100%"} gap={4} justifyContent={"space-between"} alignItems={"center"}>
                <Box flex={1} marginTop={"6px"}>
                    <AppTypography color={"#7B7B7B"} fontSize={{ base: "14px", md: "16px" }}>
                        {description && description}
                    </AppTypography>
                </Box>
                {rightContent && rightContent}
            </Flex>
            <Flex gap={{ base: "24px", md: "36px", lg: "48px" }} my={{ base: "24px", md: "36px", lg: "48px" }}>
                {children}
            </Flex>
        </Flex>
    );
}

export default SectionContainer;