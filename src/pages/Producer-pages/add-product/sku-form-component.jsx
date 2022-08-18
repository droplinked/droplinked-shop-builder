import { Flex, Box, chakra } from "@chakra-ui/react"
import { useEffect } from "react"
import { getOptionNameById } from "../utils/optionName"

import BasicButton from "../../../components/shared/BasicButton/BasicButton"

const SkuLable = chakra('lable', {
    baseStyle: {
        color: '#8053ff',
        fontWight: '500',
        fontSize: '18px',
        width: '40%',
        p: '5px',
        borderBottom: ' 2px solid #8053ff'
    },
})

const SkuInput = chakra('input', {
    baseStyle: {
        fontWeight: '600',
        fontSize: '18px',
        color: "#fff",
        w: '40%',
        p: '5px',
        border: '2px solid #b3b3b3',
        borderRadius: '8px',
        outline: 'none',
        bgColor: 'transparent',
        transition: '0.5s',
        _focus: {
            border: '2px solid #8053ff'
        }
    },
})

// this component get state , setState and return a object based on option type
// return  object like below
//  externalID: "a123",
//  price: 20,
//  quantity: 50,
//  options: [
//     {
//         "variantID": "628df708028da49d3f6a73eb",
//         "value": "large"
//     },]

const SkuForm = ({ skuData, setSkuData, optionsType, onSubmit, onCancel }) => {

    // initialize skudata and set "" for values
    useEffect(() => {
        let options = optionsType.map(option => { return { variantID: option.optionID, value: '' } })
        setSkuData({ externalID: '', price: '', quantity: '', options: options })
    }, [])

    // cahnge options array in skuData based on optionsType changes
    useEffect(() => {
        if (skuData) {
            let options = optionsType.map(option => {
                let find = skuData.options.find(currentOption => currentOption.variantID == option.optionID)
                if (find) {
                    return { variantID: option.optionID, value: find.value }
                } else {
                    return { variantID: option.optionID, value: '' }
                }
            })
            setSkuData({ ...skuData, options: options })
        }
    }, [optionsType])


    const onChnageValues = (e, Type) => {
        switch (Type) {
            case "PRICE":
                setSkuData({ ...skuData, price: parseFloat(e.target.value) })
                return
            case "QUANITY":
                setSkuData({ ...skuData, quantity: parseInt(e.target.value) })
                return
            case "ExternalId":
                setSkuData({ ...skuData, externalID: e.target.value })
                return
            case "OPTIONS":
                setSkuData({ ...skuData, options: e })
                return

        }
    }


    const onChangeOption = (value, optionId) => {

        let options = skuData.options.map(option => {
            if (option.variantID == optionId) {
                return { ...option, value: value }
            } else {
                return { ...option }
            }
        })
        onChnageValues(options, "OPTIONS")
    }

    const clear = () => { setSkuData({ externalID: '', price: '', quantity: '', options: [] }) }
    
    const closeForm = () => {
        clear()
        onCancel()
    }

    const SubmitForm = () => {
        onSubmit()
        clear()
    }

    return (
        <Box w='100%' border="1px solid #fff" borderRadius='8px' p='20px 20px'>

            {skuData && <>
                {(skuData.options.length > 0) &&
                    <>
                        {skuData.options.map((option, i) => {
                            return (
                                <Flex key={i} w='100%' justifyContent='space-between' mb='20px'>
                                    <SkuLable >{getOptionNameById(option.variantID)}</SkuLable>
                                    <SkuInput
                                        type="text"
                                        value={option.value}
                                        placeholder={getOptionNameById(option.variantID)}
                                        id={option.variantID}
                                        onChange={e => onChangeOption(e.target.value, option.variantID)}
                                    />
                                </Flex>
                            )
                        })}
                    </>
                }

                <Flex w='100%' justifyContent='space-between' mb='20px'>
                    <SkuLable>Price</SkuLable>
                    <SkuInput
                        type="number"
                        placeholder="$100"
                        value={skuData.price}
                        onChange={e => onChnageValues(e, "PRICE")}
                    />
                </Flex>
                <Flex w='100%' justifyContent='space-between' mb='20px'>
                    <SkuLable>Quantity</SkuLable>
                    <SkuInput
                        type="number"
                        placeholder="12"
                        value={skuData.quantity}
                        onChange={e => onChnageValues(e, "QUANITY")}
                    />
                </Flex>
                <Flex w='100%' justifyContent='space-between' mb='20px'>
                    <SkuLable>External ID</SkuLable>
                    <SkuInput
                        type="text"
                        placeholder="1794012584"
                        value={skuData.externalID}
                        onChange={e => onChnageValues(e, "ExternalId")}
                    />
                </Flex>
                <Flex w='100%' justifyContent='space-between'>
                    <Box w='40%'><BasicButton click={closeForm}>Cancel</BasicButton></Box>
                    <Box w='40%'><BasicButton click={SubmitForm}>Add</BasicButton></Box>
                </Flex>
            </>}
        </Box>
    )
}

export default SkuForm