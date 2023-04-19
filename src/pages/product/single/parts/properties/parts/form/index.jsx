import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import BasicButton from 'components/shared/BasicButton/BasicButton';
import { OptionComponent, SelectComponent } from 'modals/rule-modal/RuleModal-style';
import React, { useCallback, useEffect, useState } from 'react'
import PropertiesFormModel from './model/model';
import plusIcon from "assest/icon/plus-icon.svg";
import { ValueInput } from 'pages/prodcut-pages/ProductPages-style';
import AppendModule from './model/module/append';

function PropertiesForm() {
    const [State, setState] = useState([])
    const { types, appendHandle, isSelected, addProperty, appendPropertyItem, addPropertyItem } = PropertiesFormModel

    useEffect(() => {
        console.log(State);
    }, [State])

    const append = useCallback(() => {
        setState(prev => appendHandle(prev))
    }, [])

    const changeSelect = useCallback((value, key) => {
        setState(prev => addProperty({
            state: prev,
            index: key,
            value
        }))
    }, [])

    const appendItem = useCallback((index) => {
        setState(prev => appendPropertyItem({
            state: prev,
            index
        }))
    }, [])

    const setItem = useCallback((value, index, keyProperty) => {
        setState(prev => addPropertyItem({
            state: prev,
            index,
            keyProperty,
            value
        }))
    }, [])

    return (
        <VStack align={"stretch"} spacing={10}>
            {State.length ? State.map((el, keyProperty) => (
                <VStack align={"stretch"} key={keyProperty} width={"100%"}>
                    <HStack>
                        <Box width={"20%"}><Text fontSize={"larger"} color={"#FFF"}>Property</Text></Box>
                        <Box width={"80%"}>
                            <SelectComponent onChange={(e) => changeSelect(e.target.value, keyProperty)}>
                                <OptionComponent value={""} disabled hidden selected>Property</OptionComponent>
                                {types().map((type, key) => (
                                    <OptionComponent
                                        value={type.name}
                                        key={key}
                                        disabled={isSelected(State, type.name)}
                                    >
                                        {type.name}
                                    </OptionComponent>
                                ))}
                            </SelectComponent>
                        </Box>
                    </HStack>
                    {el.title.length && el.items.map((item, key) => (
                        <HStack key={key}>
                            <Box width={"20%"}><Text fontSize={"larger"} color={"#FFF"}>Value {key + 1}</Text></Box>
                            <Box width={"77%"}>
                                <ValueInput
                                    placeholder="default"
                                    value={item.value}
                                    onChange={(e) => setItem(e.target.value, key, keyProperty)}
                                />
                            </Box>
                            <Box><Image cursor={"pointer"} onClick={() => appendItem(keyProperty)} src={plusIcon} w={"20px"} h={"20px"} /></Box>
                        </HStack>
                    ))}
                </VStack>
            )) : null}

            {!AppendModule.checkLengthProperty(State) && (
                <Box><BasicButton click={append} cancelType>Make New Properties</BasicButton></Box>
            )}
        </VStack>
    )
}

export default PropertiesForm