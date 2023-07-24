import React, { useContext, useEffect } from 'react'
import { productContext } from 'pages/product/single/context'
import { Box, Flex } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import useHookStore from 'functions/hooks/store/useHookStore'

interface IProps {
  isLoading: boolean
}

function ListCollection({ isLoading }: IProps) {
  const { state: { productCollectionID }, methods: { updateState }, productID } = useContext(productContext)
  const { data: { collection: { data } } } = useHookStore()

  // if state collection is null set first collection
  useEffect(() => {
    if (data && data.length && !productID) updateState('productCollectionID', data[0]._id)
  }, [data, productID])

  return (
    <AppSkeleton isLoaded={!isLoading}>
      <Flex backgroundColor="#141414" padding={6} gap={3} flexWrap="wrap" alignItems="baseline" minHeight="180px">
        {data && data.length ? data.map((el: any, key: number) => (
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