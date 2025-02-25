import AppIcons from "assets/icon/Appicons"
import Input from "components/redesign/input/Input"
import useAppToast from "functions/hooks/toast/useToast"
import useProductForm from "pages/products/hooks/useProductForm"
import React, { ChangeEvent, useState } from "react"
import SwitchBox from "../common/SwitchBox"

export default function ProductRoyalty() {
    const { values: { sku } } = useProductForm()
    const [showInput, setShowInput] = useState(false)
    const { showToast } = useAppToast()

    const handleRoyaltyToggle = (checked: boolean) => {
        if (!sku.length) {
            showToast({ type: "error", message: "Please add at least one SKU before activating royalties." })
            return
        }
        setShowInput(checked)
    }

    return (
        <SwitchBox
            title="Royalty"
            description="Activate royalties on this product to receive a percentage on each resale."
            switchProps={{
                isChecked: showInput,
                onChange: (e) => handleRoyaltyToggle(e.target.checked)
            }}
            {...(showInput && { rightContent: <RoyaltyInput /> })}
        />
    )
}

function RoyaltyInput() {
    const { values: { sku }, setFieldValue } = useProductForm()
    const [royalty, setRoyalty] = useState(sku?.[0]?.royalty ?? null)

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const { value, validity } = e.target
        if (!validity.valid) return

        const parsedValue = value === "" ? null : parseFloat(value)
        setRoyalty(parsedValue)

        const updatedSkus = sku.map(item => ({ ...item, royalty: parsedValue }))
        setFieldValue("sku", updatedSkus)
    }

    return (
        <Input
            inputGroupProps={{ width: "104px" }}
            inputProps={{
                type: "number",
                numberType: "float",
                min: 0,
                max: 99.99,
                step: 0.01,
                placeholder: "15",
                value: royalty !== null ? royalty : "",
                onChange: handleInputChange
            }}
            rightElement={<AppIcons.GrayPercent />}
        />
    )
}