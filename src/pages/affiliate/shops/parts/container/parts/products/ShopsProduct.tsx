import { Box, Flex, HStack, SimpleGrid, Stack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AffiliateProduct from 'pages/affiliate/parts/product/AffiliateProduct'
import React, { useContext } from 'react'
import { shopsContainerContext } from '../../context'

function ShopsProduct() {
    const { shop } = useContext(shopsContainerContext)
    return (
        <SimpleGrid gap="16px" columns={6} height="100%">
            {shop?.products && shop?.products.length && shop?.products.slice(0, 6).map((el: any, key: number) => (
                <Box key={key}>
                    <AffiliateProduct
                        props={{ backgroundColor: "#1C1C1C" }}
                        blockchain={el.skuIDs.length ? el.skuIDs[0].recordData.recordNetwork : ""}
                        link={`${shop?.name}/${el?._id}`} image={el.thumb || el.media.find(el => el.isMain === 'true')?.url}
                        title={el?.title}
                    />
                </Box>
            ))}
        </SimpleGrid>
    )
}

export default ShopsProduct