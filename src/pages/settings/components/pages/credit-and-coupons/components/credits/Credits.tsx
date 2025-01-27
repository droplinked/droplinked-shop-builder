import SectionContainer from 'pages/settings/components/common/SectionContainer'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import Balance from './Balance'

export default function Credits() {
    return (
        <SectionContainer title='Credits'>
            <SectionContent
                title='Remaining Balance'
                description='Use credits to create discounts and coupons.'
                rightContent={<Balance />}
            />
        </SectionContainer>
    )
}
