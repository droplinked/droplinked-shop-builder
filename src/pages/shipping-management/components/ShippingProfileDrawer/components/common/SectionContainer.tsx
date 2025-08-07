import { Flex, Text } from '@chakra-ui/react'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    title: string
    description?: string
    rightAction?: React.ReactNode
}

function SectionContainer({ title, description, rightAction, children }: Props) {
    return (
        <RuledGrid
            columns={1}
            borderRadius={8}
        >
            <Flex padding="12px 16px" backgroundColor="neutral.gray.1000">
                <Text color="text.white">{title}</Text>
                <Text>{description}</Text>
                {rightAction}
            </Flex>
            {children}
        </RuledGrid>
    )
}

export default SectionContainer