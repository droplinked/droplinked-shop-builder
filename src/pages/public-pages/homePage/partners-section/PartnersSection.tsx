import { Link } from '@chakra-ui/react';
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper';
import React from 'react';
import MaxWidthWrapper from '../components/common/MaxWidthWrapper';
import SectionContainer from '../components/common/SectionContainer/SectionContainer';
import { partners } from '../utils/partnersList';
import MarqueeWrapper from './MarqueeWrapper';

export default function PartnersSection() {
    return (
        <MaxWidthWrapper boxProps={{ paddingBlock: 6 }}>
            <SectionContainer
                sectionTitle='ECOSYSTEM PARTNERS'
                flexProps={{ paddingBlock: 6 }}
            >
                <MarqueeWrapper>
                    {partners.map((partner) => (
                        <Link
                            href={partner.url}
                            key={partner.title}
                            aria-label={partner.title}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
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
                        </Link>
                    ))}
                </MarqueeWrapper>
            </SectionContainer>
        </MaxWidthWrapper>
    )
}
