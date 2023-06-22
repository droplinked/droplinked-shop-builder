import { Box, Checkbox, Input, useDisclosure, VStack } from '@chakra-ui/react'
import AppDropDown from 'components/common/form/dropdown/AppDropDown'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react'

interface IProps {
    isDisabled: boolean
    value: any
    name: string
    index: number
}
function VariantsUnlimited({ index, isDisabled, name, value }: IProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { state: { sku }, methods: { updateState } } = useContext(productContext)
    const inputRef = useRef(null);

    const updateSku = useCallback((value: any) => {
        const refactor = sku.map((el, key) => (key === index ? { ...el, quantity: value } : el))
        updateState("sku", refactor)
    }, [sku, index, name, value])

    const item = useCallback((value: any) => <Box padding="6px 10px" onClick={() => {
        updateSku(value)
        onClose()
    }} cursor="pointer">{value === -1 ? "∞" : value}</Box>, [updateSku])

    const rows = useMemo(() => {
        let html = []
        for (let index = 1; index < 21; index++) {
            html.push(item(index))
        }
        return html
    }, [sku])

    const handleOutsideClick = (e: any) => !inputRef.current.contains(e.target) && onClose()

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <Box width="60px" position="relative" ref={inputRef} className='test'>
            <Input
                type="text"
                onFocus={onOpen}
                variant={"unstyled"}
                // readOnly
                value={value === -1 ? "∞" : value}
                background="#141414"
                border={"none"}
                isDisabled={name === "cost" || isDisabled}
                outline="none"
                _disabled={{ opacity: ".3" }}
                width="100%"
                padding="3px"
                color="#808080"
                onChange={(e) => e.target.value && parseInt(e.target.value) > 0 && updateSku(parseInt(e.target.value))}
            />
            {isOpen && (
                <VStack align="stretch" zIndex={1} maxHeight="200px" top={8} right={0} left={0} overflow="auto" spacing={0} position="absolute" backgroundColor="#272728" borderRadius="5px" color="#FFF" width="100%">
                    {item(-1)}
                    {rows}
                </VStack>
            )}
        </Box>
    )
}

export default VariantsUnlimited