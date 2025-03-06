import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import { ArrowrightMd } from 'assets/icons/Navigation/ArrowRight/ArrowrightMd'
import React from 'react'

interface ControlButtonsProps {
    onBack: () => void;
    onSubmit: () => void;
}

export default function ControlButtons({ onBack, onSubmit }: ControlButtonsProps) {
    const handleClick = (e) => {
        e.preventDefault()
        onSubmit()
    }

    return (
        <Flex justifyContent="end" gap={4}>
            <Button
                fontWeight={500}
                variant='secondary'
                onClick={onBack}
            >
                Back
            </Button>
            <Button
                fontWeight={500}
                variant='primary'
                onClick={handleClick}
                rightIcon={<ArrowrightMd />}
            >
                Continue
            </Button>
        </Flex>
    )
}
