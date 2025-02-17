import { Box } from '@chakra-ui/react'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import React from 'react'
import Tabs from './components/Tabs'

export default function OnchainRecords() {
    return (
        <PageGrid.Root flexProps={{ overflowX: "hidden", padding: 0 }}>
            <Box mx={6} mt={6}>
                <PageGrid.Header title="Onchain Inventory" description="Manage, distribute and track inventory records." />
            </Box>
            <Tabs />
        </PageGrid.Root>
    )
}
