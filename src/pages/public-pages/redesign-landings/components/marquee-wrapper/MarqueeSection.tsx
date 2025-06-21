import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper';
import React from 'react';
import { FlexProps } from '@chakra-ui/react';
import MaxWidthWrapper from '../MaxWidthWrapper';
import SectionContainer from '../SectionContainer/SectionContainer';
import MarqueeWrapper from './MarqueeWrapper';

interface image {
    icon: string;
    title: string;
}

interface MarqueeSectionProps {
    sectionTitle: string;
    images: image[];
    flexProps?: FlexProps;
    paddingBlock?: number;
}

export default function MarqueeSection({ sectionTitle, images, flexProps = { paddingBlock: 6 }, paddingBlock = 6 }: MarqueeSectionProps) {
    return (
        <MaxWidthWrapper paddingBlock={paddingBlock}>
            <SectionContainer
                sectionTitle={sectionTitle}
                flexProps={flexProps}
            >
                <MarqueeWrapper>
                    {images.map((image, index) => (
                        <IconWrapper
                            key={index}
                            background="neutral.background"
                            border="none"
                            p={2}
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
        </MaxWidthWrapper>
    )
}