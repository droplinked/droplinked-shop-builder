import { Flex, Link, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from 'react'
import { productContext } from '../../context'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import ProductTileEmptyBox from '../modules/productTileEmptyBox/ProductTileEmptyBox'
import ProductTileModal from '../modules/productTileModal/ProductTileModal'
import ProductTileTable from '../modules/productTileTable/ProductTileTable'

function ProductTile() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { state: { sku, productTile }, productID, methods: { updateState } } = useContext(productContext)
    return (
        productID ?
            <>
                <ProductCollapse
                    title="Product Tile"
                    description={
                        <AppTypography fontSize={14}>
                            Generate personalized product tiles for your website by choosing specific SKUs.
                            For detailed guidance on using product tiles, refer to our{" "}
                            <Link href='https://www.google.com' target="_blank" textDecoration="underline" color="#33A9EC">Documentation</Link>.
                        </AppTypography>
                    }
                    isReuired={false}
                >
                    <Flex direction="column" gap={6}>
                        <Flex justify="space-between" align="center">
                            <AppTypography fontSize={16} color="#C2C2C2">My Tiles</AppTypography>
                            <Flex as="button" align="center" gap={1} onClick={onOpen}>
                                <AppIcons.BluePlus />
                                <AppTypography fontSize={14} color="#33A9EC">Create new tile</AppTypography>
                            </Flex>
                        </Flex>
                        {productTile.length === 0 ?
                            <ProductTileEmptyBox /> :
                            <ProductTileTable />
                        }
                    </Flex>
                </ProductCollapse>
                {isOpen && <ProductTileModal isOpen={isOpen} close={onClose} />}
            </>
            : null
    )
}

export default ProductTile