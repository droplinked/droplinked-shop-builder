import AppDialog from 'components/common/dialog'
import AppModal, { IAppModal } from 'components/common/modal/AppModal'
import useAppToast from 'functions/hooks/toast/useToast'
import { IproductDeleteServices } from 'lib/apis/product/interfaces'
import { productDeleteServices } from 'lib/apis/product/productServices'
import React, { useState } from 'react'
import { useMutation } from 'react-query'

interface Iprops extends IAppModal {
  productIDs: Array<string>
  fetch: Function
}

function ConfirmDeleteAll({ productIDs, fetch, close, open }: Iprops) {
  const { mutateAsync } = useMutation((params: IproductDeleteServices) => productDeleteServices(params))
  const [Loading, setLoading] = useState(false)
  const { showToast } = useAppToast()

  return (
    <AppDialog
      open={open}
      close={() => { }}
      title="Delete Products"
      text='Are you sure you want to delete products? You will no longer have access products.'
      buttons={[
        {
          children: "Cancel",
          onClick: () => close(),
          buttonProps: {
            variant: "outline"
          }
        },
        {
          children: "Delete",
          buttonProps: { isLoading: Loading },
          onClick: async () => {
            try {
              setLoading(true)
              const promises = productIDs.map(id => mutateAsync({ productID: id }))
              await Promise.allSettled(promises)
              showToast("Products has been deleted!", "success")
              await fetch()
              close()
              setLoading(false)
            } catch (error) {
              showToast("Oops! Something went wrong", "error")
              setLoading(false)
            }
          }
        }
      ]}
    />
  )
}

export default ConfirmDeleteAll