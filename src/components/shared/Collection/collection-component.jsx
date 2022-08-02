
import { useNavigate } from "react-router-dom";
import { useToasty } from "../../../context/toastify/ToastContext"
import { Flex, Text, Box } from "@chakra-ui/react"

import Product from "../Product/Product"

export default function Collection({ collection, shopname }) {


    const { successToast } = useToasty()
    const navigate = useNavigate()

    let iframe = `<iframe
            style={{width:'100%' , height:"100%"  , overflow:'hidden' }}
            scrolling="no"
                title='product'
                src='https://ngsf.flatlay.io/collection-iframe/${collection._id}'
                allowFullScreeng
            />`

    const embed = () => {
        navigator.clipboard.writeText(iframe).then(function () {
            successToast('Copying to clipboard was successful!');
        });
    }

    const seeMore = () => {
        navigate(`/${shopname}/collection/${collection._id}`)
    }

    return (
        <>
            <Flex
                justifyContent='center'
                alignItems='start'
                flexDirection='column'
                w='100%'
                maxW='750px'
                mb={{ base: '20px', md: '30px' }}
                p='10px 10px 0px 10px'
            >

                {/* head */}
                <Flex
                    w='100%'
                    justifyContent='space-between'
                    h='auto'
                    mb='10px'
                >
                    <Text
                        color='#fff'
                        fontSize={{ base: '16px', md: '22px' }}
                        fontWeight='600'
                    >{collection.title}</Text>
                    <Flex >
                        <Flex
                            p={{ base: "4px 10px 1px 10px", md: '4px 20px' }}
                            color='#fff'
                            bgColor="#353536"
                            fontSize={{ base: "8px", md: '14px' }}
                            fontWeight="500"
                            borderRadius='8px'
                            justifyContent='center'
                            alignItems='center'
                            cursor='pointer'
                            _hover={{
                                bgColor: "#555558"
                            }}
                            onClick={embed}
                        >
                            embed
                        </Flex>
                        <Flex
                            p={{ base: "4px 10px 1px 10px", md: '4px 20px' }}
                            color='#fff'
                            bgColor="#353536"
                            fontSize={{ base: "8px", md: '14px' }}
                            fontWeight="500"
                            borderRadius='8px'
                            justifyContent='center'
                            alignItems='center'
                            ml='10px'
                            cursor='pointer'
                            _hover={{
                                bgColor: "#555558"
                            }}
                            onClick={seeMore}
                        >
                            See more
                        </Flex>
                    </Flex>

                </Flex>
                {/* head */}
                {(collection.products.length == 0) &&
                    <Text
                        color='#fff'
                        fontSize={{ base: "18px", md: '24px' }}
                        fontWeight='600'
                        w='100%'
                        textAlign='center'
                        mt='30px'
                    >
                        Empty
                    </Text>
                }

                <Flex
                    w='100%'
                    wrap='wrap'
                >
                    {collection.products.map((product, i) => {
                        if (i < 4) {
                            return (
                                <Box
                                    key={i}
                                    w={{ base: '50%', md: '25%' }}
                                    p='3px'
                                >
                                    <Product
                                        title={product.title}
                                        imageUrl={product.media[0].url}
                                        id={product._id}
                                        shopname={shopname}
                                    />
                                </Box>
                            )
                        }
                    })}
                </Flex>

            </Flex>
        </>
    )
}