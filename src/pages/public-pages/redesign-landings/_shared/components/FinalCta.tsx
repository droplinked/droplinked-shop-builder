import React from 'react'
import { FlexProps } from '@chakra-ui/react'
// @ts-ignore
import Video from '../../_shared/video/finalCTa.webm'
import SectionContainer from './SectionContainer/SectionContainer'
import InlineVideoPlayer from './InlineVideoPlayer'

interface Props extends FlexProps {
    sectionTitle?: string
    headingTitle?: string
    headingSubtitle?: string
    subTitleElement?: React.ReactNode
}

export default function FinalCta(props: Props) {
    return (
        <SectionContainer
            paddingTop={{ base: "80px", lg: "128px" }}
            paddingBottom={0}
            icon='bolt'
            sectionTitle={props.sectionTitle}
            headingTitle={props.headingTitle}
            headingSubtitle={props.headingSubtitle}
            subTitleElement={props.subTitleElement}
            {...props}
        >
            <InlineVideoPlayer src={Video} style={{ paddingTop: "16px" }} />
        </SectionContainer >
    )
}
