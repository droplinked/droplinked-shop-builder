import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { LinkLg } from 'assets/icons/Action/Link/LinkLg'
import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { ShirtLg } from 'assets/icons/Items/Shirt/ShirtLg'
import { Layer1Lg } from 'assets/icons/System/Layer1/Layer1Lg'
import AppImage from 'components/common/image/AppImage'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import { ProductCardData } from 'pages/onboarding/types/onboarding'
import React, { useState } from 'react'

const iconMap = {
    physical: <BoxLg color="#179EF8" />,
    digital: <Layer1Lg color="#9C4EFF" />,
    print: <ShirtLg color="#2BCFA1" />,
    nft: <LinkLg color="#FFD951" />
}

function ProductCard({ card }: { card: ProductCardData }) {
    const { iconType, frontTitle, frontDescription, frontBackgroundImage, backBackgroundImage } = card
    const [isFlipped, setIsFlipped] = useState(false)

    return (
        <Box
            width="100%"
            aspectRatio={1}
            sx={{ position: 'relative', perspective: '1000px' }} // Perspective for 3D effect
            onMouseEnter={() => setIsFlipped(true)} // Flip on hover
            onMouseLeave={() => setIsFlipped(false)} // Revert on hover out
        >
            {/* Flip Container */}
            <Box
                width="100%"
                height="100%"
                sx={{
                    position: 'absolute',
                    transformStyle: 'preserve-3d', // Preserve 3D transforms
                    transition: 'transform 0.6s', // Smooth flip animation
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
            >
                {/* Front Side */}
                <Flex
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
                    sx={{
                        position: 'absolute',
                        backfaceVisibility: 'hidden' // Hides back when front is visible
                    }}
                >
                    <IconWrapper icon={iconMap[iconType]} />

                    <Box>
                        <Heading as="h2" fontSize={24} color="#FFF">{frontTitle}</Heading>
                        <Text marginTop={1} color="#B1B1B1">{frontDescription}</Text>
                    </Box>
                </Flex>

                {/* Back Side with Image */}
                <AppImage
                    width="100%"
                    height="100%"
                    borderRadius={16}
                    src={backBackgroundImage}
                    objectFit="contain"
                    sx={{
                        position: 'absolute',
                        transform: 'rotateY(180deg)', // Rotates back side to face away initially
                        backfaceVisibility: 'hidden' // Hides front when back is visible
                    }}
                />
            </Box>
        </Box>
    )
}

export default ProductCard