import { ModalBody } from '@chakra-ui/react'
import Table from 'components/redesign/table/Table'
import { CrawledProductsType } from 'pages/products/utils/types'
import React from 'react'

interface Props {
    handleClick: (url: string) => void
    selectedProducts: string[]
    crawledProduct: CrawledProductsType[]
}

export default function IdentifiedItemsBody({ handleClick, selectedProducts, crawledProduct }: Props) {

    return (
        <ModalBody
            display="flex"
            flexDirection="column"
            gap={4}
            paddingBlock={{ lg: '48px !important', md: '32px !important', base: '16px !important' }}
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor="neutral.gray.800"
        >
            <Table

            />
        </ModalBody>
    )
}
