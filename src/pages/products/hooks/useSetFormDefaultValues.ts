import { nanoid } from 'nanoid'
import useProductForm from 'pages/products/hooks/useProductForm'
import { SKU } from 'pages/products/utils/types'
import { useEffect } from 'react'

const useSetFormDefaultValues = () => {
    const { values: { product_type, sku }, setFieldValue } = useProductForm()

    useEffect(() => {
        if (product_type === "DIGITAL" && !sku.length) {
            const digitalProductSKU: SKU = {
                externalID: "",
                price: 0,
                dimensions: { height: 0, length: 0, width: 0 },
                quantity: 0,
                recorded_quantity: 0,
                recordData: { status: "NOT_RECORDED" },
                deploy_hash: '',
                royalty: null,
            }
            setFieldValue('sku', [digitalProductSKU])
        }

        if (product_type === "PRINT_ON_DEMAND") {
            setFieldValue("prodviderID", "PRINTFUL")
            setFieldValue("shippingType", "PRINTFUL")
            setFieldValue("custome_external_id", Date.now() + nanoid(13))
        }
    }, [product_type, sku, setFieldValue])
}

export default useSetFormDefaultValues
