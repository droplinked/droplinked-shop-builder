import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCollection } from 'lib/store/features/product/collection'
import { productContext } from 'pages/product/single/context'
import AppSelectBox from 'components/shared/form/select/AppSelectBox'

function ListCollection() {
  const { state: { productCollectionID }, methods: { updateState }, productID } = useContext(productContext)
  const collections = useSelector((state) => state.products.collection)
  const dispatch = useDispatch()

  // get collection from service and dispatch
  useEffect(() => !collections.fetch && dispatch(fetchCollection()), [collections.fetch])

  // if state collection is null set first collection
  useEffect(() => {
    if (collections.list.length && !productID) updateState('productCollectionID', collections.list[0]._id)
  }, [collections.list, productID])

  return (
    <AppSelectBox
      items={collections.list.length ? collections.list.map(el => ({
        value: el._id,
        caption: el.title
      })) : []}
      value={productCollectionID}
      onChange={(e) => updateState('productCollectionID', e.target.value)}
      name="collection"
    />
  )
}

export default ListCollection