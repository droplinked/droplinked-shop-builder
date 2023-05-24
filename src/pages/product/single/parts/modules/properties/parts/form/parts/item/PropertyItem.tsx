import { Box, HStack, Text, useDisclosure } from '@chakra-ui/react'
import React, { useCallback, useContext, useState } from 'react'
import propertiesFormContext from '../../context';
import { productContext } from 'pages/product/single/context';
import propertyItemModel from './model/model';
import SkuTableModal from 'pages/product/single/parts/modules/variants/parts/table/parts/skuModal/SkuTableModal';
import AppInput from 'common/form/textbox/AppInput';
import AppTypography from 'common/typography/AppTypography';
import useAppToast from 'hooks/toast/useToast';
import AppIcons from 'assest/icon/Appicons';

function PropertyItem({ element, keyProperty }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [SkuData, setSkuData] = useState(null)
    const { state: { sku } } = useContext(productContext)
    const { updateState } = useContext(propertiesFormContext)
    const { appendPropertyItem, addPropertyItem, removePropertyItem, checkUsedPropertyItem } = propertyItemModel
    const { showToast } = useAppToast()

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
        try {
            await checkItem(item, element)
            updateState(prev => removePropertyItem({ state: prev, keyItem, keyProperty }))
        } catch (error) {
            showToast("This item used in skues", "error")
        }
    }, [updateState, sku])

    const set = useCallback(async (item, element, value, index, keyProperty) => {
        try {
            await checkItem(item, element)
            updateState(prev => addPropertyItem({ state: prev, index, keyProperty, value }))
        } catch (error) {
            setSkuData(error)
            showToast(
                <>
                    This item use {" "}
                    <button
                        onClick={() => {
                            setSkuData(error)
                            onOpen()
                        }}
                    >
                        <Text color={"#25bb92"}><strong>this</strong></Text>
                    </button>{" "}
                    sku
                </>
                , "error", { toastId: "SkuUsed" })
        }
    }, [updateState, sku])

    return (
        <>
            {element.value.length ? element.items.map((item, key) => {
                const checkAppend = typeof element.items[key + 1] !== "undefined"
                return (
                    <HStack key={key}>
                        <Box width={"20%"}><AppTypography size='14px' color={"#FFF"}>{`Value ${key + 1}`}</AppTypography></Box>
                        <Box width={"77%"}>
                            <AppInput
                                name=''
                                placeholder="default"
                                value={item.value}
                                onChange={(e) => set(item, element, e.target.value, key, keyProperty)}
                            />
                        </Box>
                        <Box>
                            <Box
                                cursor="pointer"
                                onClick={() => checkAppend ? remove(item, element, keyProperty, key) : item.value ? append(keyProperty) : {}}
                            >
                                {checkAppend ? <AppIcons.minusIcon width={"20px"} height="20px" /> : <AppIcons.plusIcon width={"20px"} height="20px" />}
                            </Box>
                        </Box>
                    </HStack>
                )
            }) : null}
            <SkuTableModal close={onClose} open={SkuData && isOpen} skuData={SkuData} />
        </>
    )
}

export default PropertyItem