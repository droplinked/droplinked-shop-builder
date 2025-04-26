import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import { ArrowrightMd } from 'assets/icons/Navigation/ArrowRight/ArrowrightMd'
import React, { useState } from 'react'
import AppTypography from 'components/common/typography/AppTypography'

interface ControlButtonsProps {
    onBack: () => void
    onSubmit: () => void | Promise<void>
    onSkip?: (() => void) | null
    continueText?: string
    backText?: string
    isLoading?: boolean
    showBackButton?: boolean
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
    onBack,
    onSubmit,
    onSkip = null,
    continueText = "Continue",
    backText = "Back",
    isLoading: externalLoading = false,
    showBackButton = true,
}) => {
    const [internalLoading, setInternalLoading] = useState(false)

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()
        setInternalLoading(true)
        try {
            await onSubmit()
        } finally {
            setInternalLoading(false)
        }
    }

    const isButtonLoading = externalLoading || internalLoading

    return (
        <Flex width="100%" justifyContent="space-between" alignItems="center" paddingBlockEnd={{ base: "75px", lg: 0 }}>
            {onSkip && (
                <AppTypography
                    as={"button"}
                    onClick={onSkip}
                    paddingInline="0px"
                >
                    Skip for Now
                </AppTypography>
            )}
            <Flex marginLeft="auto" gap={4}>
                {showBackButton &&
                    <AppButton
                        fontWeight={500}
                        variant='secondary'
                        onClick={onBack}
                        isDisabled={isButtonLoading}
                    >
                        {backText}
                    </AppButton>
                }
                <AppButton
                    onClick={handleSubmit}
                    rightIcon={<ArrowrightMd />}
                    isLoading={isButtonLoading}
                >
                    {continueText}
                </AppButton>
            </Flex>
        </Flex>
    )
}

export default ControlButtons
