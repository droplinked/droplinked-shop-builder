import AppModal, { IAppModal } from 'components/common/modal/AppModal'
import { capitalizeWords } from 'utils/helpers'
import React, { useState } from 'react'
import CouponForm from '../../../../form/CouponForm'
import CouponsCreateContext, { CouponsCreateStates } from './context'
import CouponsCreateHome from './parts/home/CouponsCreateHome'

interface Iprops extends IAppModal { }

function CouponsCreate(props: Iprops) {
    const [State, setState] = useState(CouponsCreateStates)

    return (
        <CouponsCreateContext.Provider value={{
            type: State.type,
            closeModal: props.close,
            updateState: (key: string, value: string) => setState(prev => ({ ...prev, [key]: value }))
        }}>
            <AppModal {...props} size="xl" title={State.type ? `Create ${capitalizeWords(State.type)} Coupon` : "Create Coupon"}>
                {State.type ? <CouponForm /> : <CouponsCreateHome />}
            </AppModal>
        </CouponsCreateContext.Provider>
    )
}

export default CouponsCreate