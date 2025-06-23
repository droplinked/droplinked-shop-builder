import React from 'react';
import MarqueeSection from '../../_shared/components/marquee-wrapper/MarqueeSection';
import { partners } from '../../_shared/utils/partnersList';

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
