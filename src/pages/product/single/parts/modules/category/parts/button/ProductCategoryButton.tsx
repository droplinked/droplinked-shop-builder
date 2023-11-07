import BasicButton from 'components/common/BasicButton/BasicButton'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext } from 'react'
import ProductTypeModel from '../../../productType/model'
import productCategoryContext from '../../context'

function ProductCategoryButton() {
    const { state, dispatch } = useContext(productCategoryContext)
    const { state: { pod_blank_product_id, publish_product }, methods, productID } = useContext(productContext)
    const { cached, id } = state.category

    const reset = useCallback(() => {
        methods.dispatch({ type: "updateStore", params: { storeName: 'product_printful', value: null } })
        ProductTypeModel.updateProductType({ value: null, updateState: methods.updateState })
        dispatch({ type: "reset" })
    }, [pod_blank_product_id])

    const back = useCallback(() => {
        if (id) dispatch({ type: "updateCategory", params: { id: null } })
        else if (cached.length > 1) dispatch({ type: "updateCategory", params: { cached: cached.slice(0, cached.length - 1) } })
    }, [id, cached])

    return (
        <>
            {cached.length > 1 && !state.product.title ?
                <BasicButton
                    onClick={back}
                    variant='outline'
                    sizes="medium"
                    isDisabled={Boolean(productID) && publish_product}
                >Back</BasicButton> : state.product.title ? <BasicButton isDisabled={Boolean(productID) && publish_product} variant='outline' sizes="medium" onClick={reset}>Change Product</BasicButton> : null
            }
        </>
    )
}

export default ProductCategoryButton