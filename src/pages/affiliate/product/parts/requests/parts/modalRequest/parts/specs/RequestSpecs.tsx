import AppTable from 'components/shared/table/AppTable'
import React, { useContext } from 'react'
import RequestProductModel from '../../../../model'
import { ModalRequestContext } from '../../context'

function RequestSpecs() {
  const { sku } = useContext(ModalRequestContext)
  return (
    <>
      <AppTable vertical rows={{
        ...RequestProductModel.makeOptions(sku.options),
        requestQuantity: {
          caption: "Request Quantity",
          value: sku.quantity
        },
        PackageSize: {
          caption: "Package size",
          value: `${sku.dimensions.length} x ${sku.dimensions.height} x ${sku.dimensions.width}`
        },
        Weight: {
          caption: "Weight",
          value: sku.weight
        },
        ExternalID: {
          caption: "External ID",
          value: sku.externalID
        },
        Price: {
          value: sku.price
        },
      }} />
    </>
  )
}

export default RequestSpecs