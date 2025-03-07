import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    heading: string
    description: string
}

function StepWrapper({ heading, description, children }: Props) {
    return (
        <Flex direction="column" gap={12} role="group" aria-labelledby={`${heading}-heading`}>
            <Box>
                <Heading as="h2" fontSize={28} fontWeight={700} color="#FFF">
                    {heading}
                </Heading>
                <Text marginTop={1} color="#B1B1B1">
                    {description}
                </Text>
            </Box>

            <Box>
                {children}
            </Box>
        </Flex>
    )
}

export default StepWrapper