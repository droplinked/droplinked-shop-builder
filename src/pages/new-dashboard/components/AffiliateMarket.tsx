import React from 'react'
import { useNavigate } from 'react-router-dom'
import AffiliateEmptyState from './EmptyState/AffiliateEmptyState'
import SectionContainer from './SectionContainer'

function AffiliateMarket() {
    const navigate = useNavigate()

    return (
        <SectionContainer
            title='Affiliate'
            onLinkClick={() => navigate("/analytics/affiliate/market")}
        >
            <AffiliateEmptyState />
        </SectionContainer>
    )
}

export default AffiliateMarket