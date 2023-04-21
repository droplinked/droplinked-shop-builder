import { Box, HStack, Image, Text } from '@chakra-ui/react'
import { ValueInput } from 'pages/prodcut-pages/ProductPages-style'
import React, { useCallback, useContext } from 'react'
import PropertiesFormModel from '../../model/model'
import plusIcon from "assest/icon/plus-icon.svg";
import minusIcon from "assest/icon/minusIcon.png";
import propertiesFormContext from '../../context';

function PropertyItem({ element, keyProperty }) {
    const { updateState } = useContext(propertiesFormContext)
    const { appendPropertyItem, addPropertyItem, removePropertyItem } = PropertiesFormModel

    const append = useCallback((keyProperty) => {
        updateState(prev => appendPropertyItem({
            state: prev,
            keyProperty
        }))
    }, [updateState])

    const remove = useCallback((keyProperty, keyItem) => {
        updateState(prev => removePropertyItem({
            state: prev,
            keyItem,
            keyProperty
        }))
    }, [updateState])

    const set = useCallback((value, index, keyProperty) => {
        updateState(prev => addPropertyItem({
            state: prev,
            index,
            keyProperty,
            value
        }))
    }, [updateState])

    return (
        <>
            {element.value.length && element.items.map((item, key) => {
                const checkAppend = typeof element.items[key + 1] !== "undefined"
                return (
                    <HStack key={key}>
                        <Box width={"20%"}><Text fontSize={"larger"} color={"#FFF"}>Value {key + 1}</Text></Box>
                        <Box width={"77%"}>
                            <ValueInput
                                placeholder="default"
                                value={item.value}
                                onChange={(e) => set(e.target.value, key, keyProperty)}
                            />
                        </Box>
                        <Box>
                            <Image
                                cursor={"pointer"}
                                onClick={() => checkAppend ? remove(keyProperty, key) : append(keyProperty)}
                                src={checkAppend ? minusIcon : plusIcon}
                                w={"20px"}
                                h={"20px"}
                            />
                        </Box>
                    </HStack>
                )
            })}
        </>
    )
}

export default PropertyItem