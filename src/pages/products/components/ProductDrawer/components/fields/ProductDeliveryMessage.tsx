import AppInput from 'components/redesign/input/AppInput'
import Textarea from 'components/redesign/textarea/Textarea'
import useProductForm from 'pages/products/hooks/useProductForm'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useState } from 'react'
import SwitchBox from '../common/SwitchBox'

function ProductDeliveryMessage() {
    const { t } = useLocaleResources('products');
    const { values: { digitalDetail }, setFieldValue } = useProductForm()
    const { message, file_url } = digitalDetail ?? {}
    const [showDeliveryMessage, setShowDeliveryMessage] = useState(Boolean(message || file_url))

    const updateField = (field: keyof typeof digitalDetail, value: string) => {
        setFieldValue("digitalDetail", {
            ...digitalDetail,
            [field]: value,
        })
    }

    const handleToggle = (isChecked: boolean) => {
        setShowDeliveryMessage(isChecked)

        if (!isChecked) {
            updateField("message", null)
            updateField("file_url", null)
        }
    }

    return (
        <SwitchBox
            title={t('ProductDeliveryMessage.title')}
            description={t('ProductDeliveryMessage.description')}
            switchProps={{
                isChecked: showDeliveryMessage,
                onChange: (e) => handleToggle(e.target.checked),
            }}
        >
            {showDeliveryMessage && (
                <>
                    <Textarea
                        value={message || ""}
                        onChange={(e) => updateField("message", e.target.value)}
                        placeholder={t('ProductDeliveryMessage.messagePlaceholder')}
                        rows={8}
                    />
                    <AppInput
                        inputGroupProps={{ mt: 4 }}
                        inputProps={{
                            value: file_url || "",
                            onChange: (e) => updateField("file_url", e.target.value),
                            placeholder: t('ProductDeliveryMessage.urlPlaceholder'),
                            fontSize: 16,
                        }}
                    />
                </>
            )}
        </SwitchBox>
    )
}

export default ProductDeliveryMessage