import HashKey from 'components/common/hashKey/HashKey'
import AppModal from 'components/common/modal/AppModal'
import React from 'react'

interface Iprops {
    close: Function
    open: boolean
    hashKey: string
    blockchain: string
}

function ModalHashkey({ close, open, hashKey, blockchain }: Iprops) {
    return (
        <AppModal close={() => { }} open={open}>
            <HashKey blockchain={blockchain} close={close} hashkey={hashKey} text="Accept successful" />
        </AppModal>
    )
}

export default ModalHashkey