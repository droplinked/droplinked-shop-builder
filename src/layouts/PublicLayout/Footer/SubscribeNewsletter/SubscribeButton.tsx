import AppButton from "components/redesign/button/AppButton"
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from "react"

interface Props {
    isSubmitting: boolean
    isFullWidth?: boolean
}

function SubscribeButton({ isSubmitting, isFullWidth = false }: Props) {
    const { t } = useLocaleResources('common')

    return (
        <AppButton
            type="submit"
            size={isFullWidth ? "md" : "sm"}
            width={isFullWidth ? "100%" : "unset"}
            marginTop={isFullWidth ? 3 : "unset"}
            padding={isFullWidth ? "10px 14px" : "8px 12px"}
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
        >
            {t('subscribe')}
        </AppButton>
    )
}

export default SubscribeButton