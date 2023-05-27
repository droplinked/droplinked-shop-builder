import HashKey from 'components/common/hashKey/HashKey'
import AppModal from 'components/common/modal/AppModal'
import React from 'react'

interface Iprops {
    close: Function
    open: boolean
    hashKey: string
}

function ModalHashkey({ close, open, hashKey }: Iprops) {
    return (
        <AppModal close={() => { }} open={open}>
            <HashKey close={close} hashkey={hashKey} text="Accept successful" />
        </AppModal>
    )
}

export default ModalHashkey