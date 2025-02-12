import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'

interface DateRangeNavButtonProps extends FlexProps {
    isDisabled?: boolean
}

function DateRangeNavButton({ isDisabled, children, ...rest }: DateRangeNavButtonProps) {
    const colorValue = isDisabled ? '#4F4F4F' : '#FFF'

    return (
        <Flex
            as="button"
            alignItems="center"
            gap={1}
            padding="8px 12px"
            fontSize={12}
            fontWeight={500}
            color={colorValue}
            sx={{ svg: { boxSize: 4, path: { stroke: colorValue } } }}
            {...rest}
        >
            {children}
        </Flex>
    )
}

export default DateRangeNavButton