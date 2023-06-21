import React, { useContext, useEffect } from 'react'
import { productContext } from 'pages/product/single/context'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import { Box, Flex } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'

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
    <AppSkeleton isLoaded={!isLoading}>
      <Flex backgroundColor="#141414" padding={6} gap={3} flexWrap="wrap" alignItems="baseline" minHeight="180px">
        {collections && collections.length ? collections.map((el: any, key: number) => (
          <Box
            key={key}
            onClick={() => updateState('productCollectionID', el._id)}
            backgroundColor={el._id === productCollectionID ? "#2EC99E" : "#1C1C1C"}
            color={el._id === productCollectionID ? "#084836" : "#808080"}
            padding="6px 16px"
            borderRadius="100px"
            cursor="pointer"
          >
            {el.title}
          </Box>
        )) : null}
      </Flex>
    </AppSkeleton>
  )
}

export default ListCollection