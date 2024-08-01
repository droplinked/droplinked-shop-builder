import { Flex, useRadioGroup } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import useCollections from 'functions/hooks/useCollections/useCollections'
import { Collection } from 'lib/apis/collection/interfaces'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect } from 'react'
import CollectionRadio from '../collection-radio/CollectionRadio'

function CollectionList() {
  const { state: { productCollectionID }, methods: { updateState }, productID } = useContext(productContext)
  const { isFetching, error, data } = useCollections()
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'selected-collection',
    onChange: (collectionId) => updateState('productCollectionID', collectionId),
    value: productCollectionID || data?.data[0]?._id
  })

  useEffect(() => {
    if (!productID) updateState('productCollectionID', data?.data[0]._id)
  }, [data, productID])


  return (
    <AppSkeleton isLoaded={!isFetching}>
      <Flex minHeight="180px" flexWrap="wrap" gap={3} padding={6} backgroundColor="#141414" {...getRootProps()}>
        {
          error ?
            <AppTypography fontSize={16} color={"red.400"}>Oops! It looks like we can not access collections at the moment. Give it another try soon?</AppTypography>
            :
            data?.data.map((collection: Collection) =>
              <CollectionRadio
                key={collection._id}
                label={collection.title}
                {...getRadioProps({ value: collection._id })}
              />
            )
        }
      </Flex>
    </AppSkeleton>
  )
}

export default CollectionList