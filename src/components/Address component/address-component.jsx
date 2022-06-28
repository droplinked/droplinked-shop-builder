import { Box, Text, Flex, Button } from "@chakra-ui/react"

export default function AddressComponent() {

    return (
        <Box h="auto" mb="4" border='1px' borderColor='#555' borderRadius="15px" p="24px 20px 16px 20px">

            <Text fontSize="18px" fontWeight="600" color="#fff" mb="10px">Germany - Berlin</Text>
            <Text fontSize="16px" fontWeight="500" color="#ddd" mb="4px">Address line 1 on this lline</Text>
            <Text fontSize="16px" fontWeight="500" color="#ddd" mb="20px">street ZIP | Firstname Lastname </Text>

            <Flex alignItems='center' justifyContent="space-between">
                <Button
                    w="30%"
                    fontSize="16px"
                    color="#fff"
                    fontWeight="600"
                    bgColor="#8053ff"
                    h="35px"
                    _hover={{ bgColor: "4d4d4d", color: "#222" }}
                >
                    Select address
                </Button>

                <Flex alignItems='center' justifyContent="space-between" w="40%">
                <Button colorScheme='red' w="40%">Delete</Button>
                <Button colorScheme='messenger' w="40%">Edit</Button>
                </Flex>
            </Flex>
        </Box>
    )
}