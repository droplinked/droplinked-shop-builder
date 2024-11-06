import AppTable from 'components/common/table/AppTable'
import RequestProductModel from 'pages/affiliate/product/parts/requests/model'
import React, { useContext } from 'react'
import { ModalRequestContext } from '../../context'
import useAppStore from 'lib/stores/app/appStore'
import { currencyConvertion } from 'lib/utils/helpers/currencyConvertion'

function RequestSpecs() {
  const { sku } = useContext(ModalRequestContext)
  const { shop: { currency } } = useAppStore();
  return (
    <>
      <AppTable vertical rows={{
        ...RequestProductModel.makeOptions(sku?.options),
        requestQuantity: {
          caption: "Request Quantity",
          value: sku.recorded_quantity
        },
        ...sku.dimensions.length + sku.dimensions.height + sku.dimensions.width >= 1 && {
          PackageSize: {
            caption: "Package size",
            value: `${sku.dimensions.length} x ${sku.dimensions.height} x ${sku.dimensions.width}`
          }
        },
        ...sku.weight && {
          Weight: {
            caption: "Weight",
            value: sku.weight
          }
        },
        ExternalID: {
          caption: "External ID",
          value: sku.externalID
        },
        Price: {
          value: `${currency?.symbol}${currencyConvertion(sku.price, currency?.conversionRateToUSD, false)}  ${currency?.abbreviation}`
        },
      }} />
    </>
  )
}

export default RequestSpecs