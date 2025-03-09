import { Flex } from '@chakra-ui/react'
import useOnboardingStore from 'pages/onboarding/store/useOnboardingStore'
import React, { useEffect } from 'react'
import GeneratedContentWrapper from './GeneratedContentWrapper'
import { ImageSlider } from './ImageSlider'

interface Props {
    covers: string[]
}

export default function GeneratedCover({ covers }: Props) {
    const { updateOnboardingState, storeData } = useOnboardingStore();

    const handleChange = (url: string) => {
        updateOnboardingState("storeData", { ...storeData, coverImage: url })
    }

    useEffect(() => {
        handleChange(covers[0])
    }, [])

    return (
        <GeneratedContentWrapper title='Cover Image'>
            <Flex alignItems="center" gap={4}>
                <ImageSlider images={covers} onChange={handleChange} />
            </Flex>
        </GeneratedContentWrapper>
    )
}
