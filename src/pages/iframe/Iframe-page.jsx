import { useState , useEffect } from "react"
import { Flex,Box, AspectRatio,  Image, keyframes, usePrefersReducedMotion } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

import { getCollectionById } from "../../api/public/Collection-api"

import right from "../../assest/icon/righIcon.png"
import left from "../../assest/icon/leftflask.png"
import Product from "../../components/shared/Product/Product"


const Iframe = () => {

    const [Collection, setCollectin] = useState(null)

    useEffect(() => {

        const getCollection =  async(id) =>{
            let coll = await getCollectionById(id)
            setCollectin(coll)
        }
        getCollection("62d6aa6fd9e50e107b6089fd")

    }, [])
    
    console.log(Collection)

    return (
        <Flex
            w='100%'
            h='100%'
            top='0'
            left='0'
            pos='fixed'
            zIndex='50'
            bgColor='#222'
            justifyContent='center'
            alignItems='start'
            overflowY="auto"
            css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#8053ff',
                  borderRadius: '24px',
                },
              }}
        >
            <Flex 
            wrap='wrap'
            w='100%'
            justifyContent='center'
            alignItems='start'
            
            >
                        {Collection && Collection.products.map((product, i) => {
                            return (
                                <Box
                                width={{ base: '100%', sm: '50%', md: '25%' }} 
                                p='2px'
                                >
                                    <Product shopname={"bedishop"} title={product.title} imageUrl={product.media[0].url} id={product._id} />
                                </Box>
                            )
                        })}
                        {Collection && Collection.products.map((product, i) => {
                            return (
                                <Box
                                width={{ base: '100%', sm: '50%', md: '25%' }} 
                                p='2px'
                                >
                                    <Product shopname={"bedishop"} title={product.title} imageUrl={product.media[0].url} id={product._id} />
                                </Box>
                            )
                        })}
                        {Collection && Collection.products.map((product, i) => {
                            return (
                                <Box
                                width={{ base: '100%', sm: '50%', md: '25%' }} 
                                p='2px'
                                >
                                    <Product shopname={"bedishop"} title={product.title} imageUrl={product.media[0].url} id={product._id} />
                                </Box>
                            )
                        })}
                        {Collection && Collection.products.map((product, i) => {
                            return (
                                <Box
                                width={{ base: '100%', sm: '50%', md: '25%' }} 
                                p='2px'
                                >
                                    <Product shopname={"bedishop"} title={product.title} imageUrl={product.media[0].url} id={product._id} />
                                </Box>
                            )
                        })}
                    </Flex>

        </Flex>
    )
}

export default Iframe
