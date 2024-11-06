import { Button, Flex, Td, Tr, useDisclosure } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import useAppToast from 'functions/hooks/toast/useToast'
import Input from 'pages/invoice-management/components/Input'
import React, { forwardRef, useEffect, useState } from 'react'
import ProductTitleCell from '../../../ProductTitleCell'
import VariantsDropdown from './variants-dropdown/VariantsDropdown'
import useAppStore from 'lib/stores/app/appStore'
import { currencyConvertion } from 'lib/utils/helpers/currencyConvertion'

interface Props {
    product: any
    cart: any
    setCart: any
}

const ProductRow = forwardRef<HTMLTableRowElement, Props>(function (props, ref) {
    const { product, cart, setCart } = props
    const [quantity, setQuantity] = useState(0)
    const [skuId, setSkuId] = useState("")
    const { showToast } = useAppToast()
    const isDigitalProduct = product.product_type === "DIGITAL"
    const firstSkuPrice = product.skuIDs?.[0]?.price
    const { shop: { currency } } = useAppStore();
    const handleAddToCart = (skuId, quantity) => {
        if (skuId && quantity) {
            if (cart.some(item => item.skuId === skuId)) {
                setCart(prevCart => prevCart.map(item => {
                    return item.skuId === skuId ?
                        { ...item, quantity: item.quantity + Number(quantity) } :
                        item
                }))
            }
            else setCart(prevCart => ([...prevCart, { skuId, quantity: Number(quantity) }]))
            setQuantity(0)
            setSkuId("")
            showToast({ type: "success", message: "Product added to cart" })
        }
        else {
            const message = isDigitalProduct ?
                "Quantity required. Please enter a value before adding" :
                "Please select both SKU and quantity before adding"
            showToast({ type: "info", message })
        }
    }

    useEffect(() => {
        if (isDigitalProduct) setSkuId(product.skuIDs[0]._id)
    }, [product, setSkuId])

    return (
        <Tr ref={ref} _hover={{ "button": { opacity: 1 } }}>
            <Td>
                <Flex alignItems="center" gap={6}>
                    <AppImage src={product.media[0]?.url} width={12} height={12} />
                    <ProductTitleCell title={product.title} wordLimit={35} />
                </Flex>
            </Td>
            <Td>
                <VariantsDropdown
                    selectedSKUId={skuId}
                    onSelectSKU={(selectedSKUId) => setSkuId(selectedSKUId)}
                    product={product}
                />
            </Td>
            <Td>
                <Input
                    inputProps={{
                        width: "68px",
                        type: "number",
                        value: quantity || "",
                        min: 1,
                        fontSize: 14,
                        color: "#fff",
                        placeholder: "1",
                        _focus: { borderColor: "#878787" },
                        onChange: (e) => setQuantity(parseInt(e.target.value)),
                        onKeyDown: (e) => {
                            const invalidKeys = ['+', '-', 'e']
                            if (invalidKeys.includes(e.key)) e.preventDefault()
                        }
                    }}
                />
            </Td>
            <Td color={"#fff"}>
                {firstSkuPrice ? `${currency.symbol}${currencyConvertion(firstSkuPrice, currency.conversionRateToUSD, false)} ${currency.abbreviation}` : "-"}
            </Td>
            <Td>
                <Button
                    size="sm"
                    border="1px solid #2BCFA1"
                    bg={"none"}
                    fontSize={12}
                    fontWeight={500}
                    color="#2BCFA1"
                    opacity={0}
                    transition="opacity 0.2s"
                    _hover={{}}
                    _focusVisible={{}}
                    _active={{}}
                    onClick={() => handleAddToCart(skuId, quantity)}
                >
                    Add
                </Button>
            </Td>
        </Tr>
    )
})

export default ProductRow