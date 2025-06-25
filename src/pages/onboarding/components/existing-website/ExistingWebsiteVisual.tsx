import { Image } from '@chakra-ui/react'
import React from 'react'
import RightSectionWrapper from '../common/RightSectionWrapper'

function ExistingWebsiteVisual() {
    return (
        <RightSectionWrapper
            display="grid"
            placeItems="center"
            padding={0}
        >
            <Image
                src="https://upload-file-droplinked.s3.amazonaws.com/e2e0ccbab03d6cb2cd23894232b5b726ee800230fd326085755b0008be720ae0.png"
            />
        </RightSectionWrapper>
    )
}

export default ExistingWebsiteVisual