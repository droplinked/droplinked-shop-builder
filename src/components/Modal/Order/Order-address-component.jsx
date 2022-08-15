import { Text, Box } from "@chakra-ui/react"

const OrderAddress = ({ address }) => {

    return (
        <Box >
              <Text fontSize={{base:'14px' , md:"16px"}} fontWeight="600" color="#fff" mb="5px">{address.country} - {address.city}, {address.firstname} {address.lastname}</Text>
                    <Text fontSize={{base:'12px' , md:"14px"}} fontWeight="500" color="#ddd" mb="0px">{address.addressLine1}</Text>
                    <Text fontSize={{base:'12px' , md:"14px"}} fontWeight="500" color="#ddd" mb="20px">{address.state} {address.zip} </Text>
        </Box>
    )
}

export default OrderAddress