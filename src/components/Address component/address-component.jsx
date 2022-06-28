import { Box, Text, Flex, Button } from "@chakra-ui/react"

export default function AddressComponent({address}) {

    console.log(address);
    return (
        <Box h="auto" mb="4" border='1px' borderColor='#555' borderRadius="15px" p="24px 20px 16px 20px">

            <Text fontSize="18px" fontWeight="600" color="#fff" mb="10px">{address.country} - {address.city}</Text>
            <Text fontSize="16px" fontWeight="500" color="#ddd" mb="4px">{address.addressLine1}</Text>
            <Text fontSize="16px" fontWeight="500" color="#ddd" mb="20px">{address.state} {address.zip} </Text>

            <Flex alignItems='center' justifyContent="space-between">
                <Button
                    w={{base:"45%" , md:"30%"}}
                    fontSize={{base:"12px" , md:"16px"}}
                    color="#fff"
                    fontWeight="600"
                    bgColor="#8053ff"
                    h="35px"
                    _hover={{ bgColor: "4d4d4d", color: "#222" }}
                >
                    Select address
                </Button>

                <Flex alignItems='center' justifyContent="space-between" w={{base:"45%" , md:"40%"}}>
                <Button colorScheme='red' w="45%"   h="35px"
                fontSize={{base:"12px" , md:"16px"}}
                >Delete</Button>
                <Button colorScheme='messenger' w="45%"   h="35px"
                fontSize={{base:"12px" , md:"16px"}}
                >Edit</Button>
                </Flex>
            </Flex>
        </Box>
    )
}