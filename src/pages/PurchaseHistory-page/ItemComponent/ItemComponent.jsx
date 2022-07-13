import { Text, Flex, Img, AspectRatio } from "@chakra-ui/react"


export default function Item({ item }) {

    return (
        <Flex flexDirection='column' w={{ base: "50%", md: "25%" }} mb='15px'>
            <AspectRatio ratio={1}>
                <Img src={item.product.media[0].url} w='100%' h='100%' borderRadius='16px' p='6px' />
            </AspectRatio>
            <Text w='100%' textAlign='center' color='white' fontSize='16px' fontWeight='600' >
                {item.product.title}
            </Text>
        </Flex>)
}

//