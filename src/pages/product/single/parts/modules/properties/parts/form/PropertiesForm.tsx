import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropertiesFormModel from './model/model';
import propertiesFormContext from './context';
import { productContext } from 'pages/product/single/context';
import useAppToast from 'functions/hooks/toast/useToast';
import propertyItemModel, { IaddPropertyItem } from './parts/form/parts/item/model/model';
import PropertyFormProduct from './parts/form/PropertyFormProduct';
import PODProperties from './parts/pod/PODProperties';

function PropertiesForm() {
    const { state: { properties, product_type, sku }, methods: { updateState }, productID } = useContext(productContext)
    const [State, setState] = useState([])
    const { makeData } = PropertiesFormModel
    const { showToast } = useAppToast()
    const { addPropertyItem, removePropertyItem, checkUsedPropertyItem } = propertyItemModel

    // Update properties product
    useEffect(() => {
        const data = makeData(State)
        updateState("properties", data)
    }, [State, updateState])

    // Update properties when update mode
    useEffect(() => productID && properties.length && !State.length && setState(properties), [productID, properties])
    useEffect(() => !productID && setState([]), [productID, product_type === "PRINT_ON_DEMAND"])

    // Check used item in skues
    const checkItem = useCallback((propertyValue) => {
        return checkUsedPropertyItem({
            properties,
            propertyValue
        })
    }, [properties])

    const remove = useCallback(async (valueItem, keyProperty) => {
        setState(prev => removePropertyItem({ state: prev, valueItem, keyProperty }))
    }, [updateState, sku])

    const set = useCallback(async ({ item }: IaddPropertyItem) => {
        try {
            await checkItem(item.value)
            setState(prev => addPropertyItem({ item, properties: prev }))
        } catch (error) {
            showToast("This property exist", "error", { toastId: "SkuUsed" })
        }
    }, [updateState, sku, properties])

    return (
        <propertiesFormContext.Provider value={{
            state: State,
            updateState: setState,
            set,
            remove,
            checkItem
        }}>
            {["NORMAL", "DIGITAL"].includes(product_type) ? <PropertyFormProduct /> : <PODProperties />}
        </propertiesFormContext.Provider>
    )
}

export default PropertiesForm