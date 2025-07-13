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
                src="https://upload-file-droplinked.s3.amazonaws.com/29eb1513a6d63d6d8e25c38ada93e91d0e8afcb740117909f966f0edcdc6eeeb_or.webm"
                style={{ paddingTop: "16px" }}
            />
        </SectionContainer >
    )
}
