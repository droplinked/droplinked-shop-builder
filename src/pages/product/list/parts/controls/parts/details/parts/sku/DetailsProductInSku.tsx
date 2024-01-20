import { Box, Flex, useDisclosure, VStack } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import RecordModal from 'pages/product/single/parts/modules/variants/parts/table/parts/recordModal/RecordModal'
import React, { useState } from 'react'
import { useContext } from 'react'
import detailsProductContext from '../../context'
import classes from './style.module.scss'

function DetailsProductInSku() {
    const { product, fetch } = useContext(detailsProductContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [Sku, setSku] = useState()

    return (
        <>
            <VStack align="stretch" lineHeight="30px">
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th><AppTypography fontWeight='bold' fontSize='14px'>Variants</AppTypography></th>
                            <th><AppTypography fontWeight='bold' fontSize='14px'>Inventory Status</AppTypography></th>
                            <th><AppTypography fontWeight='bold' fontSize='14px'>Price</AppTypography></th>
                            <th style={{ textAlign: "center" }}><AppTypography fontWeight='bold' fontSize='14px'>Drop</AppTypography></th>
                        </tr>
                    </thead>
                    <tbody>
                        {product?.skuIDs && product.skuIDs.map((el: any, key: number) => (
                            <tr key={key}>
                                <td><AppTypography fontSize='14px'>{el.options.map(el => el.caption).join("-")}</AppTypography></td>
                                <td>---</td>
                                <td><AppTypography fontSize='14px'>{el.price} USD</AppTypography></td>
                                <td>
                                    <Flex justifyContent="center">
                                        {el?.recordData && el.recordData.status !== "NOT_RECORDED" ?
                                            <Flex justifyContent={"center"}><AppTypography fontSize='12px' backgroundColor={"#000"} borderRadius="100px" padding="4px 20px">{el?.recordData.status}</AppTypography></Flex>
                                            :
                                            <AppIcons.TearIcon width="16px" height="16px" cursor="pointer" onClick={() => {
                                                setSku(el)
                                                onOpen()
                                            }} />
                                        }
                                    </Flex>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </VStack>

            {isOpen && <RecordModal close={() => {
                fetch()
                onClose()
            }} open={isOpen} product={product} sku={Sku} />}
        </>
    )
}

export default DetailsProductInSku