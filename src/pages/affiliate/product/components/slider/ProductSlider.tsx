import React, { useMemo, useState } from 'react';
import { Box, Flex, Image, SimpleGrid, useDisclosure, VStack } from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import AppMagnifier from 'components/common/magnifier/AppMagnifier';

interface ProductImage {
  url: string;
  isMain: string;
}

interface ProductSliderProps {
  product: {
    media: ProductImage[];
  };
}

const ProductSlider: React.FC<ProductSliderProps> = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Media Queries
  const [isLargeScreen] = useMediaQuery('(min-width: 1400px)');
  const [isMediumScreen] = useMediaQuery('(min-width: 48em)');

  // Get the main image from the product media
  const mainImageUrl = product?.media.find((image) => image.isMain === 'true')?.url;
  const [selectedImage, setSelectedImage] = useState(mainImageUrl);

  // Determine the number of visible thumbnails based on screen size
  const thumbnailCount = useMemo(() => (isLargeScreen ? 4 : isMediumScreen ? 3 : 4), [isLargeScreen, isMediumScreen]);
  const hiddenImagesCount = (product?.media?.length || 0) - thumbnailCount;

  return (
    <VStack align="stretch" spacing="20px">
      {/* Main Image with Magnifier */}
      <AppMagnifier src={selectedImage} props={{ rounded: '8px' }} magnifierRadius={50} zoom={2} />

      {/* Thumbnail Grid */}
      <SimpleGrid width="full" columns={thumbnailCount} spacing={{ base: '8px', lg: '16px', xl: '24px' }}>
        {product?.media?.slice(0, thumbnailCount)?.map((image, index) => (
          <Box
            key={index}
            position="relative"
            onClick={() => {
              if (!(index === thumbnailCount - 1 && hiddenImagesCount > 0)) {
                setSelectedImage(image.url);
              }
            }}
            cursor="pointer"
          >
            {/* Selected Image Border */}
            <Box
              display="flex"
              height="120px"
              aspectRatio="1/1"
              alignItems="center"
              justifyContent="center"
              padding="8px"
              borderRadius="8px"
              border={image?.url === selectedImage ? '2px solid #2BCFA1' : 'none'}
            >
              <Image src={image.url} borderRadius="4px" w="full" h="full" objectFit="cover" />
            </Box>

            {/* Overlay for Remaining Images */}
            {index === thumbnailCount - 1 && hiddenImagesCount > 0 && (
              <Flex alignItems="center" justifyContent="center" position="absolute" top={0} left={0} right={0} bottom={0} backgroundColor="rgba(0,0,0,0.6)" borderRadius="8px" onClick={onOpen}>
                <AppTypography color="#FFF" fontFamily="Inter" fontSize={{ base: '20px', lg: '16px', xl: '20px' }} fontWeight="500" lineHeight="32px">
                  +{hiddenImagesCount} More
                </AppTypography>
              </Flex>
            )}
          </Box>
        ))}
      </SimpleGrid>

      {/* Lightbox for Full View */}
      <Lightbox
        plugins={[Thumbnails]}
        thumbnails={{ position: 'bottom', border: 0, imageFit: 'contain', gap: 0 }}
        open={isOpen}
        close={onClose}
        slides={product?.media?.map((image) => ({ src: image.url })) || []}
      />
    </VStack>
  );
};

export default ProductSlider;
