import { Flex } from '@chakra-ui/react'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React, { useEffect } from 'react'
import GeneratedContentWrapper from './GeneratedContentWrapper'
import { ImageSlider } from './ImageSlider'

interface Props {
    covers: string[]
}

export default function GeneratedCover({ covers }: Props) {
    const { updateOnboardingState, storeSetup } = useOnboardingStore()

    const handleChange = (url: string) => {
        updateOnboardingState("storeSetup", { ...storeSetup, hero_section: url })
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
