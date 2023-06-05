import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropertiesFormModel from './model/model';
import propertiesFormContext from './context';
import { productContext } from 'pages/product/single/context';
import useAppToast from 'functions/hooks/toast/useToast';
import propertyItemModel, { IaddPropertyItem } from './parts/form/parts/item/model/model';
import PropertyFormProduct from './parts/form/PropertyFormProduct';
import PODProperties from './parts/pod/PODProperties';

function PropertiesForm() {
    const { state: { properties, product_type, sku, publish_product }, methods: { updateState }, productID } = useContext(productContext)
    const { makeData } = PropertiesFormModel
    const { showToast } = useAppToast()
    const { addPropertyItem, removePropertyItem, checkUsedPropertyItem } = propertyItemModel

    // Check used item in skues
    const checkItem = useCallback((propertyValue) => {
        return checkUsedPropertyItem({
            properties,
            propertyValue
        })
    }, [properties])

    const remove = useCallback(async (valueItem, keyProperty) => {
        if (productID && publish_product) return false
        updateState("properties", removePropertyItem({ state: properties, valueItem, keyProperty }))
    }, [properties, sku, productID, publish_product])

    const set = useCallback(async ({ item }: IaddPropertyItem) => {
        if (productID && publish_product) return false
        try {
            await checkItem(item.value)
            updateState("properties", addPropertyItem({ item, properties }))
        } catch (error) {
            showToast("This property exist", "error", { toastId: "SkuUsed" })
        }
    }, [updateState, sku, properties, productID, publish_product])

    return (
        <propertiesFormContext.Provider value={{
            set,
            remove,
        }}>
            {["NORMAL", "DIGITAL"].includes(product_type) ? <PropertyFormProduct /> : <PODProperties />}
        </propertiesFormContext.Provider>
    )
}

export default PropertiesForm