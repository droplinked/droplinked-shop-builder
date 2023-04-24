import { Box, Flex, Text } from '@chakra-ui/react'
import { BlackBox } from 'pages/register-pages/RegisterPages-style'
import React, { useCallback, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCollection } from 'lib/store/features/product/collection'
import classes from './style.module.scss'
import { productContext } from 'pages/product/single/context'

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

  const isActiveCollection = useCallback((collectionID) => productCollectionID === collectionID, [productCollectionID])

  return (
    <BlackBox>
      <Flex columnGap={5} rowGap={5} flexWrap={"wrap"}>
        {collections.list.length ? collections.list.map((el, key) => (
          <Box
            key={key}
            className={`${classes.box} ${isActiveCollection(el._id) ? classes.active : null}`}
            onClick={() => updateState('productCollectionID', el._id)}
          >
            <Text fontSize="larger">{el.title}</Text>
          </Box>
        )) : null}
      </Flex>
    </BlackBox>
  )
}

export default ListCollection