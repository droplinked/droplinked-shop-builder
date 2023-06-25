import AppModal from 'components/common/modal/AppModal'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect, useRef } from 'react'

interface IProps {
    close: Function
    open: boolean
}
function ProductIframe({ close, open }: IProps) {
    const { state: { artwork, artwork2, artwork2_position, artwork_position, pod_blank_product_id } } = useContext(productContext)
    const url = "https://designer.droplinked.io?"
    const element = useRef<any>(null)

    useEffect(() => {
        if (open) setTimeout(() => {
            element.current.contentWindow.postMessage({
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
        window.addEventListener('message', (event) => {
            if (event.origin === url) {
                console.log('event in parrent ', event);
                console.log('Message received from iframe:', event.data);
            }

        });
    }, [])



    return (
        <AppModal contentProps={{ width: "100%", maxWidth: "95%", height: "90%" }} close={close} open={open}>
            <iframe
                style={{ width: "100%", height: "100%" }}
                src={url}
                ref={element}
                title="Module"
            ></iframe>
        </AppModal>
    )
}

export default ProductIframe