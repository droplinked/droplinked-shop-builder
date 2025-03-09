import { GridProps } from "@chakra-ui/react"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import React from "react"
import { BLUE_SKY_LINK, SOCIAL_MEDIA_LINKS } from "utils/constants/socialMediaLinks"
import JoinCommunityCard from "./JoinCommunityCard"
import SocialMediaLink from "./SocialMediaLink"

interface Props extends GridProps {
    columns: number
    includeBlueSky?: boolean
}

export default function CommunityEngagement({ columns, includeBlueSky, ...props }: Props) {
    const socialMediaLinks = includeBlueSky
        ? [...SOCIAL_MEDIA_LINKS, BLUE_SKY_LINK]
        : SOCIAL_MEDIA_LINKS

    return (
        <RuledGrid
            columns={columns}
            borderRadius={16}
            overflow="hidden"
            {...props}
        >
            <JoinCommunityCard />

            {socialMediaLinks.map((socialMediaLink) =>
                <SocialMediaLink key={socialMediaLink.label} linkData={socialMediaLink} />
            )}
        </RuledGrid>
    )
}