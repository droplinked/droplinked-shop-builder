import image from "../../../../../assest/tshirt.jpg"
import axios from "axios"

import { Box, Text, Image } from '@chakra-ui/react'
import { BasicURL } from "../../../../../sevices/functoinal-service/CallApiService"
import { useState, useEffect } from "react"

export default function BasketItemComponent({ id, skuID, quantity }) {
    console.log(id)
    const [product, setProduct] = useState(null)

    useEffect(() => {

        axios.get(`${BasicURL}/product/${id}`)
            .then(e => {
                setProduct(e.data.data)
            })
            .catch(e => {
                console.log(e.response.data.reason)
            })

    }, [])



    console.log(product);

    return (
        <Box
            w="100%"
            h="80px"
            py="10px"
            borderBottom='1px'
            borderColor='white'
            display="flex"
        >
            {product &&
                <>
                    <Image src={product.media[0].url} w="25%" h="100%" mr="10px" alt='Merch' />

                    {/* right side */}
                    <Box
                        w="100%"
                        h="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                    >
                        <Box w="100%" display="flex" justifyContent="space-between">
                            <Text textAlign="center" fontSize="20px" color="white" fontWeight="600" >{product.title}</Text>
                            <Text textAlign="center" fontSize="20px" color="white" fontWeight="500" >$ 20</Text>
                        </Box>

                        <Box w="100%" display="flex" justifyContent="space-between">
                            <Text textAlign="center" fontSize="12px" color="#ccc" fontWeight="600" >Size : xl   Color : white</Text>
                            <Text textAlign="center" fontSize="12px" color="#ccc" fontWeight="500" >quantity : {quantity}</Text>
                        </Box>
                    </Box>
                </>
            }
        </Box>
    )
}