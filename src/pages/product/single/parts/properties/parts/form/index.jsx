import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import BasicButton from 'components/shared/BasicButton/BasicButton';
import { OptionComponent, SelectComponent } from 'modals/rule-modal/RuleModal-style';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PropertiesFormModel from './model/model';
import plusIcon from "assest/icon/plus-icon.svg";
import minusIcon from "assest/icon/minusIcon.png";
import { ValueInput } from 'pages/prodcut-pages/ProductPages-style';
import AppendModule from './model/module/append';


function PropertiesForm() {
    const [State, setState] = useState([])
    const { appendHandle, typesAvailable, addProperty, appendPropertyItem, addPropertyItem, removePropertyItem } = PropertiesFormModel

    // Initial data for state
    const types = [
        {
            _id: "62a989ab1f2c2bbc5b1e7153",
            name: "Color",
        },
        {
            _id: "62a989e21f2c2bbc5b1e7154",
            name: "Size",
        },
    ]

    useEffect(() => {
        // console.log(State);
    }, [State])

    const append = useCallback(() => {
        setState(prev => appendHandle({
            state: prev,
            types
        }))
    }, [])

    const changeSelect = useCallback((value, key) => {
        setState(prev => addProperty({
            state: prev,
            index: key,
            value
        }))
    }, [])

    const appendItem = useCallback((keyProperty) => {
        setState(prev => appendPropertyItem({
            state: prev,
            keyProperty
        }))
    }, [])

    const removeItem = useCallback((keyProperty, keyItem) => {
        setState(prev => removePropertyItem({
            state: prev,
            keyItem,
            keyProperty
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

    const typesSelected = useCallback((propertyTitle, typeName) => {
        return typesAvailable({
            state: State,
            typeName,
            propertyTitle
        })
    }, [State, types])

    const checkLengthProperty = useMemo(() => {
        return AppendModule.checkLengthProperty({
            properties: State,
            types
        })
    }, [State, types])

    return (
        <VStack align={"stretch"} spacing={10}>
            {State.length ? State.map((el, keyProperty) => (
                <VStack align={"stretch"} key={keyProperty} width={"100%"}>
                    <HStack>
                        <Box width={"20%"}><Text fontSize={"larger"} color={"#FFF"}>Property</Text></Box>
                        <Box width={"80%"}>
                            <SelectComponent value={el.title} onChange={(e) => changeSelect(e.target.value, keyProperty)}>
                                <OptionComponent value={""} disabled hidden selected>Property</OptionComponent>
                                {types.map((type, key) => (
                                    <OptionComponent
                                        value={type.name}
                                        key={key}
                                        disabled={typesSelected(el.title, type.name)}
                                    >
                                        {type.name}
                                    </OptionComponent>
                                ))}
                            </SelectComponent>
                        </Box>
                    </HStack>
                    {el.title.length && el.items.map((item, key) => {
                        const checkAppend = typeof el.items[key + 1] !== "undefined"
                        return (
                            <HStack key={key}>
                                <Box width={"20%"}><Text fontSize={"larger"} color={"#FFF"}>Value {key + 1}</Text></Box>
                                <Box width={"77%"}>
                                    <ValueInput
                                        placeholder="default"
                                        value={item.value}
                                        onChange={(e) => setItem(e.target.value, key, keyProperty)}
                                    />
                                </Box>
                                <Box>
                                    <Image
                                        cursor={"pointer"}
                                        onClick={() => checkAppend ? removeItem(keyProperty, key) : appendItem(keyProperty)}
                                        src={checkAppend ? minusIcon : plusIcon}
                                        w={"20px"}
                                        h={"20px"}
                                    />
                                </Box>
                            </HStack>
                        )
                    })}
                </VStack>
            )) : null}

            {!checkLengthProperty && (
                <Box><BasicButton click={append} cancelType>Make New Properties</BasicButton></Box>
            )}
        </VStack>
    )
}

export default PropertiesForm