import { Text } from '@chakra-ui/react'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import React from 'react'
import { formattedDate, formattedTime } from '../helpers'

export default function DateCell({ date }: { date: Date }) {
    return (
        <DotSeparatedList gap={4}>
            <Text fontSize={14} color="#fff">{formattedDate(date)}</Text>
            <Text fontSize={14} color="#fff">{formattedTime(date)}</Text>
        </DotSeparatedList>
    )
}
