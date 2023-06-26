import AppModal from 'components/common/modal/AppModal'
import { productContext } from 'pages/product/single/context'
import introductionClass from 'pages/product/single/parts/general/model'
import React, { useCallback, useContext, useEffect, useRef } from 'react'

interface IProps {
    close: Function
    open: boolean
}
function ProductIframe({ close, open }: IProps) {
    const { state: { artwork, artwork2, artwork2_position, artwork_position, pod_blank_product_id, media } } = useContext(productContext)
    const url = "https://designer.droplinked.io?"
    const iframeElement = useRef<any>(null)
    
    const eventMessage = useCallback((event: any) => {
        if (event.data.type === "imageUrls") {
            introductionClass.refactorImage([...introductionClass.defactorImage(media), ...event.data.payload])
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
        <AppModal contentProps={{ width: "100%", maxWidth: "95%", height: "90%" }} close={close} open={open}>
            <iframe
                style={{ width: "100%", height: "100%" }}
                src={url}
                ref={iframeElement}
                title="Module"
            ></iframe>
        </AppModal>
    )
}

export default ProductIframe