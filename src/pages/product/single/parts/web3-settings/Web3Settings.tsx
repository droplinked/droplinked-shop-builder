import { Flex } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { productContext } from '../../context'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import DigitalProductAffiliate from '../modules/digitalProductAffiliate/DigitalProductAffiliate'
import DigitalProductNetwork from '../modules/digitalProductNetwork/DigitalProductNetwork'
import DigitalProductRoyalty from '../modules/digitalProductRoyalty/DigitalProductRoyalty'

function Web3Settings() {
    const { state: { product_type, digitalDetail, sku } } = useContext(productContext)
    const [showDetails, setDetailsVisibility] = useState(Boolean(digitalDetail?.chain))

    useEffect(() => {
        setDetailsVisibility(Boolean(digitalDetail?.chain))
    }, [setDetailsVisibility, digitalDetail?.chain])

    return (
        <>
            {product_type === "DIGITAL" && (
                <ProductCollapse
                    title='Web 3 settings'
                    description='Add the variants, and set a cover image to preview the product.'
                >
                    <Flex direction={"column"} gap={9}>
                        <DigitalProductNetwork showDetails={showDetails} setDetailsVisibility={setDetailsVisibility} />
                        {showDetails &&
                            <>
                                <DigitalProductAffiliate />
                                <DigitalProductRoyalty />
                            </>
                        }
                    </Flex>
                </ProductCollapse>
            )}
        </>
    )
}

export default Web3Settings