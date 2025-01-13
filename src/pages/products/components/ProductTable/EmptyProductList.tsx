import { Flex, Image, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import ProductTypesPopover from '../PageHeaderRightContent/ProductTypesPopover/ProductTypesPopover'

function EmptyProductList() {
    return (
        <Flex
            width="100%"
            height="80vh"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Image
                width="420px"
                height="352px"
                src="https://upload-file-droplinked.s3.amazonaws.com/34486d750011c9c70ff3a03fce40a866be649d583f049a1dbfa341c551d8e7f6_or.png"
                alt='Empty Table'
            />

            <Text mt="64px" mb="16px" color="#fff">
                Get started by adding your first product
            </Text>

            <ProductTypesPopover placement='top'>
                <Flex
                    as="button"
                    alignItems="center"
                    gap="6px"
                    padding="10px 14px"
                    fontSize={14}
                    color="#2BCFA1"
                >
                    <AppIcons.GreenPlus width="20px" />
                    New Product
                </Flex>
            </ProductTypesPopover>
        </Flex>
    )
}

export default EmptyProductList