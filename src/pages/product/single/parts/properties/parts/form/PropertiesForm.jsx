import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { OptionComponent, SelectComponent } from 'modals/rule-modal/RuleModal-style';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import PropertiesFormModel, { types } from './model/model';
import PropertyItem from './parts/item/PropertyItem';
import PropertyOptions from './parts/options/PropertyOptions';
import PropertyButton from './parts/button/PropertyButton';
import propertiesFormContext from './context';
import { productContext } from 'pages/product/single/context';

function PropertiesForm() {
    const { state: { properties, sku }, methods: { updateState }, productID } = useContext(productContext)
    const [State, setState] = useState([])
    const { addProperty, makeData } = PropertiesFormModel

    // Update properties product
    useEffect(() => {
        const data = makeData(State)
        if (data.length) updateState("properties", data)
    }, [State, updateState])

    // Update properties when update mode
    useEffect(() => productID && properties.length && !State.length && setState(properties), [productID, properties])

    // Create new property  
    const create = useCallback((value, key) => {
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
            <VStack align={"stretch"} spacing={10}>
                {State.length ? State.map((el, keyProperty) => (
                    <VStack align={"stretch"} key={keyProperty} width={"100%"}>
                        <HStack>
                            <Box width={"20%"}><Text fontSize={"larger"} color={"#FFF"}>Property</Text></Box>
                            <Box width={"80%"}>
                                <SelectComponent value={el.value} onChange={(e) => create(e.target.value, keyProperty)}>
                                    <OptionComponent value={""} disabled hidden selected>Property</OptionComponent>
                                    <PropertyOptions element={el} types={types} />
                                </SelectComponent>
                            </Box>
                        </HStack>
                        <PropertyItem element={el} keyProperty={keyProperty} />
                    </VStack>
                )) : null}

                <Box><PropertyButton state={State} types={types} skues={sku} /></Box>
            </VStack>
        </propertiesFormContext.Provider>
    )
}

export default PropertiesForm