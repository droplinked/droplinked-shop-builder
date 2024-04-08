import AppModal, { IAppModal } from 'components/common/modal/AppModal'
import AppStripe from 'components/common/stripe/AppStripe'
import useAppToast from 'functions/hooks/toast/useToast'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import CouponsSettingContext from 'pages/register-pages/pages/coupons/context'
import React, { useContext, useState } from 'react'
import rechargeContext from './context'
import RechargePayment from './parts/payment/RechargePayment'

interface Iprops extends IAppModal { }
function RechargeModel({ close, open }: Iprops) {
  const [States, setStates] = useState({
    clientSecret: null
  })
  const { fetch } = useContext(CouponsSettingContext)
  const { updateShopData } = useProfile()
  const { showToast } = useAppToast();

  const updateState = (key: string, value: any) => setStates(prev => ({ ...prev, [key]: value }))

  const submit = async () => {
    await fetch()
    await updateShopData()
    close()
    showToast({ message: "Payment confirmed! Your credit has been added successfully", type: 'success' });
  }

  return (
    <AppModal close={close} open={open} size="xl" title='Recharge Your Credit'>
      <rechargeContext.Provider value={{ close, clientSecret: States.clientSecret, updateState }}>
        {States.clientSecret ? <AppStripe cancel={close} onSuccess={submit} clientSecret={States.clientSecret} /> : <RechargePayment />}
      </rechargeContext.Provider>
    </AppModal>
  )
}

export default RechargeModel