import { background, Box, Flex, HStack, Input, Text, useDisclosure } from '@chakra-ui/react'
import React, { useCallback, useContext, useRef, useState } from 'react'
import propertiesFormContext from '../../context';
import { productContext } from 'pages/product/single/context';
import propertyItemModel from './model/model';
import SkuTableModal from 'pages/product/single/parts/modules/variants/parts/table/parts/skuModal/SkuTableModal';
import AppInput from 'components/common/form/textbox/AppInput';
import AppTypography from 'components/common/typography/AppTypography';
import useAppToast from 'functions/hooks/toast/useToast';
import AppIcons from 'assest/icon/Appicons';

function PropertyItem({ element, keyProperty }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [SkuData, setSkuData] = useState(null)
    const { state: { sku }, methods } = useContext(productContext)
    const { updateState } = useContext(propertiesFormContext)
    const { appendPropertyItem, addPropertyItem, removePropertyItem, checkUsedPropertyItem } = propertyItemModel
    const { showToast } = useAppToast()
    const [Value, setValue] = useState("")
    const inputRef = useRef<any>()

    const append = useCallback((keyProperty) => {
        updateState(prev => appendPropertyItem({
            state: prev,
            keyProperty
        }))
    }, [updateState])

    // Check used item in skues
    const checkItem = (item, element) => {
        return checkUsedPropertyItem({
            skues: sku,
            item: {
                value: item.value,
                variantID: element.value
            }
        })
    }

    const remove = useCallback(async (item, element, keyProperty, keyItem) => {
        updateState(prev => removePropertyItem({ state: prev, keyItem, keyProperty }))
    }, [updateState, sku])

    const set = useCallback(async (item, element, value, index, keyProperty) => {
        try {
            await checkItem(item, element)
            updateState(prev => addPropertyItem({ state: prev, index, keyProperty, value }))
            setValue("")
        } catch (error) {
            setSkuData(error)
            showToast("This sku exist", "error", { toastId: "SkuUsed" })
        }
    }, [updateState, sku])

    const onSubmit = useCallback((e: any, item: any, key: any) => {
        e.preventDefault()
        append(keyProperty)
        set(item, element, Value, key, keyProperty)
    }, [Value])

    return (
        <Flex justifyContent={"left"} flexWrap="wrap" backgroundColor="#1C1C1C" padding={2} minHeight="48px" gap={3} alignContent="center" width="100%" cursor={"text"} onClick={() => inputRef.current.focus()}>
            {element.value.length ? element.items.map((item, key) => {
                return (
                    <>
                        {item.value && (
                            <Flex key={key} alignItems="center" gap={2} color={"#FFF"} padding={"6px 15px"} backgroundColor="#141414">
                                <AppTypography size='14px'>{item.value}</AppTypography>
                                <AppIcons.close style={{ cursor: "pointer" }} onClick={() => remove(item, element, keyProperty, key)} width={"10px"} height="10px" />
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
            <SkuTableModal close={onClose} open={SkuData && isOpen} skuData={SkuData} />
        </Flex>
    )
}

export default PropertyItem