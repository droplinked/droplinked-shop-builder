import HashKey from 'components/common/hashKey/HashKey'
import AppModal, { IAppModal } from 'components/common/modal/AppModal'
import { Isku } from 'lib/apis/product/interfaces'
import React, { useCallback, useEffect, useState } from 'react'
import ModalRequestForm from './parts/form/ModalRequestForm'

interface IProps extends IAppModal {
    product: any
    shop: any
    sku: Isku
}

function ModalRequest({ close, open, product, sku, shop }: IProps) {
    const [HashKeyState, setHashkey] = useState(null)

    const setHahskey = useCallback((value: string) => setHashkey(value), [])

    useEffect(() => {
        return () => {
            setHashkey(null)
        }
    }, [open])

    return (
        <AppModal close={() => { }} open={open} contentProps={{ padding: "60px" }} size="3xl">
            {HashKeyState ? (
                <HashKey blockchain={sku?.recordData?.recordNetwork} text='Request sended' close={close} hashkey={HashKeyState} />
            ) : (
                <ModalRequestForm product={product} shop={shop} sku={sku} close={close} setHahskey={setHahskey} />
            )}
        </AppModal>
    )
}

export default ModalRequest