import HashKey from 'components/common/hashKey/HashKey'
import AppModal from 'components/common/modal/AppModal'
import { Isku } from 'lib/apis/product/interfaces'
import React, { useState } from 'react'
import recordContext, { recordStates } from './context'
import RecordForm from './parts/form/RecordForm'

export interface IRecordModalProduct {
    title: string
    description: string
    shippingType: string
    media: Array<string>
    sku: Isku
}

interface Props {
    open: boolean
    close: () => void
    product: any
    sku: Isku
}

function RecordModal({ close, open, product, sku }: Props) {
    const [State, setState] = useState(recordStates)

    // Close Modal
    const closeModal = () => {
        close()
        setState(recordStates)
    }

    const isRecordAllSKUs = Array.isArray(sku) && sku.length > 1;

    return (
        <recordContext.Provider
            value={{
                state: State,
                product,
                updateState: (key: string, value: string) => setState(prev => ({ ...prev, [key]: value }))
            }}
        >
            <AppModal
                open={open}
                close={() => !State.loading && !State.hashkey ? closeModal() : {}}
                size="2xl"
                contentProps={{ padding: "30px" }}
                isCentered={false}
            >
                {State.hashkey ?
                    <HashKey
                        text="Sku record successful"
                        blockchain={State.blockchain}
                        hashkey={State.hashkey}
                        close={closeModal}
                    />
                    :
                    <RecordForm close={closeModal}
                        product={product}
                        sku={sku}
                        isRecordAllSKUs={isRecordAllSKUs}
                    />
                }
            </AppModal>
        </recordContext.Provider>
    )
}

export default RecordModal