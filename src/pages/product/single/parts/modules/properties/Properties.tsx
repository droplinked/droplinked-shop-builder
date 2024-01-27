import useAppToast from 'functions/hooks/toast/useToast';
import { productContext } from 'pages/product/single/context';
import ProductModel from 'pages/product/single/model';
import React, { useCallback, useContext } from 'react';
import propertiesFormContext from './context';
import PropertyFormProduct from './parts/form/PropertyFormProduct';
import propertyItemModel, { IaddPropertyItem } from './parts/item/model';
import PODProperties from './parts/pod/PODProperties';

function Properties() {
    const { state: { properties, product_type, sku, prodviderID, publish_product }, methods: { updateState }, store: { state: { print_positions } }, productID } = useContext(productContext)
    const { showToast } = useAppToast()
    const { addPropertyItem, removePropertyItem, checkUsedPropertyItem } = propertyItemModel

    // Check used item in skues
    const checkItem = useCallback((propertyValue) => {
        return checkUsedPropertyItem({
            properties,
            propertyValue
        })
    }, [properties])

    const remove = useCallback(async (valueItem: string) => {
        if (productID && publish_product) return false
        updateState("properties", removePropertyItem({ state: properties, valueItem }))
    }, [properties, sku, productID, publish_product])

    const set = useCallback(async ({ item }: IaddPropertyItem) => {
        if (productID && publish_product) return false
        try {
            await checkItem(item.value)
            updateState("properties", addPropertyItem({ item, properties }))
        } catch (error) {
            showToast({ message: "This property exist", type: "error", options: { toastId: "SkuUsed" } })
        }
    }, [updateState, sku, properties, productID, publish_product])

    return (
        <propertiesFormContext.Provider value={{ set, remove }}>
            {["NORMAL", "DIGITAL"].includes(product_type) ? <PropertyFormProduct /> : !ProductModel.isPrintful(prodviderID) ? <PODProperties /> : null}
        </propertiesFormContext.Provider>
    )
}

export default Properties