import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';
import HeadingSubtitle from './HeadingSubtitle';
import HeadingTitle from './HeadingTitle';
import IconMapper, { Icon } from './IconMapper';
import SectionTitle from './SectionTitle';
import TypographyText from './TypographyText';

interface Props {
    children?: React.ReactNode;
    sectionTitle?: string;
    headingTitle?: string;
    headingSubtitle?: string;
    subTitleElement?: React.ReactNode;
    icon?: Icon;
    typographyText?: string;
    flexProps?: FlexProps;
}

export default function SectionContainer({ children, sectionTitle, headingTitle, headingSubtitle, subTitleElement, icon, typographyText, flexProps }: Props) {
    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            {...flexProps}
        >
            <IconMapper icon={icon as Icon} />
            <SectionTitle sectionTitle={sectionTitle} icon={icon} />
            <HeadingTitle title={headingTitle} />
            <HeadingSubtitle subTitle={headingSubtitle} />
            {subTitleElement && (
                subTitleElement
            )}
            <TypographyText text={typographyText} />

            {children}
        </Flex>
    )
}
