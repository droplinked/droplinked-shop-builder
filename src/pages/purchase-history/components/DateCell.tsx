import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { formattedDate, formattedTime } from '../helpers'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'

export default function DateCell({ date }: { date: Date }) {
    return (
        <Flex gap={4} alignItems={"center"} justifyContent="space-between">
            <DotSeparatedList>
                <Text fontSize={14} color="#fff">{formattedDate(date)}</Text>
                <Text fontSize={14} color="#fff">{formattedTime(date)}</Text>
            </DotSeparatedList>
        </Flex>
    )
}
