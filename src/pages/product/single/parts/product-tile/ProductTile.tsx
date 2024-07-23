import { Flex, Link, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import WithPermission from 'functions/hoc/shop-permissions/WithPermission'
import React, { useContext } from 'react'
import { productContext } from '../../context'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import ProductTileModal from './product.tile.modal'
import ProductTileTable from './product.tile.table'

function ProductTile() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { state: { productTile }, productID } = useContext(productContext)

    return (
        <>
            <ProductCollapse
                title="Product Tile"
                description={
                    <AppTypography fontSize={14}>
                        Generate personalized product tiles for your website by choosing specific SKUs.
                        For detailed guidance on using product tiles, refer to our{" "}
                        <Link
                            href="https://droplinked.gitbook.io/droplinked-store-front-help-center/getting-started/product-tile"
                            target="_blank"
                            textDecoration="underline"
                            color="#33A9EC"
                        >
                            Documentation
                        </Link>.
                    </AppTypography>
                }
                isRequired={false}
                isDisabled={!productID}
            >
                <WithPermission requiredPermission='product_tile_display'>
                    <Flex direction="column" gap={6}>
                        <Flex justify="space-between" align="center">
                            <AppTypography fontSize={16} color="#C2C2C2">My Tiles</AppTypography>
                            <Flex as="button" align="center" gap={1} onClick={onOpen}>
                                <AppIcons.BluePlus />
                                <AppTypography fontSize={14} color="#33A9EC">Create new tile</AppTypography>
                            </Flex>
                        </Flex>
                        {!productTile?.length ? (
                            <Flex justifyContent="center" align="center" gap={1}>
                                <AppIcons.InfoIcon />
                                <AppTypography color="#C2C2C2">You don’t have any product tile.</AppTypography>
                            </Flex>
                        ) : (
                            <ProductTileTable />
                        )}
                    </Flex>
                </WithPermission>
            </ProductCollapse>
            <WithPermission requiredPermission='product_tile_display' action='hide'>
                {isOpen && <ProductTileModal isOpen={isOpen} close={onClose} />}
            </WithPermission>
        </>
    )
}

export default ProductTile