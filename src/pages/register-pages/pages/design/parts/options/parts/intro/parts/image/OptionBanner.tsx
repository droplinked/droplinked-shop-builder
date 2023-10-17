import { Image, SimpleGrid, VStack } from '@chakra-ui/react'
import AppScrollBar from 'components/common/scrollbar'
import AppUploadImage from 'components/common/upload/image/AppUploadImage'
import React, { useCallback, useEffect, useState } from 'react'
import ActiveBox from '../../../active/ActiveBox'
import OptionsCaption from '../../../caption/OptionsCaption'
import OptionBannerModel from './model'

function OptionBanner() {
    const [States, setStates] = useState({
        image: 'https://upload-file-flatlay.s3.us-west-2.amazonaws.com/91b9390f2d29012f8920c49444f30fd815c8ae033cc2894707cc011042fcd41c.png_or.png',
        defaults: OptionBannerModel.defaults
    })

    const upload = useCallback((image: string) => {
        setStates(prev => ({
            ...prev,
            defaults: [{ banner_src: image, color: "#000", thumb: image }, ...prev.defaults]
        }))
    }, [])

    return (
        <VStack align="stretch">
            <OptionsCaption caption='Hero Image' />
            <AppScrollBar maxHeight="320px" overflow="auto" padding="0 10px">
                <SimpleGrid columns={2} spacing="12px">
                    {States.defaults.map((el, key) => (
                        <ActiveBox key={key} active={el.banner_src === States.image} props={{ onClick: () => setStates(prev => ({ ...prev, image: el.banner_src })) }}>
                            <Image src={el.thumb} borderRadius="8px" width="100%" />
                        </ActiveBox>
                    ))}
                </SimpleGrid>
            </AppScrollBar>
            <AppUploadImage onChange={(image) => upload(image)} size="original" values={''} mode="horizontal" />
        </VStack>
    )
}

export default OptionBanner