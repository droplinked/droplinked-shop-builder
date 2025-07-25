import { GridProps } from "@chakra-ui/react"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import React from "react"
import { BLUE_SKY_LINK, SOCIAL_MEDIA_LINKS } from "data/socialMediaLinks"
import JoinCommunityCard from "./JoinCommunityCard"
import SocialMediaLink from "./SocialMediaLink"

/**
 * CommunityEngagement Component - Grid layout of social media links
 * 
 * Displays a grid of social media platforms to engage with the community,
 * featuring a join card and configurable number of columns. Handles odd/even
 * grid layouts elegantly.
 * 
 * @param {object} props - Component props
 * @param {number} props.columns - Number of grid columns to display 
 * @param {boolean} [props.includeBlueSky] - Whether to include BlueSky link
 * @param {GridProps} props - Additional Chakra UI grid props
 */
interface Props extends GridProps {
    columns: number
    includeBlueSky?: boolean
}

export default function CommunityEngagement({ columns, includeBlueSky, ...props }: Props) {
    const socialMediaLinks = includeBlueSky
        ? [...SOCIAL_MEDIA_LINKS, BLUE_SKY_LINK]
        : SOCIAL_MEDIA_LINKS

    const totalItems = socialMediaLinks.length + 1
    const isColumnsEven = columns % 2 === 0
    const isTotalItemsOdd = totalItems % 2 === 1

    const commonGridProps = {
        borderRadius: 16 as const,
        overflow: "hidden" as const,
        ...props,
    }

    if (isColumnsEven && isTotalItemsOdd) {
        return (
            <RuledGrid columns={1} {...commonGridProps}>
                <JoinCommunityCard />
                <RuledGrid columns={columns} nested {...commonGridProps}>
                    {socialMediaLinks.map((socialMediaLink) => (
                        <SocialMediaLink key={socialMediaLink.labelKey} linkData={socialMediaLink} />
                    ))}
                </RuledGrid>
            </RuledGrid>
        )
    }

    return (
        <RuledGrid columns={columns} {...commonGridProps}>
            <JoinCommunityCard />
            {socialMediaLinks.map((socialMediaLink) => (
                <SocialMediaLink key={socialMediaLink.labelKey} linkData={socialMediaLink} />
            ))}
        </RuledGrid>
    )
}