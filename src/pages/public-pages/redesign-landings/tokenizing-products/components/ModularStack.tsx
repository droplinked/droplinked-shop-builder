import React from 'react'
import { CardData } from '../../_shared/components/card/Cards'
import PlatformFunctionalities from '../../_shared/components/PlatformFunctionalities'

export default function ModularStack() {
    const cardsData: CardData[] = [
        {
            title: 'Secure Custody and Ownership',
            description: 'Work with trusted custodians to securely store assets with the tokenized product records for onchain ownership and availability',
            gridColumn: { base: 'span 1', md: 'span 3' }
        },
        {
            title: 'Transparent and Immutable Records',
            description: 'Tokenization ensures all relevant product information, transaction history and ownership are stored immutably for accurate attribution',
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            title: 'Simple and Secure Transfers',
            description: 'Send and trade tokenized physical and digital items across platforms with onchain transparency to ensure trust between parties',
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            title: 'Digital Representation of Inventory',
            description: 'Tokenization allows you to create records representing inventory to enhancing traceability and secure ownership onchain',
            gridColumn: { base: 'span 1', md: 'span 3' }
        },
        {
            title: 'Enhanced Transparency',
            description: 'All details involved with the inventory from transaction history to product metadata are stored onchain to display to 3rd parties',
            gridColumn: { base: 'span 1', md: 'span 3' }
        },
        {
            title: 'Global Market Access',
            description: 'Tokenized assets can be traded globally to further unlock new market opportunities by adding liquidity for existing inventory',
            gridColumn: { base: 'span 1', md: 'span 2' }
        }
    ]

    const templateColumns = {
        base: '1fr',
        md: 'repeat(5, 1fr)',
        lg: 'repeat(5, 1fr)'
    }

    return (
        <PlatformFunctionalities
            cardsData={cardsData}
            templateColumns={templateColumns}
            hasGradiantOverlay={true}
        />
    )
}
