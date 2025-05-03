import { Flex, Grid, Image, Text } from '@chakra-ui/react'
import { ExternalarrowMd } from 'assets/icons/Navigation/ExternalArrow/ExternalarrowMd'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
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
                    leftIcon: <PlusMd />,
                    onClick: () => navigate("/analytics/products")
                },
                {
                    label: 'Help Center',
                    variant: 'outline',
                    rightIcon: <ExternalarrowMd color='white' />,
                    onClick: () => window.open('https://droplinked.gitbook.io/droplinked-store-front-help-center/getting-started/add-product-to-storefronts', '_blank')
                }
            ]
        },
        {
            title: 'Selling on droplinked',
            description: 'Follow the step-by-step guide to launch products and reach leads and customers quickly.',
            image: 'https://upload-file-droplinked.s3.amazonaws.com/53880683c003dd15969e20c32c0ab979c30ccef7e7bf13b3159b7732ae88cf9d.png',
            buttons: [
                {
                    label: 'Learn More',
                    variant: 'outline',
                    rightIcon: <ExternalarrowMd color='white' />,
                    onClick: () => window.open('https://droplinked.gitbook.io/droplinked-store-front-help-center/getting-started/add-product-to-storefronts', '_blank')
                }
            ]
        },
        {
            title: 'Customizable Themes',
            description: 'Customize a commerce experience based on an optimal experience and design for visitors.',
            image: 'https://upload-file-droplinked.s3.amazonaws.com/8e205b784bd27ca7be9755d9fe1ede886eb9b05d84bf16d5e6819abd9a509adf.png',
            buttons: [
                { label: 'Get Started', variant: 'primary', onClick: () => navigate("/analytics/settings/design") }
            ]
        }
    ]

    return (
        <Grid
            templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
            gap={{ base: 4, "2xl": 6 }}
        >
            {cardsData.map((feature, index) =>
                <FeatureCard
                    key={index}
                    {...feature}
                    gridRow={index === 0 ? { lg: "1 / 3" } : "unset"}
                />
            )}
        </Grid>
    )
}

function FeatureCard({ title, description, image, buttons, ...rest }) {
    return (
        <Flex
            height="100%"
            direction="column"
            border="1px solid"
            borderColor="neutral.gray.800"
            borderRadius={16}
            overflow="hidden"
            {...rest}
        >
            <Flex direction="column" gap={1} padding={{ base: 4, xl: 6 }}>
                <Text fontSize={{ base: 18, xl: 20 }} fontWeight={700} color="white">
                    {title}
                </Text>
                <Text fontSize={{ base: 14, xl: 16 }} color="text.subtext.placeholder.dark">
                    {description}
                </Text>
                <Flex mt={3} gap={3}>
                    {buttons.map((button) => (
                        <Button
                            key={button.label}
                            fontSize={{ base: 12, md: 14 }}
                            fontWeight={500}
                            {...button}
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