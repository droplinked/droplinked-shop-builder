import { Flex } from '@chakra-ui/react'
import React from 'react'
import MultiSelectMenu from '../multi-select-menu/MultiSelectMenu'
import ResponsiveTable from './ResponsiveTable'

export default function TransactionsTable() {
    return (
        <Flex mt={6} flexDirection="column" gap={4}>
            <Flex
                justifyContent="flex-end"
                alignItems="center"
                gap={3}
                flexDirection={{ base: "column", md: "row" }}
            >
                <MultiSelectMenu />
            </Flex>
            <ResponsiveTable />
        </Flex>
    )
}
