import React from 'react'
import SectionContainer from '../../components/SectionContainer/SectionContainer'
import MaxWidthWrapper from '../../components/MaxWidthWrapper'
import { Cards } from 'pages/public-pages/redesign-landings/components/card'

export default function SetOfPerks() {
    // Example cards data for Crossmint perks
    const cardsData = [
        {
            icon: <div>🎁</div>, // You can replace with actual icons
            title: "3 Months Free Pro Plan",
            description: "Get full access to droplinked's professional features for 3 months at no cost"
        },
        // Add more cards as needed
    ];

    return (
        <MaxWidthWrapper my="80px">
            <SectionContainer
                icon='story'
                sectionTitle='SET OF PERKS'
                headingTitle='Perks for Crossmint Members'
                headingSubtitle='droplinked is offering 3 months of a pro plan for free'
                typographyText='Perks'
            />
            <Cards cardsData={cardsData} />
        </MaxWidthWrapper>
    )
}
