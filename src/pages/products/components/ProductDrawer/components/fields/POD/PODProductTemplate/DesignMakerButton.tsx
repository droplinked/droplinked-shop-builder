import AppIcons from 'assest/icon/Appicons'
import BlueButton from 'components/redesign/button/BlueButton'
import React from 'react'

interface Props {
    printful_template_id?: string
    onClick: () => void
}

function DesignMakerButton({ printful_template_id, onClick }: Props) {
    return (
        <BlueButton
            w="full"
            gap={2}
            border="1px solid #292929"
            borderRadius={8}
            padding="12px 16px"
            fontSize={16}
            onClick={onClick}
        >
            <AppIcons.BlueBrush />
            {printful_template_id ? "Edit Design" : "Design Maker"}
        </BlueButton>
    )
}

export default DesignMakerButton