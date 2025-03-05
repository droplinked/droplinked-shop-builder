import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import { ArrowrightMd } from 'assets/icons/Navigation/ArrowRight/ArrowrightMd'
import React from 'react'
import { useFormikContext } from 'formik';

interface ControlButtonsProps {
    onBack: () => void;
}

export default function ControlButtons({ onBack }: ControlButtonsProps) {
    const { handleSubmit } = useFormikContext()

    const handleClick = (e) => {
        e.preventDefault()
        handleSubmit()
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
