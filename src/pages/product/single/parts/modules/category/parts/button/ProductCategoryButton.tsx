import BasicButton from 'components/common/BasicButton/BasicButton'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useMemo } from 'react'
import ProductTypeModel from '../../../productType/model'
import productCategoryContext from '../../context'

function ProductCategoryButton() {
    const { state, dispatch } = useContext(productCategoryContext)
    const { state: { pod_blank_product_id, publish_product }, methods, productID } = useContext(productContext)
    const { submenu, menu } = state.steps

    const reset = useCallback(() => {
        ProductTypeModel.updateProductType({ value: null, updateState: methods.updateState })
        dispatch({ type: "reset" })
    }, [pod_blank_product_id])

    const backCheck = useMemo(() => (menu || submenu) && !pod_blank_product_id, [menu, submenu, pod_blank_product_id])

    return (
        <>
            {pod_blank_product_id || menu || submenu ? <BasicButton
                onClick={() => {
                    if (backCheck) {
                        if (menu && !submenu) dispatch({ type: "updateSteps", params: { menu: null } })
                        else if (submenu) dispatch({ type: "updateSteps", params: { submenu: null } })
                    } else reset()
                }}
                variant='outline'
                sizes="medium"
                isDisabled={Boolean(productID) && publish_product}
            >
                {backCheck ? "Back" : "Reset Product"}
            </BasicButton> : null
            }
        </>
    )
}

export default ProductCategoryButton