import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { LinkLg } from "assets/icons/Action/Link/LinkLg"
import { BoxLg } from "assets/icons/Finance/Box/BoxLg"
import { ShirtLg } from "assets/icons/Items/Shirt/ShirtLg"
import { Layer1Lg } from "assets/icons/System/Layer1/Layer1Lg"
import IconWrapper from "components/redesign/icon-wrapper/IconWrapper"
import React, { JSX } from "react"

// Icon mapping
const iconMap: Record<string, JSX.Element> = {
    physical: <BoxLg color="#179EF8" />,
    digital: <Layer1Lg color="#9C4EFF" />,
    print: <ShirtLg color="#2BCFA1" />,
    nft: <LinkLg color="#FFD951" />
}

interface Props {
    iconType: string
    frontTitle: string
    frontDescription: string
    frontBackgroundImage: string
}

function CardFront({ iconType, frontTitle, frontDescription, frontBackgroundImage }: Props) {
    return (
        <Flex
            as="section"
            width="100%"
            height="100%"
            flexDirection="column"
            justifyContent="space-between"
            border="1px solid #292929"
            borderRadius={16}
            padding={6}
            backgroundImage={frontBackgroundImage}
            backgroundSize="contain"
            backgroundPosition="top"
            sx={{ position: 'absolute', backfaceVisibility: 'hidden' }}
        >
            <IconWrapper icon={iconMap[iconType]} flexShrink={0} />
            <Box as="header">
                <Heading as="h2" fontSize={{ base: 18, xl: 24 }} color="#FFF">
                    {frontTitle}
                </Heading>
                <Text marginTop={1} fontSize={{ base: 14, xl: 16 }} color="#B1B1B1">
                    {frontDescription}
                </Text>
            </Box>
        </Flex>
    )
}

export default CardFront