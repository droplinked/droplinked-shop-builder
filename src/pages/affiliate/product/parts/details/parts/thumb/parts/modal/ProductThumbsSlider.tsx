import AppModal, { IAppModal } from 'components/common/modal/AppModal'
import React from 'react'

interface IProps extends IAppModal { }

function ProductThumbsSlider({ close, open }: IProps) {
    return (
        <AppModal close={close} open={open}>
            
        </AppModal>
    )
}

export default ProductThumbsSlider