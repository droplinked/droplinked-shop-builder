import AppModal from 'components/common/modal/AppModal'
import React from 'react'

interface IProps {
    close: Function
    open: boolean
}
function ProductIframe({ close, open }: IProps) {
    return (
        <AppModal close={close} open={open}>
            <iframe
                style={{ width: "100%", height: "100%" }}
                src="https://tshirt-3d-modeling.netlify.app"
                title="Module"
            ></iframe>
        </AppModal>
    )
}

export default ProductIframe