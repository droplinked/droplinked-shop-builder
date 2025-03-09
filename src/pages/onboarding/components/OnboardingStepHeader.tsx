import { Flex, FlexProps, Heading, Text, useMediaQuery } from '@chakra-ui/react'
import React from 'react'

interface Props extends FlexProps {
    heading: string
    description: string
    rightContent?: () => React.JSX.Element
}

function OnboardingStepHeader({ heading, description, rightContent, ...rest }: Props) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")

    return (
        <Flex
            justifyContent="space-between"
            flexDirection={isSmallerThan768 ? "column" : "row"}
            gap={4}
            {...rest}
        >
            <Flex direction="column" gap={1}>
                <Heading as="h2" fontSize={28} fontWeight={700} color="#FFF">
                    {heading}
                </Heading>
                <Text color="#B1B1B1">
                    {description}
                </Text>
            </Flex>
            {rightContent && rightContent()}
        </Flex>
    )
}

export default OnboardingStepHeader