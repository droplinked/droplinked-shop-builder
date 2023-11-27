import AppModal, { IAppModal } from 'components/common/modal/AppModal'
import React, { useState } from 'react'
import rechargeContext from './context'
import RechargePayment from './parts/payment/RechargePayment'
import RechargeStripe from './parts/stripe/RechargeStripe'

interface Iprops extends IAppModal { }
function RechargeModel({ close, open }: Iprops) {
  const [States, setStates] = useState({
    clientSecret: null
  })

  const updateState = (key: string, value: any) => setStates(prev => ({ ...prev, [key]: value }))

  return (
    <AppModal close={close} open={open} size="xl" title='Recharge Your Credit'>
      <rechargeContext.Provider value={{ close, clientSecret: States.clientSecret, updateState }}>
        {States.clientSecret ? <RechargeStripe /> : <RechargePayment />}
      </rechargeContext.Provider>
    </AppModal>
  )
}

export default RechargeModel