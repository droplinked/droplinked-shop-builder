import React from 'react';
import MarqueeSection from '../../components/marquee-wrapper/MarqueeSection';
import { partners } from '../../homePage/utils/partnersList';

export default function PartnersSection() {
    return (
        <MarqueeSection
            sectionTitle="ECOSYSTEM PARTNERS"
            images={partners}
            flexProps={{ paddingBlock: 6 }}
            paddingBlock={6}
        />
    )
}
