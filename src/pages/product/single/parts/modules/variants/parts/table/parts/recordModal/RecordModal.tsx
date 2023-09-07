import React, { useCallback, useContext, useState } from 'react'
import AppModal from 'components/common/modal/AppModal'
import { Isku } from 'lib/apis/product/interfaces'
import RecordForm from './parts/form/RecordForm'
import recordContext, { recordStates } from './context'
import { productContext } from 'pages/product/single/context'
import HashKey from 'components/common/hashKey/HashKey'

export interface IRecordModalProduct {
    title: string
    description: string
    shippingType: string
    media: Array<string>
    sku: Isku
}

interface Iprops {
    open: boolean
    close: Function
    product: any
    sku: Isku
}

function RecordModal({ close, open, product, sku }: Iprops) {
    const [State, setState] = useState(recordStates)

    // Close Modal
    const closeModal = useCallback(async () => {
        close()
        setState(recordStates)
    }, [])

    return (
        <recordContext.Provider value={{
            state: State,
            updateState: (key: string, value: string) => setState(prev => ({ ...prev, [key]: value })),
        }}>
            <AppModal
                open={open}
                close={() => !State.loading && !State.hashkey ? closeModal() : {}}
                size={"2xl"}
                contentProps={{
                    padding: "30px"
                }}
            >
                {State.hashkey ? <HashKey text="Sku record successful" blockchain={State.blockchain} hashkey={State.hashkey} close={closeModal} /> : <RecordForm close={closeModal} product={product} sku={sku} />}
            </AppModal>
        </recordContext.Provider>
    )
}

export default RecordModal