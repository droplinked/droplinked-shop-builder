import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'
import HeadingSubtitle from './HeadingSubtitle'
import HeadingTitle from './HeadingTitle'
import IconMapper, { Icon } from './IconMapper'
import SectionTitle from './SectionTitle'
import TypographyText from './TypographyText'

interface Props extends FlexProps {
    icon?: Icon
    sectionTitle?: string
    headingTitle?: string
    headingSubtitle?: string
    subTitleElement?: React.ReactNode
    typographyText?: string
}

export default function SectionContainer({ icon, sectionTitle, headingTitle, headingSubtitle, subTitleElement, typographyText, children, ...rest }: Props) {
    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            paddingBlock={{ base: "80px", lg: "128px" }}
            {...rest}
        >
            <IconMapper icon={icon as Icon} />
            <SectionTitle sectionTitle={sectionTitle} icon={icon} />
            <HeadingTitle title={headingTitle} />
            <HeadingSubtitle subTitle={headingSubtitle} hasTypographyText={!!typographyText} />
            {subTitleElement}
            <TypographyText text={typographyText} />
            {children}
        </Flex>
    )
}
