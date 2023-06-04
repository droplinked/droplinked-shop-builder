import { Box, Flex, Input } from '@chakra-ui/react'
import React, { useCallback, useContext, useRef, useState } from 'react'
import propertyItemModel from './model/model';
import AppTypography from 'components/common/typography/AppTypography';
import AppIcons from 'assest/icon/Appicons';
import propertiesFormContext from '../../../../context';

function PropertyItem({ element, keyProperty }) {
    const { updateState, set, remove } = useContext(propertiesFormContext)
    const { appendPropertyItem } = propertyItemModel
    const [Value, setValue] = useState("")
    const inputRef = useRef<any>()

    const append = useCallback((keyProperty) => {
        updateState(prev => appendPropertyItem({
            state: prev,
            keyProperty
        }))
    }, [updateState])

    const onSubmit = useCallback((e: any, item: any, key: any) => {
        e.preventDefault()
        append(keyProperty)
        console.log();

        set({
            item: {
                value: Value,
                variantID: element.value
            }
        })
        setValue("")
    }, [Value])

    return (
        <Flex justifyContent={"left"} flexWrap="wrap" backgroundColor="#1C1C1C" padding={2} minHeight="48px" gap={3} alignContent="center" width="100%" cursor={"text"} onClick={() => inputRef.current.focus()}>
            {element.value.length ? element.items.map((item, key) => {
                return (
                    <>
                        {item.value && (
                            <Flex key={key} alignItems="center" gap={2} color={"#FFF"} padding={"6px 15px"} backgroundColor="#141414">
                                <AppTypography size='14px'>{item.value}</AppTypography>
                                <AppIcons.close style={{ cursor: "pointer" }} onClick={() => remove(item.value, keyProperty)} width={"10px"} height="10px" />
                            </Flex>
                        )}
                    </>
                )
            }) : null}
            <Box>
                <form onSubmit={(e) => onSubmit(e, [], element.items ? element.items.length : 0)}>
                    <Input
                        type={"text"}
                        padding={1}
                        ref={inputRef}
                        value={Value}
                        placeholder="enter property"
                        background="none"
                        color={"#FFF"}
                        outline="none"
                        variant={"unstyled"}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </form>
            </Box>
        </Flex>
    )
}

export default PropertyItem