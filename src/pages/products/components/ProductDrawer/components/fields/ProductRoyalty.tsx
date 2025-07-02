import AppIcons from "assets/icon/Appicons"
import AppInput from "components/redesign/input/AppInput"
import useAppToast from "hooks/toast/useToast"
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useProductForm from "pages/products/hooks/useProductForm"
import React, { ChangeEvent, useState } from "react"
import SwitchBox from "../common/SwitchBox"

export default function ProductRoyalty() {
    const { t } = useLocaleResources('products');
    const { values: { sku } } = useProductForm()
    const [showInput, setShowInput] = useState(false)
    const { showToast } = useAppToast()

    const handleRoyaltyToggle = (checked: boolean) => {
        if (!sku.length) {
            showToast({ type: "error", message: t('fields.royalty.addSkuFirst') })
            return
        }
        setShowInput(checked)
    }

    return (
        <SwitchBox
            title={t('fields.royalty.title')}
            description={t('fields.royalty.description')}
            switchProps={{
                isChecked: showInput,
                onChange: (e) => handleRoyaltyToggle(e.target.checked)
            }}
            {...(showInput && { rightContent: <RoyaltyInput /> })}
        />
    )
}

function RoyaltyInput() {
    const { t } = useLocaleResources('products');
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
        <AppInput
            inputGroupProps={{ width: "104px" }}
            inputProps={{
                type: "number",
                numberType: "float",
                min: 0,
                max: 99.99,
                step: 0.01,
                placeholder: t('fields.royalty.placeholder'),
                value: royalty !== null ? royalty : "",
                onChange: handleInputChange
            }}
            rightElement={<AppIcons.GrayPercent />}
        />
    )
}