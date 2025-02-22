import { Box, Flex, Text } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import React, { PropsWithChildren } from "react";

export interface SectionContainerProps extends PropsWithChildren {
    title: string
    onNavigate?: () => void
}

function SectionContainer({ title, onNavigate, children }: SectionContainerProps) {
    return (
        <Box
            flex={1}
            border="1px solid #292929"
            borderRadius={16}
            overflow="hidden"
        >
            {/* Header with Title and Link */}
            <Flex
                justifyContent="space-between"
                alignItems="center"
                gap={4}
                borderBottom="1px solid #292929"
                padding={4}
                bgColor="#1C1C1C"
            >
                <Text fontSize={{ base: 16, lg: 18 }} fontWeight={500} color="#fff">
                    {title}
                </Text>
                {onNavigate && (
                    <button onClick={onNavigate}>
                        <AppIcons.ExternalArrow />
                    </button>
                )}
            </Flex>

            {/* Children (Content of the Section) */}
            {children}
        </Box>
    )
}

export default SectionContainer