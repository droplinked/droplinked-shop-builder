import AppButton from "components/redesign/button/AppButton"
import React, { ReactElement } from "react"

interface Props {
    variant?: 'normal' | 'secondary'
    icon: ReactElement
    onClick?: () => void
    label: string
    isDisabled?: boolean
}

const ActionButton = ({ icon, onClick, label, variant = 'normal', isDisabled }: Props) => (
    <AppButton
        variant={variant}
        paddingBlock="10px"
        paddingInline="14px"
        fontSize={14}
        leftIcon={icon}
        onClick={onClick}
        disabled={isDisabled}
    >
        {label}
    </AppButton>
)

export default ActionButton