import React, { useMemo, useState } from "react";
import { Box, Flex, Image, SimpleGrid, useDisclosure, VStack } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import AppMagnifier from "components/common/magnifier/AppMagnifier";

function ProductSlider({ product }: { product: any }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isXl] = useMediaQuery("(min-width: 1400px)");
    const [isMd] = useMediaQuery("(min-width: 48em)");

    const mainImage = product?.media.find((el) => el.isMain === "true")?.url;
    const [selectedImage, setSelectedImage] = useState(mainImage);

    const visibleImages = useMemo(() => {
        if (isXl) return 4;
        if (isMd) return 3;
        return 4;
    }, [isXl, isMd]);

    const remainingImagesCount = (product?.media?.length || 0) - visibleImages;

    return (
        <VStack align="stretch" spacing="20px" width="full">
            <AppMagnifier src={selectedImage} props={{ rounded: "8px" }} magnifierRadius={50} zoom={2} />
            <SimpleGrid width="full" columns={visibleImages} spacing={{ base: "8px", lg: "16px", xl: "24px" }}>
                {product?.media?.slice(0, visibleImages)?.map((el, key) => (
                    <Box
                        key={key}
                        position="relative"
                        onClick={() => {
                            if (!(key === visibleImages - 1 && remainingImagesCount > 0)) {
                                setSelectedImage(el.url);
                            }
                        }}
                        cursor="pointer"
                    >
                        {el?.url === selectedImage ? (
                            <Box display="flex" width="full" height="auto" padding="8px" alignItems="center" gap="10px" borderRadius="8px" border="2px solid #2BCFA1">
                                <Image src={el.url} borderRadius="4px" width="full" height="auto" objectFit="cover" />
                            </Box>
                        ) : (
                            <Image src={el.url} borderRadius="4px" width="full" height="auto" objectFit="cover" />
                        )}
                        {key === visibleImages - 1 && remainingImagesCount > 0 && (
                            <Flex
                                alignItems="center"
                                justifyContent="center"
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                bottom={0}
                                backgroundColor="rgba(0,0,0,0.6)"
                                borderRadius="8px"
                                onClick={onOpen}
                            >
                                <AppTypography color="#FFF" fontFamily="Inter" fontSize={{ base: "20px", lg: "16px", xl: "20px" }} fontStyle="normal" fontWeight="500" lineHeight="32px">
                                    +{remainingImagesCount} More
                                </AppTypography>
                            </Flex>
                        )}
                    </Box>
                ))}
            </SimpleGrid>
            <Lightbox
                plugins={[Thumbnails]}
                thumbnails={{ position: "bottom", border: 0, imageFit: "contain", gap: 0 }}
                open={isOpen}
                close={onClose}
                slides={product?.media?.map((el) => ({ src: el.url })) || []}
            />
        </VStack>
    );
}

export default ProductSlider;
