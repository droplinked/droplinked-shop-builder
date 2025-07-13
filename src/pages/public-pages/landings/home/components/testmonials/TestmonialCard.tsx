import { Box, Flex, Text } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import React from 'react'
import QouteIcon from '../../svgs/QouteIcon'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function TestmonialCard({ feedback, name, image, time, ...flexProps }) {
    const { isRTL } = useLocaleResources('homePage')

    return (
        <Flex
            height="100%"
            flexDirection="column"
            gap="48px"
            border="1px solid"
            borderColor="neutral.gray.900"
            borderRadius={16}
            padding={{ base: 4, xl: 6 }}
            background="neutral.websiteBackground"
            zIndex={1}
            {...flexProps}
        >
            <Text
                height={{ base: "max-content", md: "112px", lg: "156px" }}
                color="text.white"
                fontSize={{ base: "14px", xl: "16px" }}
                fontWeight={500}
            >
                {feedback}
            </Text>

            <Flex alignItems="center" gap={4} marginTop="auto">
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

                <QouteIcon style={isRTL ? { marginRight: "auto" } : { marginLeft: "auto" }} />
            </Flex>
        </Flex>
    )
}
