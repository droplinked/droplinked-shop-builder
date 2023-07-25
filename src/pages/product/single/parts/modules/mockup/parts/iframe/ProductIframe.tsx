import { Flex } from '@chakra-ui/react'
import AppModal from 'components/common/modal/AppModal'
import { productContext } from 'pages/product/single/context'
import introductionClass from 'pages/product/single/parts/general/model'
import React, { useCallback, useContext, useEffect, useRef } from 'react'

interface IProps {
    close: Function
    open: boolean
}
function ProductIframe({ close, open }: IProps) {
    const { state: { artwork, artwork2, artwork2_position, artwork_position, pod_blank_product_id, media }, methods: { updateState } } = useContext(productContext)
    const url = "https://designer.droplinked.io?"
    const iframeElement = useRef<any>(null)

    const eventMessage = useCallback((event: any) => {
        if (event.data.type === "imageUrls") {
            const payload = event.data.payload
            console.log(event.data.payload);
            
            updateState("media", introductionClass.refactorImage([...introductionClass.defactorImage(media), ...Object.keys(payload).map(el => payload[el])]));
            close()
        }
    }, [media])


    useEffect(() => {
        if (open) setTimeout(() => {
            iframeElement.current.contentWindow.postMessage({
                pod_blank_product_id,
                artwork: {
                    back: {
                        position: artwork_position,
                        image: artwork
                    },
                    front: {
                        position: artwork2_position,
                        image: artwork2
                    }
                }
            }, url);
        }, 3000);
    }, [open])

    useEffect(() => {
        window.addEventListener('message', eventMessage)
        return () => window.removeEventListener('message', eventMessage)
    }, [])

    return (
        <AppModal contentProps={{ width: "95%", maxWidth: "800px", padding: 0, height: "90%", maxHeight: "570px" }} close={close} open={open}>
            <iframe
                style={{ width: "100%", height: "100%", position: "relative", top: "40px" }}
                src={url}
                ref={iframeElement}
                title="Module"
            ></iframe>
        </AppModal>
    )
}

export default ProductIframe