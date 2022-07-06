import { Text, Box, Flex, Button, Image, extendTheme } from "@chakra-ui/react"

import merchimage from "./merchImage.jpg"

export default function MerchComponent() {

    const textStyel = {
        color: "#ddd",
       
        fontWeight: "500"
    }

    return (
        <Flex
            borderBottom='1px'
            borderColor='#fff'
            pb='5px'
            h={{base:'50px',md:'70px'}}
        >
            <Image
                src={merchimage}
                objectFit='cover'
                w={{base:"45px",md:'65px'}}
                h={{base:"45px",md:'65px'}}
                mr='15px'
            />

            <Flex
                flexDirection='column'
                w='100%'
                justifyContent='space-between'
            >
                <Text
                    color="#fff"
                    fontSize={{base:"14px" , md:'18px'}}
                    fontWeight='500'
                    overflow='hidden'
                >
                    Merch title xxxxxxxxxxxxxxxxx
                </Text>
                <Flex
                    w='100%'
                    justifyContent='space-between'
                >
                    <Text style={textStyel}  fontSize= {{base:"10px" , md:"16px"}} > sku : 1234556</Text>
                    <Text style={textStyel}  fontSize= {{base:"10px" , md:"16px"}} > quantity :  10</Text>
                    <Text style={textStyel} fontSize= {{base:"10px" , md:"16px"}} > price : $ 18</Text>
                </Flex>
            </Flex>


        </Flex>
    )
}