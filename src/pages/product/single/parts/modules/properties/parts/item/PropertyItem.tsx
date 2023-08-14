import { Box } from '@chakra-ui/react'
import { typesProperties } from 'lib/utils/statics/types'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useMemo } from 'react'
import propertiesFormContext from '../../context'
import classes from './style.module.scss'

interface IProps {
    type: "Size" | "Color"
    item: any
}

function PropertyItem({ type, item }: IProps) {
    const { state: { properties, publish_product }, productID } = useContext(productContext)
    const { set, remove } = useContext(propertiesFormContext)

    const checkItem = useCallback((value: string) => {
        return properties.find(el => el.items.find((e: any) => e.value === value))
    }, [properties])

    const addProperty = useCallback((value: string) => {
        if (productID && publish_product) return false
        const getVariantID = typesProperties.find(el => el.name === type)

        if (checkItem(value)) {
            remove(value)
        } else {
            set({
                item: {
                    value,
                    caption: item.caption,
                    variantID: getVariantID._id
                }
            })
        }
    }, [properties, productID, publish_product, type, item])

    const getContainer = useMemo(() => {
        switch (type) {
            case "Color":
                return (
                    <Box
                        borderRadius="100%"
                        onClick={() => addProperty(item.value)}
                        width="32px"
                        height="32px"
                        cursor={productID && publish_product ? "auto" : "pointer"}
                        background={item.value}
                        className={`${checkItem(item.value) ? classes.active : ""} ${classes.box} ${classes.color}`}
                    ></Box>
                )
            case "Size":
                return (
                    <Box
                        borderRadius="28px"
                        onClick={() => addProperty(item.value)}
                        padding="6px 16px"
                        cursor={productID && publish_product ? "auto" : "pointer"}
                        background="#1C1C1C"
                        className={`${checkItem(item.value) ? classes.active : ""} ${classes.box}`}
                    >{item.value}</Box>
                )
            default:
                return <></>
        }
    }, [type, properties])

    return getContainer
}

export default PropertyItem