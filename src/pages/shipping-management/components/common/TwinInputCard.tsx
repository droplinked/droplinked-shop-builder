import { Flex, Text } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    label: string
    description?: string
}

function TwinInputCard({ label, description, children }: Props) {
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
                <AppIcons.Required />
            </Text>
            {description && <Text marginBottom={4} fontSize={14} color="text.subtext.placeholder.dark">{description}</Text>}
            {children}
        </Flex>
    )
}

export default TwinInputCard