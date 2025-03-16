import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import { ArrowrightMd } from 'assets/icons/Navigation/ArrowRight/ArrowrightMd'
import React from 'react'

interface ControlButtonsProps {
    onBack: () => void
    onSubmit: () => void
    onSkip?: (() => void) | null
    continueText?: string
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
    onBack,
    onSubmit,
    onSkip = null,
    continueText = "Continue"
}) => {
    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault()
        onSubmit()
    }

    return (
        <Flex width="100%" justifyContent="space-between" alignItems="center" paddingBlockEnd={{ base: "75px", lg: 0 }}>
            {onSkip && (
                <Button
                    variant='ghost'
                    onClick={onSkip}
                    paddingInline="0px"
                >
                    Skip for Now
                </Button>
            )}
            <Flex marginLeft="auto" gap={4}>
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
                    onClick={handleSubmit}
                    rightIcon={<ArrowrightMd />}
                >
                    {continueText}
                </Button>
            </Flex>
        </Flex>
    )
}

export default ControlButtons
