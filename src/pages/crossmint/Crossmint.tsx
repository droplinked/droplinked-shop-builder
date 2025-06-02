import PageGrid from 'components/redesign/page-grid/PageGrid'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React from 'react'
import InventorySection from './components/InventorySection'
import WalletSection from './components/WalletSection'

function Crossmint() {
    return (
        <PageGrid.Root>
            <PageGrid.Header
                title="Crossmint"
                description='Description'
            />
            <PageGrid.Content>
                <RuledGrid columns={1} nested>
                    <WalletSection />
                    <InventorySection />
                </RuledGrid>
            </PageGrid.Content>
        </PageGrid.Root>
    )
}

export default Crossmint