import HashKey, { IHashKeyModal } from 'components/common/hashKey/HashKey'
import AppModal, { IAppModal } from 'components/common/modal/AppModal'
import React from 'react'

type props = IHashKeyModal & IAppModal
interface Iprops extends props {
    open: boolean
    size?: string
}

function ModalHashkey({ close, open, hashkey, blockchain, text, contentProps, size, description }: Iprops) {
    return (
        <AppModal contentProps={contentProps} close={() => { }} open={open} size={size}>
            <HashKey blockchain={blockchain} close={close} description={description} hashkey={hashkey} text={text || "Accept successful"} />
        </AppModal>
    )
}

export default ModalHashkey