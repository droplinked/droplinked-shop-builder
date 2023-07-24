import { Box, Flex, HStack, Stack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AffiliateProduct from 'pages/affiliate/parts/product/AffiliateProduct'
import React, { useContext } from 'react'
import { shopsContainerContext } from '../../context'

function ShopsProduct() {
    const { shop } = useContext(shopsContainerContext)
    return (
        <Flex gap={[3, 5]} height="100%">
            {shop?.products && shop?.products.length && shop?.products.slice(0, 4).map((el: any, key: number) => (
                <Box key={key} width="25%">
                    <AffiliateProduct blockchain={el.skuIDs.length ? el.skuIDs[0].recordData.recordNetwork : ""} link={`${shop?.name}/${el?._id}`} image={el.media && el.media[0].url} title={el?.title} />
                </Box>
            ))}
        </Flex>
    )
}

export default ShopsProduct