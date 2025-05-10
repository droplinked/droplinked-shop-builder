import { LinkMd } from 'assets/icons/Action/Link/LinkMd'
import AppInput from 'components/redesign/input/AppInput'
import DividerText from 'pages/onboarding/components/common/DividerText'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React, { useEffect, useState } from 'react'

export default function UrlInput({ isDisabled }: { isDisabled: boolean }) {
    const [tempValue, setTempValue] = useState("")
    const { updateProductPageState } = useProductPageStore()

    const handleChange = (value: string) => {
        setTempValue(value)

        // Validate URL format (basic validation)
        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[^\s]*)*\/?$/
        if (urlPattern.test(value)) {
            updateProductPageState("targetShopUrl", value)
        } else {
            updateProductPageState("targetShopUrl", "")
        }
    }

    useEffect(() => {
        if (isDisabled) {
            setTempValue("")
            updateProductPageState("targetShopUrl", "")
        }
    }, [isDisabled])

    return (
        <>
            <DividerText text='or' />

            <AppInput
                label='URL Import - Product Listing'
                tooltipText='Fetch any product details to automatically import and list them into the inventory catalog.'
                inputProps={{
                    placeholder: "Paste URL here (limited to Shopify or WooCommerce)",
                    onChange: (e) => handleChange(e.target.value),
                    value: tempValue,
                    type: 'url',
                    isDisabled: isDisabled,
                }}
                leftElement={
                    <LinkMd color='#7B7B7B' />
                }
            />
        </>
    )
}
