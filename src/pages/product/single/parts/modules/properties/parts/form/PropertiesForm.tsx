import { Box, Flex, HStack, VStack } from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropertiesFormModel from './model/model';
import PropertyItem from './parts/item/PropertyItem';
import PropertyOptions from './parts/options/PropertyOptions';
import PropertyButton from './parts/button/PropertyButton';
import propertiesFormContext from './context';
import { productContext } from 'pages/product/single/context';
import SkeletonProduct from '../../../skeleton/SkeletonProduct';
import { typesProperties } from 'lib/utils/statics/types';
import AppTypography from 'components/common/typography/AppTypography';
import ProductPageTitle from '../../../title/ProductPageTitle';
import propertyItemModel from './parts/item/model/model';
import useAppToast from 'functions/hooks/toast/useToast';

function PropertiesForm() {
    const { state: { properties, product_type, sku }, methods: { updateState }, productID } = useContext(productContext)
    const [State, setState] = useState([])
    const { addProperty, makeData } = PropertiesFormModel
    const { showToast } = useAppToast()
    const { addPropertyItem, removePropertyItem, checkUsedPropertyItem } = propertyItemModel

    // Update properties product
    useEffect(() => {
        const data = makeData(State)
        updateState("properties", data)
    }, [State, updateState])

    // Update properties when update mode
    useEffect(() => productID && properties.length && !State.length && setState(properties), [productID, properties])
    useEffect(() => setState([]), [product_type])

    // Create new property  
    const create = useCallback((value: any, key: number) => {
        setState(prev => addProperty({
            state: prev,
            index: key,
            value
        }))
    }, [])

    // Check used item in skues
    const checkItem = useCallback((propertyValue) => {
        return checkUsedPropertyItem({
            properties,
            propertyValue
        })
    }, [properties])

    const remove = useCallback(async (item, keyProperty) => {
        setState(prev => removePropertyItem({ state: prev, valueItem: item.value, keyProperty }))
    }, [updateState, sku])

    const set = useCallback(async (value, index, keyProperty) => {
        try {
            await checkItem(value)
            setState(prev => addPropertyItem({ state: prev, index, keyProperty, value }))
        } catch (error) {
            showToast("This property exist", "error", { toastId: "SkuUsed" })
        }
    }, [updateState, sku])

    return (
        <propertiesFormContext.Provider value={{
            state: State,
            updateState: setState,
            set,
            remove
        }}>
            <>
                <Flex justifyContent={"space-between"}>
                    <ProductPageTitle
                        head
                        isReuired
                        title='Product Properties'
                        description='Add at least one property to enable all variant fields.'
                    />
                    <PropertyButton state={State} types={typesProperties} />
                </Flex>
                <SkeletonProduct>
                    <VStack align={"stretch"} spacing={3}>
                        {State.length ? State.map((el, keyProperty) => (
                            <VStack background={"#141414"} spacing={4} borderRadius="8px" padding={4} align={"stretch"} key={keyProperty} width={"100%"}>
                                <HStack>
                                    <Box width={"20%"}><AppTypography size="14px" color="#FFF">Property</AppTypography></Box>
                                    <Box width={"80%"}>
                                        <PropertyOptions element={el} value={el.value} onChange={(e: any) => create(e.target.value, keyProperty)} />
                                    </Box>
                                </HStack>
                                {el.value && (
                                    <HStack>
                                        <Box width={"20%"}><AppTypography size="14px" color="#FFF">Values</AppTypography></Box>
                                        <Box width={"80%"}><PropertyItem element={el} keyProperty={keyProperty} /></Box>
                                    </HStack>
                                )}
                            </VStack>
                        )) : null}
                    </VStack>
                </SkeletonProduct>
            </>
        </propertiesFormContext.Provider>
    )
}

export default PropertiesForm