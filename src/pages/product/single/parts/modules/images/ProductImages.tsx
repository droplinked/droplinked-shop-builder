import { Box, VStack } from '@chakra-ui/react'
import AppUploadImage from 'components/common/upload/image/AppUploadImage'
import AppErrors from 'lib/utils/statics/errors/errors'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import introductionClass from '../../general/model'
import SkeletonProduct from '../skeleton/SkeletonProduct'
import ProductPageTitle from '../title/ProductPageTitle'

function ProductImages() {
  const { state: { media, product_type, thumb }, methods: { updateState } } = useContext(productContext);
  const { refactorImage, defactorImage, isMain } = introductionClass;

  return (
    <>
      {["DIGITAL", "NORMAL"].includes(product_type) && (
        <VStack align={"stretch"}>
          <ProductPageTitle
            isReuired
            title={product_type === "NORMAL" ? 'Product Images' : 'Product Preview'}
            description={product_type === "NORMAL" ? 'Upload static images of your product.' : 'Upload images of the digital product.'}
          />
          <Box>
            <SkeletonProduct width={"30%"} height={"200px"}>
              <AppUploadImage
                size='original'
                values={defactorImage(media)}
                defaults={{ updateDefault: (url) => updateState("media", refactorImage(defactorImage(media), url)), value: isMain(media)?.url }}
                onSuccess={(images: any) => !thumb.length && images?.small && updateState("thumb", images?.small)}
                onDelete={(images: any) => !images.length && updateState("thumb", "")}
                toast={AppErrors.store.upload("The product image")}
                onChange={(images: any) => updateState("media", refactorImage(images))}
              />
            </SkeletonProduct>
          </Box>
        </VStack>
      )}
    </>
  )
}

export default ProductImages;
