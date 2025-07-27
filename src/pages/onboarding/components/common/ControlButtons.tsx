import { Flex } from '@chakra-ui/react'
import { ArrowleftMd } from 'assets/icons/Navigation/ArrowLeft/ArrowleftMd'
import { ArrowrightMd } from 'assets/icons/Navigation/ArrowRight/ArrowrightMd'
import AppTypography from 'components/common/typography/AppTypography'
import AppButton from 'components/redesign/button/AppButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useState } from 'react'

interface ControlButtonsProps {
    onBack: () => void
    onSubmit: () => void | Promise<void>
    onSkip?: (() => void) | null
    continueText?: string
    isLoading?: boolean
    showBackButton?: boolean
    backText?: string
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
    onBack,
    onSubmit,
    onSkip = null,
    continueText,
    backText,
    isLoading: externalLoading = false,
    showBackButton = true,
}) => {
    const [internalLoading, setInternalLoading] = useState(false)
    const { t, isRTL } = useLocaleResources('onboarding')

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()
        setInternalLoading(true)
        try {
            await onSubmit()
        }
        finally {
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
                    color='white'
                    fontWeight='400'
                    fontSize='14px'
                >
                    {t('common.skipForNow')}
                </AppTypography>
            )}
            <Flex marginInlineStart="auto" gap={4}>
                {showBackButton &&
                    <AppButton
                        variant='secondary'
                        onClick={onBack}
                        isDisabled={isButtonLoading}
                    >
                        {backText || t('common:back')}
                    </AppButton>
                }
                <AppButton
                    onClick={handleSubmit}
                    rightIcon={isRTL ? <ArrowleftMd /> : <ArrowrightMd />}
                    isLoading={isButtonLoading}
                >
                    {continueText || t('common:continue')}
                </AppButton>
            </Flex>
        </Flex>
    )
}

export default ControlButtons
