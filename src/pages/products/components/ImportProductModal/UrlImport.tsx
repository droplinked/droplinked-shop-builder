import { LinkMd } from 'assets/icons/Action/Link/LinkMd'
import Input from 'components/redesign/input/Input'
import DividerText from 'pages/onboarding/components/common/DividerText'
import React, { useState } from 'react'

interface Props {
    url: string
    setUrl: (url: string) => void
}

export default function UrlImport({ url, setUrl }: Props) {
    const [tempValue, setTempValue] = useState("")

    const handleChange = (value: string) => {
        setTempValue(value)

        // Validate URL format (basic validation)
        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\w .-]*)*\/?$/
        if (urlPattern.test(value)) {
            setUrl(value)
        } else {
            setUrl("")
        }
    }

    return (
        <>
            <DividerText text='or' />

            <Input
                label='URL Import - Product Listing'
                tooltipText='Fetch any product details to automatically import and list them into the inventory catalog.'
                inputProps={{
                    placeholder: "Paste URL here (limited to Shopify or WooCommerce)",
                    onChange: (e) => handleChange(e.target.value),
                    value: tempValue,
                    type: 'url',
                }}
                leftElement={
                    <LinkMd color='#7B7B7B' />
                }
            />
        </>
    )
}
