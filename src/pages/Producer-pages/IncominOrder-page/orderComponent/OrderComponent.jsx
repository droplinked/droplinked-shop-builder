import { Text, Box, Flex } from "@chakra-ui/react"

export default function OrderComponent({ seen }) {

    return (
        <Box
            border='1px'
            borderColor={(seen)? "#8053ff":"#aaa"}
            borderRadius='16px'
            p='15px 20px'
        >
            <Flex
            justifyContent='space-between'
            >
            <Text
                color='#fff'
                fontSize='16px'
                fontWeight='600'
                mb='20px'
            >
                Order time : 4 hours ago
            </Text>

            {(seen) &&
            <Text
                color='#8053ff'
                fontSize='16px'
                fontWeight='600'
                mb='20px'
            >
                New
            </Text>
            }

            </Flex>


            <Text
                color='#fff'
                fontSize='16px'
                fontWeight='600'
                mb='20px'
            >
                Merch quantity : 10 Merch
            </Text>
            <Flex
            w='100%'
            justifyContent='space-between'
            >
                <Text
                    color='#fff'
                    fontSize='24px'
                    fontWeight='600'
                >
                    Total price : $ 200
                </Text>
                <Text
                    color='#fff'
                    fontSize='20px'
                    fontWeight='600'
                    my="auto"
                    h="100%"
                    px="20px"
                    cursor='pointer'
                    _hover={{
                        border:'1px',
                        borderColor:'#8053ff',
                        borderRadius:'8px',
                        color:'#8053ff'
                    }}
                >
                    View order
                </Text>

            </Flex>

        </Box>
    )
}