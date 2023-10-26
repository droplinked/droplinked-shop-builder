import { Box, Flex, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import { ShopProductContext } from 'pages/affiliate/product/context'
import React, { useContext } from 'react'
import classes from './style.module.scss'
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function DetailsProductThumbs() {
    const { product, updateState } = useContext(ShopProductContext)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <SimpleGrid columns={5} spacing="18px">
                {product.media && product.media.length ? product.media.slice(0, 5).map((el: any, key: number) => (
                    <Box key={key} position="relative" className={classes.box} onMouseOver={() => updateState('slider', el.url)}>
                        {key === product.media.length - 1 && (
                            <Flex alignItems="center" onClick={onOpen} cursor="pointer" className={classes.text} justifyContent="center" textAlign="center" backgroundColor="rgba(0,0,0,.6)" position="absolute" top="0" left="0" right="0" bottom="0"><AppTypography size="12px" width="80%">See More
                                Images</AppTypography></Flex>
                        )}
                        <AppImage src={el.url} borderRadius="8px" cursor={"pointer"} width="100%" />
                    </Box>
                )) : null}
            </SimpleGrid>
            <Lightbox
                plugins={[Thumbnails]}
                thumbnails={{ position: "bottom", border: 0, imageFit: "contain", gap: 1 }}
                open={isOpen}
                close={onClose}
                slides={product.media && product.media.length ? product.media.map(el => ({ src: el.url })) : []}
            />
        </>
    )
}

export default DetailsProductThumbs