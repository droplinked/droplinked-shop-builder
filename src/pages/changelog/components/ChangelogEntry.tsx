import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { ExternalarrowMd } from 'assets/icons/Navigation/ExternalArrow/ExternalarrowMd'
import InteractiveText from 'pages/onboarding/components/common/InteractiveText'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import ChangelogBadge from './ChangelogBadge'

function ChangelogEntry() {
    const navigate = useNavigate()

    return (
        <Flex
            direction={{ base: "column", lg: "row" }}
            padding={{ base: 4, md: 6, lg: 4, "2xl": 6 }}
            gap={{ base: 6, "2xl": 12, "3xl": 20 }}
        >
            <Flex minW="200px" direction="column" gap={1}>
                <Text fontSize={{ base: 16, xl: 18 }} fontWeight={500} color="text.subtextPlaceholder.light">
                    August 21, 2025
                </Text>
                <Text fontSize={{ base: 14, xl: 16 }} color="text.subtextPlaceholder.dark">
                    3 days ago
                </Text>
            </Flex>

            <Box>
                <Heading as="h3" marginBottom={3} fontSize={{ base: 18, xl: 20 }} color="text.white">
                    Update 1.0.2
                </Heading>

                <Flex marginBottom={6} flexWrap="wrap" gap={2}>
                    {["integration", "new feature", "deprecation", "improvement", "bugfix"].map((item, index) =>
                        <ChangelogBadge key={index} label={item} />
                    )}
                </Flex>

                <Heading as="h3" marginBottom={1} fontSize={{ base: 16, xl: 18 }} color="text.white">
                    Post title
                </Heading>

                <Text marginBottom={3} noOfLines={2} fontSize={{ base: 14, xl: 16 }} color="text.subtextPlaceholder.light">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                </Text>

                <InteractiveText
                    iconRight={<ExternalarrowMd color="#179ef8" />}
                    onClick={() => console.log("read more")}
                >
                    Read More
                </InteractiveText>
            </Box>
        </Flex>
    )
}

export default ChangelogEntry