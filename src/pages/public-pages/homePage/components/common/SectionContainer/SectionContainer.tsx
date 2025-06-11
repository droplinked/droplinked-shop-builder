import { Box, Text, Heading, Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'
import IconMapper, { Icon } from './IconMapper'
import SectionTitle from './SectionTitle';

interface Props {
    children?: React.ReactNode;
    sectionTitle?: string;
    headingTitle?: string;
    headingSubtitle?: string;
    subTitleElement?: React.ReactNode;
    icon?: Icon;
    typographyText?: string;
    flexProps?: FlexProps;
}

export default function SectionContainer({ children, sectionTitle, headingTitle, headingSubtitle, subTitleElement, icon, typographyText, flexProps }: Props) {
    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            paddingBlock={{ base: "80px", "2xl": "128px" }}
            {...flexProps}
        >
            <IconMapper icon={icon as Icon} />
            <SectionTitle sectionTitle={sectionTitle} icon={icon} />

            {headingTitle && (
                <Heading as="h2" textAlign="center" mt={2} size="xl">
                    {headingTitle}
                </Heading>
            )}

            {headingSubtitle && (
                <Text mt={2} textAlign="center" color="gray.600">
                    {headingSubtitle}
                </Text>
            )}

            {subTitleElement && (
                <Box mt={2} textAlign="center">
                    {subTitleElement}
                </Box>
            )}

            {typographyText && (
                <Text mt={4} textAlign="center">
                    {typographyText}
                </Text>
            )}

            {children}
        </Flex>
    )
}
