import React from 'react'
import { CardData } from '../../_shared/components/card/Cards'
import PlatformFunctionalities from '../../_shared/components/PlatformFunctionalities'
import { ShieldLg } from 'assets/icons/System/Shield/ShieldLg'
import { LockLg } from 'assets/icons/System/Lock/LockLg'
import { TransferLg } from 'assets/icons/Navigation/Transfer/TransferLg'
import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { ShowLg } from 'assets/icons/Action/Show/ShowLg'
import { GlobeLg } from 'assets/icons/Sign/Globe/GlobeLg'

export default function ModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <ShieldLg color='#fff' />,
            title: 'Secure Custody and Ownership',
            description: 'Work with trusted custodians to securely store assets with the tokenized product records for onchain ownership and availability',
            children: (
                <img
                    src='https://upload-file-droplinked.s3.amazonaws.com/1077f14571f36107036e16b51724eac48037ac8871e6a8e0ba3b8868f65b0904.png'
                    alt='Protected Comissions'
                    width="100%"
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 3' }
        },
        {
            icon: <LockLg color='#fff' />,
            title: 'Transparent and Immutable Records',
            description: 'Tokenization ensures all relevant product information, transaction history and ownership are stored immutably for accurate attribution',
            children: (
                <img
                    src='https://upload-file-droplinked.s3.amazonaws.com/cd97154ec5dcaa0c2789937406d2a0d99d3005eb100ce6407c2069edc18c9e05.png'
                    alt='Protected Comissions'
                    width="100%"
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            icon: <TransferLg color='#fff' />,
            title: 'Simple and Secure Transfers',
            description: 'Send and trade tokenized physical and digital items across platforms with onchain transparency to ensure trust between parties',
            children: (
                <img
                    src='https://upload-file-droplinked.s3.amazonaws.com/27f0c0324503901a7b96f4bb4f5093f1fba4843ec064abca96a158979c71641c.png'
                    alt='Protected Comissions'
                    width="100%"
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            icon: <BoxLg color='#fff' />,
            title: 'Digital Representation of Inventory',
            description: 'Tokenization allows you to create records representing inventory to enhancing traceability and secure ownership onchain',
            children: (
                <img
                    src='https://upload-file-droplinked.s3.amazonaws.com/fe53d50b4dd1712f368bc6efe0470b0323dd5fd9b8c38c2056b5b60396b9b3ac.png'
                    alt='Protected Comissions'
                    width="100%"
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 3' }
        },
        {
            icon: <ShowLg color='#fff' />,
            title: 'Enhanced Transparency',
            description: 'All details involved with the inventory from transaction history to product metadata are stored onchain to display to 3rd parties',
            children: (
                <img
                    src='https://upload-file-droplinked.s3.amazonaws.com/42982b54b6bee18043ea589862b5ab2e43aaea4695c5548c5b2206bdeb5a0037.png'
                    alt='Protected Comissions'
                    width="100%"
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 3' }
        },
        {
            icon: <GlobeLg color='#fff' />,
            title: 'Global Market Access',
            description: 'Tokenized assets can be traded globally to further unlock new market opportunities by adding liquidity for existing inventory',
            children: (
                <img
                    src='https://upload-file-droplinked.s3.amazonaws.com/42802b5ae65684e2e7512afb7f8e1b67414c257e2fdbbe78ed9b0c39b1a479cc.png'
                    alt='Protected Comissions'
                    width="100%"
                />
            ),
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
