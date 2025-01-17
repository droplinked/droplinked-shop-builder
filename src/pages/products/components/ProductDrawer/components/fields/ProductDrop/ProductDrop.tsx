import useAppToast from 'functions/hooks/toast/useToast'
import useProductForm from 'pages/products/hooks/useProductForm'
import useProductTypeLegality from 'pages/products/hooks/useProductTypeLegality'
import React from 'react'
import SwitchBox from '../../common/SwitchBox'
import DropDetailsSection from './DropConfigurationPanel'
import DropSummary from './DropSummary'

interface Props {
    isProductRecorded: boolean
    isDropEnabled: boolean
    onToggleDrop: (checked: boolean) => void
}

export default function ProductDrop({ isProductRecorded, isDropEnabled, onToggleDrop }: Props) {
    const { values, setFieldValue } = useProductForm()
    const { showToast } = useAppToast()
    const { isLegal, errorMessage } = useProductTypeLegality("drop")

    function handleDropToggle(checked: boolean) {
        const { _id, product_type, publish_status, digitalDetail, sku } = values

        if (_id && product_type === "DIGITAL" && publish_status === "PUBLISHED") {
            showToast({ type: "error", message: "This product has already been published." })
            return
        }

        if (!isLegal && checked) {
            showToast({ type: "error", message: errorMessage })
            return
        }

        onToggleDrop(checked)

        if (!checked) {
            setFieldValue('digitalDetail', { ...digitalDetail, chain: '' })
            setFieldValue('sku', sku.map(s => ({ ...s, royalty: null })))
        }
    }

    return (
        <SwitchBox
            title="Drop"
            description="Enable onchain records for this digital product."
            switchProps={{
                isChecked: isDropEnabled,
                onChange: e => handleDropToggle(e.target.checked)
            }}
        >
            {isProductRecorded
                ? <DropSummary />
                : <DropDetailsSection isDropEnabled={isDropEnabled} />
            }
        </SwitchBox>
    )
}