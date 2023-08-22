interface IUpdata {
    value: string
    updateState: any
}

const ProductTypeModel = ({
    updateProductType: ({ updateState, value }: IUpdata) => {
        updateState("pod_blank_product_id", value)
        updateState("sku", [])
        updateState("artwork", null)
        updateState("artwork2", null)
        updateState("artwork_position", null)
        updateState("artwork2_position", null)
        updateState("m2m_services", [])
        updateState("m2m_positions", [])
        updateState("media", [])
        updateState("printful_template_id", null)
        updateState("positions", [])
        updateState("properties", [
            {
                "value": "62a989ab1f2c2bbc5b1e7153",
                "title": "Color",
                "items": []
            },
            {
                "value": "62a989e21f2c2bbc5b1e7154",
                "title": "Size",
                "items": []
            }
        ])
    }
})

export default ProductTypeModel