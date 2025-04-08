import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import React from 'react'

function StarRating({ rate = 0 }: { rate?: number }) {
    return (
        <Flex alignItems="center">
            {
                Array.from({ length: 5 }).map((_, index) =>
                    index < rate ?
                        <AppIcons.GoldenStar /> :
                        <AppIcons.OutlinedStar width={16} height={16} />
                )
            }
        </Flex>
    )
}

export default StarRating