import Input from 'components/redesign/input/Input'
import Textarea from 'components/redesign/textarea/Textarea'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useState } from 'react'
import SwitchBox from '../common/SwitchBox'

function ProductDeliveryMessage() {
    const { values: { digitalDetail }, setFieldValue } = useProductForm()
    const { message, file_url } = digitalDetail
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
            title="Delivery Message"
            description="Provide customers with important delivery details at checkout, such as estimated shipping times or special instructions."
            isChecked={showDeliveryMessage}
            onToggle={(e) => handleToggle(e.target.checked)}
        >
            {showDeliveryMessage && (
                <>
                    <Textarea
                        value={message || ""}
                        onChange={(e) => updateField("message", e.target.value)}
                        placeholder="e.g., Expected delivery within 5–7 business days, or include specific delivery instructions."
                        rows={8}
                    />
                    <Input
                        inputGroupProps={{ mt: 4 }}
                        inputProps={{
                            value: file_url || "",
                            onChange: (e) => updateField("file_url", e.target.value),
                            placeholder: "e.g., www.sample.com",
                            fontSize: 16,
                        }}
                    />
                </>
            )}
        </SwitchBox>
    )
}

export default ProductDeliveryMessage