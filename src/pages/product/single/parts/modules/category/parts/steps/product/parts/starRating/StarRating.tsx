import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'

function StarRating({ rate }: { rate: number }) {
    return (
        <Flex alignItems="center" gap={1}>
            {
                Array.from({ length: 5 }).map((_, index) =>
                    index < rate ? <AppIcons.OutlinedStar /> : <AppIcons.GrayOutlineStar />
                )
            }
        </Flex>
    )
}

export default StarRating