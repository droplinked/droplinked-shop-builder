import { Flex, Text } from '@chakra-ui/react'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    title: string | React.ReactNode
    description?: string
    rightAction?: React.ReactNode
}

function SectionContainer({ title, description, rightAction, children }: Props) {
    return (
        <RuledGrid
            columns={1}
            borderRadius={8}
        >
            <Flex
                justifyContent="space-between"
                gap={4}
                padding="12px 16px"
                backgroundColor="neutral.gray.1000"
            >
                <DotSeparatedList>
                    {typeof title === "string"
                        ? <Text color="text.white">{title}</Text>
                        : title
                    }
                    {description && <Text fontSize={14} color="text.subtext.placeholder.dark">{description}</Text>}
                </DotSeparatedList>

                {rightAction}
            </Flex>
            {children}
        </RuledGrid>
    )
}

export default SectionContainer