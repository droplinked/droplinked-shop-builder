import { Button, Flex, Td, Tr } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import AppInput from 'components/redesign/input/AppInput'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/invoice-management/ar.json'
import enLocale from 'locales/invoice-management/en.json'
import React, { forwardRef, useEffect, useState } from 'react'
import ProductTitleCell from '../../../product-table/components/ProductTitleCell'
import VariantsDropdown from './variants-dropdown/VariantsDropdown'

interface Props {
    product: any
    cart: any
    setCart: any
}

const ProductRow = forwardRef<HTMLTableRowElement, Props>(function (props, ref) {
    const { t } = useLocaleResources('invoice-management', { en: enLocale, ar: arLocale })
    const { product, cart, setCart } = props
    const [quantity, setQuantity] = useState(0)
    const [skuId, setSkuId] = useState("")
    const { showToast } = useAppToast()
    const isDigitalProduct = product.product_type === "DIGITAL"
    const firstSkuPrice = product.skuIDs?.[0]?.price
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
            showToast({ type: "success", message: t('ProductRow.messages.addedToCart') })
        }
        else {
            const message = isDigitalProduct ?
                t('ProductRow.messages.quantityRequired') :
                t('ProductRow.messages.selectSkuAndQuantity')
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
                    <ProductTitleCell title={product.title} wordLimit={20} />
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
                <AppInput
                    inputGroupProps={{ width: "68px" }}
                    inputProps={{
                        width: "68px",
                        type: "number",
                        value: quantity || "",
                        min: 1,
                        fontSize: 14,
                        color: "#fff",
                        placeholder: t('ProductRow.quantity.placeholder'),
                        _focus: { borderColor: "neutral.gray.400" },
                        onChange: (e) => setQuantity(parseInt(e.target.value)),
                        onKeyDown: (e) => {
                            const invalidKeys = ['+', '-', 'e']
                            if (invalidKeys.includes(e.key)) e.preventDefault()
                        }
                    }}
                />
            </Td>
            <Td color={"#fff"}>
                {firstSkuPrice ? <FormattedPrice price={firstSkuPrice} abbreviationProps={{ color: 'neutral.gray.400', fontSize: 16 }} /> : "-"}
            </Td>
            <Td>
                <Button
                    size="sm"
                    border="1px solid #2BCFA1"
                    bg="none"
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
                    {t('ProductRow.addButton')}
                </Button>
            </Td>
        </Tr>
    )
})

export default ProductRow