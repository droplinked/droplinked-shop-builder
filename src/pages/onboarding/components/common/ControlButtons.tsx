import { Flex } from '@chakra-ui/react'
import { ArrowrightMd } from 'assets/icons/Navigation/ArrowRight/ArrowrightMd'
import AppTypography from 'components/common/typography/AppTypography'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/onboarding/ar.json'
import enLocale from 'locales/onboarding/en.json'
import AppButton from 'components/redesign/button/AppButton'
import React, { useState } from 'react'

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
    continueText,
    backText,
    isLoading: externalLoading = false,
    showBackButton = true,
}) => {
    const [internalLoading, setInternalLoading] = useState(false)
    const { t } = useLocaleResources('onboarding', {
        en: enLocale,
        ar: arLocale
    })

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
                    color='white'
                    fontWeight='400'
                    fontSize='14px'
                >
                    {t('common.skipForNow')}
                </AppTypography>
            )}
            <Flex marginLeft="auto" gap={4}>
                {showBackButton &&
                    <AppButton
                        variant='secondary'
                        onClick={onBack}
                        isDisabled={isButtonLoading}
                    >
                        {backText || t('common.back')}
                    </AppButton>
                }
                <AppButton
                    onClick={handleSubmit}
                    rightIcon={<ArrowrightMd />}
                    isLoading={isButtonLoading}
                >
                    {continueText || t('common.continue')}
                </AppButton>
            </Flex>
        </Flex>
    )
}

export default ControlButtons
