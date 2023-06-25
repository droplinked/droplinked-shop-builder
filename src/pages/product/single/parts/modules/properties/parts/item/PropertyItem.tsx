import { Box } from '@chakra-ui/react'
import { typesProperties } from 'lib/utils/statics/types'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useMemo } from 'react'
import propertiesFormContext from '../../context'
import classes from './style.module.scss'

interface IProps {
    type: "Size" | "Color"
    name: string
    hex?: string
}
function PropertyItem({ type, name, hex }: IProps) {
    const { state: { properties, pod_blank_product_id, publish_product }, productID, methods: { updateState }, store: { state: { variants } } } = useContext(productContext)
    const { set, remove } = useContext(propertiesFormContext)

    const checkItem = useCallback((name: string) => {
        return properties.find(el => el.items.find(e => e.value.toLowerCase() === name.toLowerCase()))
    }, [properties])

    const addProperty = useCallback((value: string) => {
        if (productID && publish_product) return false
        const getVariantID = typesProperties.find(el => el.name.toLowerCase() === type.toLowerCase())
        
        if (checkItem(value)) {
            remove(value)
        } else {
            set({
                item: {
                    value,
                    variantID: getVariantID._id
                }
            })
        }
    }, [properties, productID, publish_product, type])

    const getContainer = useMemo(() => {
        switch (type) {
            case "Color":
                return (
                    <Box
                        borderRadius="100%"
                        onClick={() => addProperty(name)}
                        width="32px"
                        height="32px"
                        cursor={productID && publish_product ? "auto" : "pointer"}
                        background={hex}
                        className={`${checkItem(name) ? classes.active : ""} ${classes.box}`}
                    ></Box>
                )
            case "Size":
                return (
                    <Box
                        borderRadius="28px"
                        onClick={() => addProperty(name)}
                        padding="6px 16px"
                        cursor={productID && publish_product ? "auto" : "pointer"}
                        background="#1C1C1C"
                        className={`${checkItem(name) ? classes.active : ""} ${classes.box}`}
                    >{name}</Box>
                )
            default:
                return <></>
        }
    }, [type,properties])

    return getContainer
}

export default PropertyItem