import React from 'react'
import { FlexProps } from '@chakra-ui/react'
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
            <InlineVideoPlayer
                src="https://upload-file-droplinked.s3.amazonaws.com/a9b6c9cc9a5afe32c9fb3b663c1ed25f2d54fda6985a202c28da01cfb2e8dc26_or.webm"
                style={{ paddingTop: "16px" }}
            />
        </SectionContainer >
    )
}
