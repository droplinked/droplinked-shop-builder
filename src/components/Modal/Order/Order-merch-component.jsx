import { Text, Flex, Image, } from "@chakra-ui/react"


export default function OrderMerch({ item }) {

    // style for variant and quantity and price text
    const textStyel = {
        color: "#ddd",
        fontWeight: "500"
    }


    // get variant name and value in set in string
    let variantText = ' '
    item.sku.options.forEach(option => {
        let variantName = (option.variantID == "62a989ab1f2c2bbc5b1e7153" ? "Size" : "Color")
        variantText += `${variantName}: ${option.value}\xa0\xa0\xa0\xa0\xa0\xa0`
    })

    const Totalprice = parseFloat(item.quantity * item.sku.price)


    return (
        <Flex
            borderBottom='1px'
            borderColor='#fff'
            pb='5px'
            h={{ base: '50px', md: '70px' }}
        >
            <Image
                src={item.product.media[0].url}
                objectFit='cover'
                w={{ base: "45px", md: '65px' }}
                h={{ base: "45px", md: '65px' }}
                mr='15px'
            />

            <Flex
                flexDirection='column'
                w='100%'
                justifyContent='space-between'
            >
                <Text
                    color="#fff"
                    fontSize={{ base: "16px", md: '20px' }}
                    fontWeight='600'
                    overflow='hidden'
                >
                    {item.product.title}
                </Text>
                <Flex
                    w='100%'
                    justifyContent='space-between'
                >

                    <Text style={textStyel} w='55%' fontSize={{base:'8px' , sm: "10px", md: "14px" }} >{variantText}</Text>
                    <Text style={textStyel} w='30%' fontSize={{base:'8px' , sm: "10px", md: "14px" }} > Quantity: {item.quantity}</Text>
                    <Text style={textStyel} textAlign='end' w='15%' fontSize={{base:'8px' , sm: "10px", md: "14px" }} >${Totalprice}</Text>
                </Flex>
            </Flex>

        </Flex>
    )
}