import React from 'react'
import InlineVideoPlayer from '../../_shared/components/InlineVideoPlayer'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
// @ts-ignore
import Video from '../../_shared/video/finalCTa.webm'
import ClaimNowButton from './ClaimNowButton'

export default function ClaimNow() {
    return (
        <SectionContainer
            paddingTop={{ base: "80px", lg: "128px" }}
            paddingBottom={0}
            icon='bolt'
            sectionTitle='CLAIM NOW'
            headingTitle='Free 3 Month Pro Plan'
            headingSubtitle={`Unlock 3 months of the Pro Plan absolutely free!\nRedeem the exclusive offer today.`}
            subTitleElement={
                <ClaimNowButton />
            }
        >
            <InlineVideoPlayer src={Video} style={{ paddingTop: "16px" }} />
        </SectionContainer >
    )
}
