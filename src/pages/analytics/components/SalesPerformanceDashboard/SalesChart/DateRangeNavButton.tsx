import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'

function DateRangeNavButton({ ...props }: ButtonProps) {
    const { isDisabled, children, ...rest } = props

    return (
        <Button
            variant='normal'
            alignItems="center"
            gap={1}
            padding="8px 12px"
            fontSize={12}
            fontWeight={500}
            color={isDisabled ? 'neutral.gray.650' : 'neutral.white'}
            {...rest}
        >
            {children}
        </Button>
    )
}

export default DateRangeNavButton