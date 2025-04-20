import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import React from 'react'

export default function PurchaseHistory() {
    return (
        <PageGrid.Root flexProps={{ overflowX: "hidden", padding: 0 }}>
            <PageGrid.Header
                title="Purchase History"
                description="Easily view, manage and track all orders here."
                rightContent={
                    <Flex>
                        <Button
                            fontSize={14}
                            fontWeight={500}
                            iconSpacing="6px"
                            paddingInline="14px"
                            variant='secondary'
                            onClick={() => alert("Export Clicked")}
                        >
                            Export
                        </Button>
                    </Flex>
                }
            />

            <PageGrid.Content>
                {/* <Records /> */}
                <div>Purchase History</div>
            </PageGrid.Content>
        </PageGrid.Root>
    )
}
