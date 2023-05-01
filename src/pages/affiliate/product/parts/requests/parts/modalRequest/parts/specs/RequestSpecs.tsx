import AppTable from 'components/shared/table/AppTable'
import React from 'react'

function RequestSpecs() {
  return (
    <>
      <AppTable vertical rows={{
        requestQuantity: {
          caption: "Request Quantity",
          value: 100
        },
        Size: {
          value: "medium"
        },
        color: {
          value: "red"
        },
        PackageSize: {
          caption: "Package size",
          value: "23 x 24 x 232 cm3"
        },
        Weight: {
          caption: "Weight",
          value: "2323 kg"
        },
        ExternalID: {
          caption: "External ID",
          value: "324239 kg"
        },
        Price: {
          value: "$5.60"
        },
      }} />
    </>
  )
}

export default RequestSpecs