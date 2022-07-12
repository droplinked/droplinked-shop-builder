import { Box, Flex, Text, Image ,useDisclosure } from "@chakra-ui/react"
import { BasicURL } from "../../../sevices/functoinal-service/CallApiService"
import { useState, useEffect } from 'react'

import merchimage from "../../Producer-pages/IncominOrder-page/merchComponent/merchImage.jpg"
import axios from "axios"
import PurchaseModal from '../PurchaseModal/PurchaseModal'

export default function PurchaseHistory({ order }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [orderData, setOrderData] = useState(null)


    useEffect(async () => {
        //   console.log(order)
        let ProductsId = order.items.map(item => item.productID)
        let Products = await getProductsArray(ProductsId);
        addProductToOrder(Products);
    }, [])

    // get order date 
    const getDate = () => {
        let date = new Date(orderData.createdAt).toString().split(' ')
        date = date[1] + '/' + date[2] + '/' + date[3]
        return date
    }

    const getProductsArray = async (productsId) => {
        let promises = [];
        for (let i = 0; i < productsId.length; i++) {
            promises.push(axios.get(`${BasicURL}/product/${productsId[i]}`));
        }
        let results = await Promise.all(promises);
        results = results.map((e) => e.data.data);

        return results
    }


    const addProductToOrder = (ProductList) => {
        let newOrderList = order;
        newOrderList.items.forEach((item, i) => {
            let product = ProductList.find(product => product._id == item.productID)
            newOrderList.items[i] = { ...item, product: product }
        })
        setOrderData(newOrderList);
    }


    return (
        <>
            {(orderData) &&
                <Box
                    w='100%'
                    border='1px'
                    borderColor='#444'
                    borderRadius='8px'
                    p='10px 10px'
                    mb='30px'
                >
                    <Flex
                        borderBottom='1px'
                        borderColor='#444'
                        mb='15px'
                        pb='5px'
                        justifyContent='space-between'
                    >
                        <Text
                            color='#ddd'
                            fontSize={{ base: '8px', md: '16px' }}
                            fontWeight='500'
                            mr={{ base: '0px', md: '30px' }}
                        >
                            date : {getDate()}
                        </Text>
                        <Text
                            color='#ddd'
                            fontSize={{ base: '8px', md: '16px' }}
                            fontWeight='500'
                            mr={{ base: '0px', md: '30px' }}
                        >
                            orderID : {order._id}
                        </Text>
                        <Text
                            color='#ddd'
                            fontSize={{ base: '8px', md: '16px' }}
                            fontWeight='500'
                            mr={{ base: '0px', md: '30px' }}
                        >
                            Total Price : $ 150
                        </Text>
                    </Flex>
                    <Flex mb='10px'>
                        {orderData.items.map((item, i) => {
                            return <Image
                                key={i}
                                w={{ base: '70px', md: '100px' }}
                                h={{ base: '70px', md: '100px' }}
                                mr='20px'
                                borderRadius='8px'
                                src={item.product.media[0].url}
                            />
                        })}
                    </Flex>
                    <Text
                        color='#fff'
                        fontSize={{ base: '10px', md: '16px' }}
                        fontWeight='500'
                        mr='30px'
                        cursor='pointer'
                        _hover={{
                            color: '#8053ff'
                        }}
                        onClick={onOpen}
                    >
                        View
                    </Text>
                    <PurchaseModal order={orderData}  isOpen={isOpen} onClose={onClose}/>
                </Box>
            }
             
        </>
               
    )
}