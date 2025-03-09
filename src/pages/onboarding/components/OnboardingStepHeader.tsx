import { Flex, FlexProps, Heading, Text } from '@chakra-ui/react'
import React from 'react'

interface Props extends FlexProps {
    heading: string
    description: string
}

function OnboardingStepHeader({ heading, description, ...rest }: Props) {
    return (
        <Flex direction='column' gap={1} {...rest}>
            <Heading as='h2' fontSize={28} fontWeight={700} color='#FFF'>
                {heading}
            </Heading>
            <Text color='#B1B1B1'>
                {description}
            </Text>
        </Flex>
    )
}

export default OnboardingStepHeader