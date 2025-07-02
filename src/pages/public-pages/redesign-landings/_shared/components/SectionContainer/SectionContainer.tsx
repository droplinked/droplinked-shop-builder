import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'
import HeadingSubtitle from './HeadingSubtitle'
import HeadingTitle from './HeadingTitle'
import IconMapper, { Icon } from './IconMapper'
import SectionTitle from './SectionTitle'
import TypographyText from './TypographyText'

/**
 * Layout container for landing page sections with optional header elements.
 * Combines related components: IconMapper, SectionTitle, HeadingTitle, HeadingSubtitle, and TypographyText
 * to create a consistent section structure across redesign landing pages.
 */
interface Props extends FlexProps {
    icon?: Icon
    sectionTitle?: string
    headingTitle?: string
    headingSubtitle?: string
    subTitleElement?: React.ReactNode
    typographySvg?: React.ReactNode
}

/**
 * Renders a structured section with optional icon, titles, and typography elements.
 * Used as the main layout component for landing page sections.
 */
export default function SectionContainer({ icon, sectionTitle, headingTitle, headingSubtitle, subTitleElement, typographySvg, children, ...rest }: Props) {
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
            <HeadingSubtitle subTitle={headingSubtitle} hasTypographySvg={!!typographySvg} />
            {subTitleElement}
            <TypographyText svg={typographySvg} />
            {children}
        </Flex>
    )
}
