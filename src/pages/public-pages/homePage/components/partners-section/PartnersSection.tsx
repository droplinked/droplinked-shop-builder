import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper';
import React from 'react';
import { partners } from '../../utils/partnersList';
import MaxWidthWrapper from '../common/MaxWidthWrapper';
import SectionContainer from '../common/SectionContainer/SectionContainer';
import MarqueeWrapper from './MarqueeWrapper';

export default function PartnersSection() {
    return (
        <MaxWidthWrapper paddingBlock={6}>
            <SectionContainer
                sectionTitle='ECOSYSTEM PARTNERS'
                flexProps={{ paddingBlock: 6 }}
            >
                <MarqueeWrapper>
                    {partners.map((partner) => (
                        <IconWrapper
                            background="neutral.background"
                            border="none"
                            p={2}
                            icon={
                                <img
                                    width="20px"
                                    height="20px"
                                    src={partner.icon}
                                    alt={partner.title}
                                />
                            }
                        />
                    ))}
                </MarqueeWrapper>
            </SectionContainer>
        </MaxWidthWrapper>
    )
}
