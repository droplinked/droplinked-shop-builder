import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
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
import PODProperties from './parts/pod/PODProperties';

function PropertiesForm() {
    const { state: { properties, sku, product_type }, methods: { updateState }, productID } = useContext(productContext)
    const [State, setState] = useState([])
    const { addProperty, makeData } = PropertiesFormModel

    // Update properties product
    useEffect(() => {
        const data = makeData(State)
        updateState("properties", data)
    }, [State, updateState])

    // Update properties when update mode
    useEffect(() => productID && properties.length && !State.length && setState(properties), [productID, properties])

    // Create new property  
    const create = useCallback((value: any, key: number) => {
        setState(prev => addProperty({
            state: prev,
            index: key,
            value
        }))
    }, [])

    return (
        <propertiesFormContext.Provider value={{
            state: State,
            updateState: setState
        }}>
            <>
                <Flex justifyContent={"space-between"}>
                    <ProductPageTitle
                        head
                        isReuired
                        title='Product Properties'
                        description='Add at least one property to enable all variant fields.'
                    />
                    <PropertyButton state={State} types={typesProperties} skues={sku} />
                </Flex>
                <SkeletonProduct>
                    {["NORMAL", "DIGITAL"].includes(product_type) ? (
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
                    ) : <PODProperties />}
                </SkeletonProduct>
            </>
        </propertiesFormContext.Provider>
    )
}

export default PropertiesForm