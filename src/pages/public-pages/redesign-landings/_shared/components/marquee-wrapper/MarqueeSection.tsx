import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper';
import React from 'react';
import { partners } from '../../utils/partnersList';
import SectionContainer from '../SectionContainer/SectionContainer';
import MarqueeWrapper from './MarqueeWrapper';

export default function MarqueeSection() {
    return (
        <SectionContainer sectionTitle="ECOSYSTEM PARTNERS" paddingBlock={6}>
            <MarqueeWrapper>
                {partners.map((image, index) => (
                    <IconWrapper
                        key={index}
                        border="none"
                        background="neutral.background"
                        icon={
                            <img
                                width="20px"
                                height="20px"
                                src={image.icon}
                                alt={image.title}
                            />
                        }
                    />
                ))}
            </MarqueeWrapper>
        </SectionContainer>
    )
}