import { Box, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import AppScrollBar from 'components/common/scrollbar'
import AppUploadImage from 'components/common/upload/image/AppUploadImage'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import ActiveBox from '../../../active/ActiveBox'
import OptionsCaption from '../../../caption/OptionsCaption'
import OptionBannerModel from './model'

function OptionBanner() {
    const { methods: { dispatch }, state: { shop: { backgroundImage } } } = useContext(designContext)
    const { defaults } = OptionBannerModel
    const [States, setStates] = useState({ defaults })

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

    useEffect(() => {
        if (backgroundImage && !States.defaults.find(el => el.banner_src === backgroundImage)) upload(backgroundImage)
    }, [backgroundImage, States])


    return (
        <VStack align="stretch">
            <OptionsCaption caption='Hero Image' />
            <AppScrollBar maxHeight="320px" overflow="auto" overflowX="hidden">
                <SimpleGrid columns={{ base: 2, "xl": 3 }} spacing="12px" alignItems="center">
                    {States.defaults.map((el, key) => (
                        <ActiveBox
                            key={key}
                            active={el.banner_src === backgroundImage}
                            props={{
                                onClick: () => setImage(el.banner_src),
                                width: { base: "55px", '2xl': "68px" },
                                height: { base: "55px", '2xl': "68px" },
                                overflow: "hidden",
                                position: "relative",
                                borderRadius: "8px"
                            }}
                        >
                            <Box border={el.banner_src !== backgroundImage ? "1px solid #262626" : ""} position="absolute" top="0" right="0" left="0" bottom="0">
                                <Image
                                    src={el.thumb}
                                    borderRadius="8px"
                                    width="100%"
                                    position="absolute"
                                    left="50%"
                                    top="50%"
                                    transform="translate(-50%, -50%)"
                                />
                            </Box>
                        </ActiveBox>
                    ))}
                </SimpleGrid>
            </AppScrollBar>
            <AppUploadImage onChange={(image) => {
                upload(image)
                setImage(image)
            }} size="original" values={''} mode="horizontal" />
        </VStack>
    )
}

export default OptionBanner