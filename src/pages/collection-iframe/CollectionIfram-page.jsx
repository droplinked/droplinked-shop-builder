import { useState, useEffect } from "react"
import { Flex, Box } from '@chakra-ui/react'
import { getCollectionById } from "../../api/public/Collection-api"
import { useParams } from "react-router-dom";

import FrameProduct from "./iframe-product-component"
import Loading from "../../components/shared/loading/Loading"


const CollectionIframe = () => {

    const [Collection, setCollectin] = useState(null)
    const collectionId = useParams().collectionId


    useEffect(() => {
        const getCollection = async (id) => {
            let coll = await getCollectionById(id)
            setCollectin(coll)
        }
        getCollection(collectionId)

    }, [])


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
            <>

                {Collection
                    ?
                    <Flex
                        wrap='wrap'
                        w='100%'
                        justifyContent='start'
                        alignItems='start'
                    >
                        {Collection.products.map((product, i) => {
                            return (
                                <Box key={i} width={{ base: '100%', sm: '50%', md: '25%' }} >
                                    <FrameProduct price={product.skus[0].price} imageUrl={product.media[0].url} id={product._id} />
                                </Box>
                            )
                        })}
                        {Collection.products.map((product, i) => {
                            return (
                                <Box key={i} width={{ base: '100%', sm: '50%', md: '25%' }} >
                                    <FrameProduct price={product.skus[0].price} imageUrl={product.media[0].url} id={product._id} />
                                </Box>
                            )
                        })}
                        {Collection.products.map((product, i) => {
                            return (
                                <Box key={i} width={{ base: '100%', sm: '50%', md: '25%' }} >
                                    <FrameProduct price={product.skus[0].price} imageUrl={product.media[0].url} id={product._id} />
                                </Box>
                            )
                        })}
                    </Flex>
                    :
                    <Flex
                        w='100%'
                        justifyContent='center'
                        alignItems='center'
                    >
                    <Loading />
                    </Flex>
                }
            </>
        </Flex>
    )
}

export default CollectionIframe
