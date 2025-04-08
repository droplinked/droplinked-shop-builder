import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends FlexProps {
    isDisabled?: boolean
}

function DateRangeNavButton({ isDisabled, children, ...rest }: Props) {
    return (
        <Flex
            as="button"
            alignItems="center"
            gap={1}
            padding="8px 12px"
            fontSize={12}
            fontWeight={500}
            color={isDisabled ? 'neutral.gray.650' : 'neutral.white'}
            {...rest}
        >
            {children}
        </Flex>
    )
}

export default DateRangeNavButton