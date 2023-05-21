import React, { useContext, useEffect } from 'react'
import { productContext } from 'pages/product/single/context'
import AppSelectBox from 'common/form/select/AppSelectBox'

interface IProps {
  collections: any
  isLoading: boolean
}

function ListCollection({ collections, isLoading }: IProps) {
  const { state: { productCollectionID }, methods: { updateState }, productID } = useContext(productContext)

  // if state collection is null set first collection
  useEffect(() => {
    if (collections && collections.length && !productID) updateState('productCollectionID', collections[0]._id)
  }, [collections, productID])

  return (
    <AppSelectBox
      items={collections && collections.length ? collections.map(el => ({
        value: el._id,
        caption: el.title
      })) : []}
      loading={!isLoading}
      value={productCollectionID}
      onChange={(e) => updateState('productCollectionID', e.target.value)}
      name="collection"
    />
  )
}

export default ListCollection