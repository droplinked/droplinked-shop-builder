import Button from "components/redesign/button/Button"
import React, { ReactElement } from "react"

interface Props {
    variant?: 'primary' | 'secondary'
    icon: ReactElement
    onClick?: () => void
    label: string
    isDisabled?: boolean
}

const ActionButton = ({ icon, onClick, label, variant = 'primary', isDisabled }: Props) => (
    <Button
        variant={variant}
        paddingBlock="10px"
        paddingInline="14px"
        fontSize={14}
        fontWeight={500}
        leftIcon={icon}
        onClick={onClick}
        _hover={isDisabled ? {} : { opacity: "0.8" }}
        disabled={isDisabled}
    >
        {label}
    </Button>
)

export default ActionButton