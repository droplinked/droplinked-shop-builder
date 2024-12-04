import { Badge, Center, Flex, Heading, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface ProductTypeCardProps {
    icon: ReactNode
    title: string
    description: string
    badge?: {
        text: string
        variant: string
    }
}

function ProductTypeCard({ icon, title, description, badge }: ProductTypeCardProps) {
    const getBadgeProps = (variant: string) => {
        const variants = {
            new: { bg: 'rgba(6, 78, 59, 0.5)', color: '#34D399' },
            soon: { bg: 'rgba(30, 58, 138, 0.5)', color: '#60A5FA' }
        }
        return variants[variant]
    }

    return (
        <Flex direction="column" padding={4}>
            <Center
                w="56px"
                h="56px"
                bg="#262626"
                borderRadius={8}
            >
                {icon}
            </Center>
            <Flex mt={4} alignItems="center" gap={2}>
                <Heading as="h3" fontSize={18} fontWeight={700} color="white">{title}</Heading>
                {badge && (
                    <Badge
                        px={2}
                        py={1}
                        borderRadius={4}
                        fontSize={12}
                        {...getBadgeProps(badge.variant)}
                    >
                        {badge.text}
                    </Badge>
                )}
            </Flex>
            <Text mt={1} fontSize={14} color="#7B7B7B">{description}</Text>
        </Flex>
    )
}

export default ProductTypeCard