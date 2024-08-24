import AppDialog from 'components/common/dialog'
import useAppToast from 'functions/hooks/toast/useToast'
import { IproductDeleteServices } from 'lib/apis/product/interfaces'
import { productDeleteServices } from 'lib/apis/product/productServices'
import React, { useState } from 'react'
import { useMutation } from 'react-query'

interface Iprops {
  productIDs: Array<string>;
  fetch: () => void;
  open: boolean;
  close: () => void;
}

function ConfirmDeleteAll({ productIDs, fetch, open, close }: Iprops) {
  const { mutateAsync } = useMutation((params: IproductDeleteServices) => productDeleteServices(params))
  const [Loading, setLoading] = useState(false)
  const { showToast } = useAppToast()

  return (
    <AppDialog
      open={open}
      close={close}
      title="Delete Products"
      text='Are you sure you want to delete these products? You will permanently lose access to them.'
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
          buttonProps: { isLoading: Loading, isDisabled: Loading },
          onClick: async () => {
            try {
              setLoading(true)
              const promises = productIDs.map(id => mutateAsync({ productID: id }))
              await Promise.allSettled(promises)
              showToast({ message: "Products has been deleted!", type: "success" })
              fetch()
              close()
            } catch (error) {
              showToast({ message: "Oops! Something went wrong", type: "error" })
            }
            finally {
              setLoading(false)
            }
          }
        }
      ]}
    />
  )
}

export default ConfirmDeleteAll