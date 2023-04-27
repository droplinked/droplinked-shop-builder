import React, { useContext } from 'react'
import { Skeleton, SkeletonProps } from '@chakra-ui/react'
import { productContext } from '../../context'

interface Iprops extends SkeletonProps {
  children: any
}

function SkeletonProduct(props: Iprops) {
  const { loading } = useContext(productContext)
  const {children} = props
  return (
    <Skeleton startColor='#333' endColor='#444' isLoaded={loading} {...!loading && props}>{children}</Skeleton>
  )
}

export default SkeletonProduct