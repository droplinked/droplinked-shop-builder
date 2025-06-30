import { Box, Flex, Text } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import React from 'react'
import QouteIcon from '../../svgs/QouteIcon'

export default function TestmonialCard({ feedback, name, image, time, ...flexProps }) {
    return (
        <Flex
            flexDirection="column"
            p={{ base: 4, xl: 6 }}
            border="1px solid"
            borderColor="neutral.gray.900"
            borderRadius={16}
            zIndex={1}
            background="neutral.websiteBackground"
            gap="48px"
            height="100%"
            {...flexProps}
        >
            <Text
                fontSize={{ base: "14px", xl: "16px" }}
                fontWeight={500}
                color="text.white"
                height={{ base: "max-content", md: "112px", lg: "156px" }}
            >
                {feedback}
            </Text>

            <Flex marginTop="auto" alignItems="center" gap={4}>
                <AppImage
                    src={image}
                    alt={`${name} avatar`}
                    width="48px"
                    height="48px"
                    borderRadius="50%"
                />

                <Box>
                    <Text
                        fontSize={{ base: "14px", xl: "16px" }}
                        fontWeight={500}
                        color="text.white"
                        mb={1}
                    >
                        {name}
                    </Text>
                    <Text
                        fontSize="12px"
                        color="text.subtext.placeholder.dark"
                        mb={1}
                    >
                        {time}
                    </Text>
                </Box>

                <QouteIcon style={{ marginLeft: "auto" }} />
            </Flex>
        </Flex>
    )
}
