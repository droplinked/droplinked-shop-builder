import AppIcons from 'assets/icon/Appicons'
import BlueButton from 'components/redesign/button/BlueButton'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'

interface Props {
    onClick: () => void
}

function DesignMakerButton({ onClick }: Props) {
    const { values: { _id, publish_status, printful_template_id } } = useProductForm()

    return (
        <BlueButton
            w="full"
            gap={2}
            border="1px solid #292929"
            borderRadius={8}
            padding="12px 16px"
            fontSize={16}
            isDisabled={_id && publish_status === "PUBLISHED"}
            onClick={onClick}
        >
            <AppIcons.BlueBrush />
            {printful_template_id ? "Edit Design" : "Design Maker"}
        </BlueButton>
    )
}

export default DesignMakerButton