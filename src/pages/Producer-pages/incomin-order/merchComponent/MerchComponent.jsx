import { Text, Flex, Image, } from "@chakra-ui/react"


export default function MerchComponent({ item }) {

    const textStyel = {
        color: "#ddd",
        fontWeight: "500"
    }

    let sku = item.sku

    let price = sku.price

    let findSku = item.product.skus.find(sku => sku._id == item.sku._id)

    let variantText = ' '
    findSku.options.forEach((opt, i) => {
        variantText += (opt.variantName + " : " + opt.value + '\xa0\xa0\xa0\xa0\xa0\xa0')
    })


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

                    <Text style={textStyel} fontSize={{ base: "10px", md: "16px" }} >{variantText}</Text>
                    <Text style={textStyel} fontSize={{ base: "10px", md: "16px" }} > quantity :  {item.quantity}</Text>
                    <Text style={textStyel} fontSize={{ base: "10px", md: "16px" }} > price : $ {price}</Text>
                </Flex>
            </Flex>


        </Flex>
    )
}