import React from 'react';
import { partners } from '../../components/utils/partnersList';
import MarqueeSection from '../../components/marquee-wrapper/MarqueeSection';

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
