import { Flex, Text } from '@chakra-ui/react'
import { AsteriskSm } from 'assets/icons/Sign/Asterisk/AsteriskSm'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    label: string
    description?: string
    required?: boolean
}

function LabeledContent({ label, description, children, required }: Props) {
    return (
        <Flex direction="column">
            <Text
                display="flex"
                alignItems="center"
                gap={1}
                marginBottom={description ? 1 : 4}
                fontSize={16}
                fontWeight={500}
                color="text.white"
            >
                {label}
                {required && <AsteriskSm color='#ff2244' width={12} height={12} />}
            </Text>
            {description && <Text marginBottom={4} fontSize={14} color="text.subtext.placeholder.dark">{description}</Text>}
            {children}
        </Flex>
    )
}

export default LabeledContent