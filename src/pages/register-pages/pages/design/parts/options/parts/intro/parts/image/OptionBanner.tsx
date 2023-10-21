import { Image, SimpleGrid, VStack } from '@chakra-ui/react'
import AppScrollBar from 'components/common/scrollbar'
import AppUploadImage from 'components/common/upload/image/AppUploadImage'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import ActiveBox from '../../../active/ActiveBox'
import OptionsCaption from '../../../caption/OptionsCaption'
import OptionBannerModel from './model'

function OptionBanner() {
    const { methods: { dispatch }, state: { shop: { backgroundImage } } } = useContext(designContext)

    const [States, setStates] = useState({
        defaults: OptionBannerModel.defaults
    })

    const upload = useCallback((image: string) => {
        setStates(prev => ({
            ...prev,
            defaults: [{ banner_src: image, color: "#000", thumb: image }, ...prev.defaults]
        }))
    }, [])

    const setImage = useCallback((image: string) => {
        dispatch({
            type: 'updateShop', params: {
                backgroundImage: image,
                backgroundImageSecondary: image,
            }
        })
    }, [])

    return (
        <VStack align="stretch">
            <OptionsCaption caption='Hero Image' />
            <AppScrollBar maxHeight="320px" overflow="auto" padding="0 10px">
                <SimpleGrid columns={2} spacing="12px" alignItems="center">
                    {States.defaults.map((el, key) => (
                        <ActiveBox key={key} active={el.banner_src === backgroundImage} props={{ onClick: () => setImage(el.banner_src) }}>
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