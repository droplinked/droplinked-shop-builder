import React, { useCallback, useContext, useEffect, useState } from 'react'
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
    product: IRecordModalProduct
}

function RecordModal({ close, open, product }: Iprops) {
    const { methods } = useContext(productContext)
    const [State, setState] = useState(recordStates)

    // Close Modal
    const closeModal = useCallback(async () => {
        const skues = await methods.fetch()
        methods.updateState("sku", skues.sku)
        setState(recordStates)
        close()
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
                {State.hashkey ? <HashKey text="Sku record successful" blockchain={State.blockchain} hashkey={State.hashkey} close={closeModal} /> : <RecordForm close={closeModal} product={product} />}
            </AppModal>
        </recordContext.Provider>
    )
}

export default RecordModal