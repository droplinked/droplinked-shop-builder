import Button from "components/redesign/button/Button"
import React, { ReactElement } from "react"

interface Props {
    variant?: 'primary' | 'secondary'
    icon: ReactElement
    onClick?: () => void
    label: string
}

const ActionButton = ({ icon, onClick, label, variant = 'primary' }: Props) => (
    <Button
        variant={variant}
        paddingBlock="10px"
        paddingInline="14px"
        fontSize={14}
        fontWeight={500}
        leftIcon={icon}
        onClick={onClick}
        _hover={{ opacity: "0.8" }}
    >
        {label}
    </Button>
)

export default ActionButton