import AppModal, { IAppModal } from 'components/common/modal/AppModal'
import AppStripe from 'components/common/stripe/AppStripe'
import useAppToast from 'hooks/toast/useToast'
import useAppStore from 'lib/stores/app/appStore'
import CouponsSettingContext from 'pages/register-pages/pages/coupons/context'
import React, { useContext, useState } from 'react'
import rechargeContext from './context'
import RechargePayment from './parts/payment/RechargePayment'

interface Iprops extends IAppModal { }

function RechargeModel({ close, open }: Iprops) {
  const [pageData, setPageData] = useState({ clientSecret: null, amount: 0 });
  const { fetch } = useContext(CouponsSettingContext);
  const { showToast } = useAppToast();
  const { shop, updateState: updateShopData } = useAppStore();

  const updateState = (key: string, value: any) => setPageData(prev => ({ ...prev, [key]: value }))

  const submit = async () => {
    await fetch()
    updateShopData({ key: 'shop', params: { ...shop, credit: shop.credit + +pageData.amount } })
    close()
    showToast({ message: "Payment confirmed! Your credit has been updated successfully", type: 'success' });
  }

  return (
    <AppModal close={close} open={open} size="xl" title='Add Credit'>
      <rechargeContext.Provider value={{ close, clientSecret: pageData.clientSecret, updateState }}>
        {pageData.clientSecret ?
          <AppStripe cancel={close} onSuccess={submit} clientSecret={pageData.clientSecret} /> :
          <RechargePayment />
        }
      </rechargeContext.Provider>
    </AppModal>
  )
}

export default RechargeModel