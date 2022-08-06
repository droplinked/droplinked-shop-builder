
import { Box, Text, Image } from '@chakra-ui/react'


export default function BasketItemComponent({ item }) {


  // let skuValue = item.product.skus.find(sku => sku._id == item.skuID) 

    return (
        <Box
            w="100%"
            h="80px"
            py="10px"
            borderBottom='1px'
            borderColor='white'
            display="flex"
        >     
                    <Image src={item.product.media[0].url} w="25%" h="100%" mr="10px" alt='Merch' />
              
                    <Box
                        w="100%"
                        h="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                    >
                        <Box w="100%" display="flex" justifyContent="space-between">
                            <Text textAlign="center" fontSize="20px" color="white" fontWeight="600" >{item.product.title}</Text>
                            {/* <Text textAlign="center" fontSize="20px" color="white" fontWeight="500" >${skuValue.price}</Text> */}
                        </Box>

                        <Box w="100%" display="flex" justifyContent="space-between">
                          
                            <Text textAlign="center" fontSize="12px" color="#ccc" fontWeight="500" >quantity : {item.quantity}</Text>
                        </Box> 
                    </Box>  
                
        </Box>
    )
}  