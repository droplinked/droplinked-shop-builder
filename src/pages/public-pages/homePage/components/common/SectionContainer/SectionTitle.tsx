import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Icon } from './IconMapper';
import TitleLeftIllustration from 'pages/public-pages/homePage/svgs/TitleLeftIllustration';
import TitleRightIllustration from 'pages/public-pages/homePage/svgs/TitleRightIllustration';

interface Props {
    sectionTitle?: string;
    icon: Icon
}

export default function SectionTitle({ sectionTitle, icon }: Props) {
    if (!sectionTitle) return null;

    return (
        <Box
            minWidth={{ base: "80%", md: "376px" }}
            position="relative"
            top="-10px"
            background="neutral.websiteBackground"
            {...(icon && {
                _before: {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(to right, transparent, rgba(43, 207, 161, 0.75) 50%, transparent)",
                }
            })}
        >
            <Flex
                justifyContent="center"
                alignItems="center"
                gap={2}
                paddingBlockStart={icon ? "40px" : "24px"}
                paddingBlockEnd={icon ? { base: 2, xl: 4 } : "24px"}
            >
                <TitleLeftIllustration />
                <Text
                    color="text.primary"
                    fontSize={12}
                >
                    {sectionTitle}
                </Text>
                <TitleRightIllustration />
            </Flex>
        </Box>
    )
}
