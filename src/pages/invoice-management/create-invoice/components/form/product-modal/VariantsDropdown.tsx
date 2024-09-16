import { Box, Button, Circle, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import Input from 'pages/invoice-management/components/Input'
import React, { Fragment, useState } from 'react'

interface Props {
    selectedVariant: string | undefined
    onSelectVariant: (sku: string) => void
    product: any
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export default function VariantsDropdown({ selectedVariant, onSelectVariant, product, isOpen, onOpen, onClose }: Props) {

    return (
        <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement='bottom-start'>
            <DropdownTrigger isOpen={isOpen} />
            <DropdownContent
                selectedVariant={selectedVariant}
                onSelectVariant={onSelectVariant}
                product={product}
                onClose={onClose}
            />
        </Popover>
    )
}

const DropdownTrigger = ({ isOpen }: { isOpen: boolean }) => (
    <PopoverTrigger>
        <Button
            minW={"156px"}
            display={"flex"}
            alignItems={"center"}
            border={`1.5px solid ${isOpen ? '#878787' : '#292929'}`}
            borderRadius={8}
            px={4}
            py={3}
            background={"none"}
            color={"#7B7B7B"}
            _hover={{}}
            _focusVisible={{}}
            _active={{}}
        >
            <AppTypography flex={1} textAlign={"left"} fontSize={14}>Size / Color</AppTypography>
            <AppIcons.SelectChevronDown
                style={{
                    transform: `rotate(${isOpen ? '180deg' : '0deg'})`,
                    transition: '.2s',
                }}
            />
        </Button>
    </PopoverTrigger>
)

const DropdownContent = ({ selectedVariant, onSelectVariant, product, onClose }) => {
    const [searchTerm, setSearchTerm] = useState("")

    const sortedOptions = (options) => {
        const colorOption = options.find(opt => opt.variantName === "Color")
        const sizeOption = options.find(opt => opt.variantName === "Size")
        const otherOptions = options.filter(opt => !["Color", "Size"].includes(opt.variantName))
        return [colorOption, sizeOption, ...otherOptions].filter(Boolean)
    }

    const filteredSkus = product.skuIDs.filter((sku) => {
        const optionsText = sku.options
            .map(option => `${option.variantName} ${option.caption}`)
            .join(" ")
            .toLowerCase()
        return optionsText.includes(searchTerm.toLowerCase())
    })

    const handleVariantSelect = (skuId) => {
        onSelectVariant(skuId)
        onClose()
    }

    return (
        <PopoverContent
            border={"1px solid #292929"}
            borderRadius={8}
            padding={0}
            overflow={"hidden"}
            bgColor={"#1C1C1C"}
        >
            <PopoverBody
                display={"flex"}
                flexDirection={"column"}
                gap={5}
                padding={0}
            >
                <Box padding={5} pb={0}>
                    <Input
                        icon={<AppIcons.Search />}
                        inputGroupProps={{ height: 12, sx: { "svg path": { stroke: "white" } } }}
                        inputProps={{ placeholder: "Search variants", onChange: (e) => setSearchTerm(e.target.value) }}
                    />
                </Box>

                <Flex
                    maxHeight={"200px"}
                    overflowY={"auto"}
                    direction={"column"}
                    gap={2}
                    padding={5}
                    pt={0}
                    sx={{
                        "&::-webkit-scrollbar-track": {
                            background: "#1C1C1C"
                        }
                    }}
                >
                    {filteredSkus.map((sku: any, index: number) => (
                        <Flex
                            key={index}
                            alignItems={"center"}
                            borderRadius={8}
                            padding={4}
                            cursor={"pointer"}
                            userSelect={"none"}
                            _hover={{ bgColor: "#292929" }}
                            onClick={() => handleVariantSelect(sku._id)}
                        >
                            <Flex flex={1} alignItems={"center"} gap={8}>
                                {sortedOptions(sku.options).map((option: any, index: number) => (
                                    <Fragment key={index}>
                                        {option?.variantName === "Color" ?
                                            <Circle size={6} mr={-4} bgColor={option?.value} /> :
                                            <AppTypography
                                                position={"relative"}
                                                fontSize={16}
                                                fontWeight={500}
                                                color={"white"}
                                                _after={{ content: "''", position: "absolute", top: 0, bottom: 0, right: "-16px", width: "1px", backgroundColor: "#3C3C3C" }}
                                                _last={{ _after: { display: "none" } }}
                                            >
                                                {option?.caption}
                                            </AppTypography>
                                        }
                                    </Fragment>
                                ))}
                            </Flex>
                            {selectedVariant === sku._id && <AppIcons.Tick />}
                        </Flex>
                    ))}

                    {filteredSkus.length === 0 && <AppTypography fontSize={16} fontWeight={500} color={"white"} textAlign={"center"}>No variants found</AppTypography>}
                </Flex>
            </PopoverBody>
        </PopoverContent>
    )
}