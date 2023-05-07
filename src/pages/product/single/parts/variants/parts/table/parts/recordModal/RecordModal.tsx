import React, { useCallback, useEffect, useState } from 'react'
import AppModal from 'components/shared/modal/AppModal'
import { Isku } from 'lib/apis/product/interfaces'
import RecordForm from './parts/form/RecordForm'
import recordContext, { recordStates } from './context'
import RecordSuccess from './parts/success/recordSuccess'

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
    const [State, setState] = useState(recordStates)

    // Close Modal
    const closeModal = useCallback(()=>{
        setState(recordStates)
        close()
    },[])

    return (
        <recordContext.Provider value={{
            state: State,
            updateState: (key: string, value: string) => setState(prev => ({ ...prev, [key]: value }))
        }}>
            <AppModal
                open={open}
                close={() => !State.loading ? closeModal() : {}}
                size={"2xl"}
                contentProps={{
                    padding: "30px"
                }}
            >
                {State.hashkey ? <RecordSuccess close={closeModal} /> : <RecordForm close={closeModal} open={open} product={product} />}
            </AppModal>
        </recordContext.Provider>
    )
}

export default RecordModal