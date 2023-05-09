import React, { useContext } from 'react'
import { SkeletonProps } from '@chakra-ui/react'
import AppSkeleton from 'components/shared/skeleton/AppSkeleton'
import { productContext } from 'pages/product/single/context'

interface Iprops extends SkeletonProps {
  children: any
}

function SkeletonProduct(props: Iprops) {
  const { loading } = useContext(productContext)
  const {children} = props
  return (
    <AppSkeleton isLoaded={loading} {...!loading && props}>{children}</AppSkeleton>
  )
}

export default SkeletonProduct