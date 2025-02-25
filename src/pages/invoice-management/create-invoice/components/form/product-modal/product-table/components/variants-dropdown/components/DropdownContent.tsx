import { Flex, PopoverBody, PopoverContent } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import Input from 'components/redesign/input/Input'
import React, { useState } from 'react'
import SKUOptions from './SKUOptions'

interface Props {
    product: any
    selectedSKUId: string | undefined
    onSelectSKU: (skuId: string) => void
    onClose: () => void
}

function DropdownContent({ selectedSKUId, onSelectSKU, product, onClose }: Props) {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredSkus = product.skuIDs.filter((sku) => {
        const optionsText = sku.options
            .map(option => `${option.variantName} ${option.caption}`)
            .join(" ")
            .toLowerCase()
        return optionsText.includes(searchTerm.toLowerCase())
    })

    const handleVariantSelect = (skuId) => {
        onSelectSKU(skuId)
        onClose()
    }

    return (
        <PopoverContent
            border="1px solid #292929"
            borderRadius={8}
            padding={0}
            overflow="hidden"
            bgColor="#1C1C1C"
        >
            <PopoverBody padding={0}>
                <Input
                    leftElement={<AppIcons.Search />}
                    inputGroupProps={{ height: 12, margin: 5, sx: { "svg path": { stroke: "white" } } }}
                    inputProps={{ placeholder: "Search variants", onChange: (e) => setSearchTerm(e.target.value) }}
                />

                <Flex
                    maxHeight="200px"
                    overflowY="auto"
                    direction="column"
                    gap={2}
                    padding={5}
                    pt={0}
                    sx={{ "&::-webkit-scrollbar-track": { background: "#1C1C1C" } }}
                >
                    {filteredSkus.map((sku: any, index: number) => (
                        <Flex
                            key={index}
                            justifyContent="space-between"
                            alignItems="center"
                            gap={4}
                            borderRadius={8}
                            padding={4}
                            cursor="pointer"
                            userSelect="none"
                            _hover={{ bgColor: "#292929" }}
                            onClick={() => handleVariantSelect(sku._id)}
                        >
                            <SKUOptions options={sku.options} />
                            {selectedSKUId === sku._id && <AppIcons.Tick style={{ flexShrink: 0 }} />}
                        </Flex>
                    ))}

                    {filteredSkus.length === 0 && <AppTypography textAlign="center" fontSize={16} fontWeight={500} color="white">No variants found</AppTypography>}
                </Flex>
            </PopoverBody>
        </PopoverContent>
    )
}

export default DropdownContent