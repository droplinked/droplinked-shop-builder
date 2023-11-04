import { VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import { IpodProductService } from 'lib/apis/pod/interfaces'
import { getPodProductService, podProductService } from 'lib/apis/pod/services'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import artwork2dContext from '../../context'

function PrintfullTechniques() {
  const { setStates } = useContext(artwork2dContext)
  const { state: { pod_blank_product_id } } = useContext(productContext)
  const { mutate, isLoading, data } = useMutation((params: IpodProductService) => podProductService(params))

  useEffect(() => {
    mutate({ pod_blank_product_id })
  }, [pod_blank_product_id])

  return (
    <VStack align="stretch">
      {isLoading ? (
        <AppSkeleton isLoaded={false} height="20px">{''}</AppSkeleton>
      ) : data?.data?.data ? data?.data?.data?.techniques.map((el, key) => (
        <BasicButton key={key} variant="outline" onClick={() => setStates("technique", el.key)}>{el.display_name}</BasicButton>
      )) : null}
    </VStack>
  )
}

export default PrintfullTechniques