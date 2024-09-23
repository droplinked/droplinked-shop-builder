import React from "react";
import { Box, Flex, Image, SimpleGrid, useDisclosure, VStack } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import { useContext } from "react";
import productPageContext from "../../context";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import AppMagnifier from "components/common/magnifier/AppMagnifier";

function ProductSlider() {
    const {
        states: { product, image },
        methods: { updateState },
    } = useContext(productPageContext);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <VStack align="stretch" spacing="20px" width={"full"}>
            <AppMagnifier src={image || product?.media.find((el: any) => el.isMain === "true")?.url} magnifierRadius={50} zoom={2} />
            <SimpleGrid width={"full"} columns={4} spacing="24px">
                {product?.media && product?.media?.length
                    ? product?.media?.slice(0, 5).map((el: any, key: number) => (
                          <Box
                              display="flex"
                              padding="8px"
                              alignItems="center"
                              gap="10px"
                              rounded={"8px"}
                              border={`2px solid ${el.url === image ? "#2BCFA1" : "transparent"}`}
                              key={key}
                              position="relative"
                              onClick={() => updateState("image", el.url)}
                              width="128px"
                              height={"128px"}
                          >
                              {[product?.media?.length - 1, 4]?.includes(key) && (
                                  <Flex
                                      alignItems="center"
                                      onClick={onOpen}
                                      cursor="pointer"
                                      justifyContent="center"
                                      textAlign="center"
                                      backgroundColor="rgba(0,0,0,.6)"
                                      rounded={"8px"}
                                      position="absolute"
                                      top="0"
                                      left="0"
                                      right="0"
                                      bottom="0"
                                  >
                                      <AppTypography fontSize={{ base: "8px", sm: "12px", md: "10px" }} style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                          See More
                                      </AppTypography>
                                  </Flex>
                              )}
                              <Image src={el.url} borderRadius="4px" cursor={"pointer"} width="full" objectFit={"cover"} height={"full"} />
                          </Box>
                      ))
                    : null}
            </SimpleGrid>
            <Lightbox
                plugins={[Thumbnails]}
                thumbnails={{ position: "bottom", border: 0, imageFit: "contain", gap: 0 }}
                open={isOpen}
                close={onClose}
                slides={product?.media && product?.media?.length ? product?.media?.map((el: any) => ({ src: el.url })) : []}
            />
        </VStack>
    );
}

export default ProductSlider;
