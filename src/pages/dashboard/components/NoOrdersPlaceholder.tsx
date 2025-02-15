import { Flex, Grid, Image, SimpleGrid, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Button from 'components/redesign/button/Button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NoOrdersPlaceholder() {
    const navigate = useNavigate()

    const cardsData = [
        {
            title: 'Importing Products',
            description: 'Create product listings within the interface or import existing inventory.',
            image: 'https://upload-file-droplinked.s3.amazonaws.com/f15e8bdf6bbeab13294155b4259324976494cfa30c40dddc7673aba705858c8a.png',
            buttons: [
                {
                    label: 'First Product',
                    variant: 'primary',
                    leftIcon: <AppIcons.BlackPlus />,
                    onClick: () => navigate("/analytics/products"),
                },
                {
                    label: 'Help Center',
                    variant: 'outline',
                    rightIcon: <AppIcons.ExternalArrow />,
                    onClick: () => console.log('Help Center clicked'),
                },
            ],
        },
        {
            title: 'Selling on droplinked',
            description: 'Follow the step-by-step guide to launch products and reach leads and customers quickly.',
            image: 'https://upload-file-droplinked.s3.amazonaws.com/53880683c003dd15969e20c32c0ab979c30ccef7e7bf13b3159b7732ae88cf9d.png',
            buttons: [
                {
                    label: 'Learn More',
                    variant: 'outline',
                    rightIcon: <AppIcons.ExternalArrow />,
                    onClick: () => console.log('Learn More clicked'),
                },
            ],
        },
        {
            title: 'Customizable Themes',
            description: 'Customize a commerce experience based on an optimal experience and design for visitors.',
            image: 'https://upload-file-droplinked.s3.amazonaws.com/8e205b784bd27ca7be9755d9fe1ede886eb9b05d84bf16d5e6819abd9a509adf.png',
            buttons: [
                {
                    label: 'Get Started',
                    variant: 'primary',
                    onClick: () => navigate("/analytics/settings/design"),
                },
            ],
        },
    ]

    return (
        <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            alignItems="start"
            gap={{ base: 4, xl: 6 }}
        >
            <FeatureCard {...cardsData[0]} />
            <SimpleGrid height="full" gap="inherit">
                {cardsData.slice(1).map((feature) => (
                    <FeatureCard key={feature.title} {...feature} />
                ))}
            </SimpleGrid>
        </Grid>
    )
}

function FeatureCard({ title, description, image, buttons, ...rest }) {
    return (
        <Flex
            height="100%"
            direction="column"
            border="1px solid #222"
            borderRadius={16}
            overflow="hidden"
            gap={{ base: 4, md: 0 }}
            {...rest}
        >
            <Flex height="100%" direction="column" gap={1} padding={{ base: 4, lg: 6 }}>
                <Text fontSize={{ base: 18, md: 20 }} fontWeight={700} color="white">
                    {title}
                </Text>
                <Text fontSize={{ base: 14, md: 16 }} color="#7B7B7B">
                    {description}
                </Text>
                <Flex gap={3} mt={3}>
                    {buttons.map((button) => (
                        <Button
                            key={button.label}
                            {...button}
                            fontSize={{ base: 12, md: 14 }}
                            sx={{ svg: { boxSize: 5 } }}
                        >
                            {button.label}
                        </Button>
                    ))}
                </Flex>
            </Flex>
            <Image src={image} alt={title} />
        </Flex>
    )
}