import React, { useContext, useState } from "react";
import { Box, Flex, HStack, Select, Stack, VStack } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import { motion } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import BasicButton from "components/common/BasicButton/BasicButton";
import { TILE_DESIGN_PAGES_ENUM, PRODUCT_SECTIONS_ENUM } from "./types/tile.design.types";
import { TileDesignContext } from "./context/tile.design.context";

const imagesToShow = [
    {
        _id: "0",
        isMain: "true",
        thumbnail:
            "https://static.vecteezy.com/system/resources/previews/026/977/284/large_2x/futuristic-fashion-original-sneakers-future-design-of-stylish-sports-shoes-with-neon-glow-futuristic-urban-aesthetics-sportswear-style-and-fashion-tomorrow-footwear-ai-generative-free-photo.jpg",
    },
    {
        _id: "1",
        isMain: "false",
        thumbnail:
            "https://static.vecteezy.com/system/resources/previews/031/605/624/large_2x/futuristic-fashion-original-sneakers-future-design-of-stylish-sports-shoes-with-neon-glow-futuristic-urban-aesthetics-sportswear-style-and-fashion-tomorrow-footwear-ai-generative-free-photo.jpg",
    },
    {
        _id: "2",
        isMain: "false",
        thumbnail:
            "https://static.vecteezy.com/system/resources/previews/031/605/688/large_2x/futuristic-fashion-original-sneakers-future-design-of-stylish-sports-shoes-with-neon-glow-futuristic-urban-aesthetics-sportswear-style-and-fashion-tomorrow-footwear-ai-generative-free-photo.jpg",
    },
];

const colors = [
    { caption: "black", value: "#010206" },
    { caption: "black", value: "#BF2333" },
    { caption: "black", value: "#010206" },
    { caption: "black", value: "#BF2333" },
];

const sizes = [
    { caption: "36", value: "36" },
    { caption: "37", value: "37" },
    { caption: "38", value: "38" },
    { caption: "39", value: "39" },
    { caption: "40", value: "40" },
];

const TileDesignPageProduct = () => {
    const [[imageCount, direction], setImageCount] = useState<[number, number]>([0, 0]);
    const {
        state: {
            design: {
                PRODUCT: { IMAGE, CONTAINER, BUTTON, VARIANTS, TITLE, PRICE },
            },
            current,
        },
        methods: { updateFormFields, updateState },
    } = useContext(TileDesignContext);
    const activeImageIndex = wrap(0, imagesToShow?.length, imageCount);
    const white_if_dark_mode = CONTAINER.darkMode ? "#FFFFFF" : "#000000";
    const black_if_dark_mode = CONTAINER.darkMode ? "#000000" : "#FFFFFF";
    const height_of_container = () => {
        let basic = 370;
        if (IMAGE.display) basic += 180;
        if (VARIANTS.displayType === "checkbox") basic += 150;
        return `${basic}px`;
    };
    return (
        <Box minW={"40%"} height={height_of_container()} position={"relative"} display="flex" flexDirection="column" alignItems={"center"} justifyContent={"center"} color={white_if_dark_mode}>
            <VStack
                align={"stretch"}
                padding="24px 32px"
                borderRadius="16px"
                boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.20)"
                minW={"100%"}
                minH={"90%"}
                maxH={"100%"}
                position={"absolute"}
                zIndex={9}
                border={"3px solid transparent"}
                cursor={"pointer"}
                opacity={CONTAINER.opacity}
                backgroundColor={CONTAINER?.backgroundColor}
                _hover={{ border: "3px solid #2BCFA1", boxShadow: "0px 0px 4px 2px rgba(255, 255, 255, 0.62), 0px 0px 0px 4px rgba(43, 207, 161, 0.30)" }}
                onClick={() => {
                    updateState("current", { page: TILE_DESIGN_PAGES_ENUM.PRODUCT, section: PRODUCT_SECTIONS_ENUM.CONTAINER });
                }}
            ></VStack>
            <VStack align={"stretch"} spacing="16px" maxW={"80%"} maxH={"90%"} position={"absolute"} zIndex={999}>
                {IMAGE.display ? (
                    <Box
                        role={"group"}
                        style={{
                            height: "100%",
                            width: "100%",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            borderRadius: "8px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "16px",
                        }}
                        border={"3px solid transparent"}
                        cursor={"pointer"}
                        _hover={{ border: "3px solid #2BCFA1", boxShadow: "0px 0px 4px 2px rgba(255, 255, 255, 0.62), 0px 0px 0px 4px rgba(43, 207, 161, 0.30)" }}
                        onClick={() => {
                            updateState("current", { page: TILE_DESIGN_PAGES_ENUM.PRODUCT, section: PRODUCT_SECTIONS_ENUM.IMAGE });
                        }}
                    >
                        <motion.div
                            key={imageCount}
                            style={{
                                height: "216px",
                                width: "100%",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                borderRadius: "8px",
                                backgroundImage: `url(${imagesToShow?.[activeImageIndex]?.thumbnail})`,
                            }}
                            custom={direction}
                            variants={{
                                incoming: { opacity: 0 },
                                active: { scale: 1, opacity: 1 },
                                exit: { opacity: 0.2 },
                            }}
                            initial="incoming"
                            animate="active"
                            exit="exit"
                            transition={{ duration: 1, ease: [0.56, 0.03, 0.12, 1.04] }}
                        />
                        {IMAGE.slider && (
                            <motion.div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "2px",
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                {imagesToShow.map((image, index) => (
                                    <div key={image._id} onClick={() => setImageCount([index, index > activeImageIndex ? 1 : index < activeImageIndex ? -1 : 0])} style={{ cursor: "pointer" }}>
                                        <div
                                            style={
                                                index === activeImageIndex
                                                    ? {
                                                          borderRadius: "8px",
                                                          transition: "300ms ease",
                                                          width: "12px",
                                                          height: "12px",
                                                          backgroundColor: "#2bcfa1",
                                                      }
                                                    : {
                                                          width: "10px",
                                                          height: "10px",
                                                          borderRadius: "8px",
                                                          backgroundColor: "#9cf8de",
                                                          transition: "300ms ease",
                                                      }
                                            }
                                        />
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </Box>
                ) : (
                    <Box
                        borderRadius="16px"
                        height={"50px"}
                        border={"3px solid transparent"}
                        cursor={"pointer"}
                        _hover={{ border: "3px solid #2BCFA1", boxShadow: "0px 0px 4px 2px rgba(255, 255, 255, 0.62), 0px 0px 0px 4px rgba(43, 207, 161, 0.30)" }}
                        onClick={() => {
                            updateState("current", { page: TILE_DESIGN_PAGES_ENUM.PRODUCT, section: PRODUCT_SECTIONS_ENUM.IMAGE });
                        }}
                    ></Box>
                )}

                <Flex direction={"column"} gap={2}>
                    <AppTypography
                        padding={1}
                        textAlign="left"
                        overflow={"hidden"}
                        noOfLines={1}
                        maxW={"100%"}
                        textOverflow={"ellipsis"}
                        alignSelf={"stretch"}
                        fontSize={{ base: "14px", sm: "16px" }}
                        fontWeight={400}
                        color={TITLE.color}
                        cursor={"pointer"}
                        _hover={{ border: "1px solid #2BCFA1", boxShadow: "0px 0px 4px 2px rgba(255, 255, 255, 0.62), 0px 0px 0px 4px rgba(43, 207, 161, 0.30)" }}
                        border={"1px solid transparent"}
                        rounded={"16px"}
                        onClick={() => {
                            updateState("current", { page: TILE_DESIGN_PAGES_ENUM.PRODUCT, section: PRODUCT_SECTIONS_ENUM.TITLE });
                        }}
                    >
                        Casper punks unisex premium pullover hooded sweat shirt
                    </AppTypography>
                    <AppTypography
                        padding={1}
                        cursor={"pointer"}
                        _hover={{ border: "1px solid #2BCFA1", boxShadow: "0px 0px 4px 2px rgba(255, 255, 255, 0.62), 0px 0px 0px 4px rgba(43, 207, 161, 0.30)" }}
                        border={"1px solid transparent"}
                        rounded={"16px"}
                        onClick={() => {
                            updateState("current", { page: TILE_DESIGN_PAGES_ENUM.PRODUCT, section: PRODUCT_SECTIONS_ENUM.PRICE });
                        }}
                        textAlign={"left"}
                        color={PRICE.color}
                        fontWeight={600}
                        fontSize={{ base: "14px", sm: "16px" }}
                    >
                        $99.99 USD
                    </AppTypography>
                </Flex>
                {VARIANTS?.displayType === "checkbox" ? (
                    <>
                        <VStack justifyContent="flex-start" align={"stretch"} alignItems={"start"} gap="8px" width={"full"} flexWrap={"wrap"}>
                            <AppTypography fontWeight={"400"} fontSize={"14px"}>
                                Color
                            </AppTypography>
                            <HStack
                                align={"stretch"}
                                gap={"8px"}
                                padding={"4px"}
                                rounded={"4px"}
                                border={"1px solid transparent"}
                                cursor={"pointer"}
                                _hover={{ border: "1px solid #2BCFA1", boxShadow: "0px 0px 4px 2px rgba(255, 255, 255, 0.62), 0px 0px 0px 4px rgba(43, 207, 161, 0.30)" }}
                                onClick={() => {
                                    updateState("current", { page: TILE_DESIGN_PAGES_ENUM.PRODUCT, section: PRODUCT_SECTIONS_ENUM.VARIANTS });
                                }}
                            >
                                {colors.map((el, key: number) => (
                                    <Box
                                        key={key}
                                        display="flex"
                                        width="36px"
                                        height="36px"
                                        padding="6px"
                                        alignItems="center"
                                        gap="10px"
                                        borderRadius="4px"
                                        border={key === 0 ? `1px solid ${white_if_dark_mode}` : `1px solid ${black_if_dark_mode}`}
                                        
                                    >
                                        <Box height="24px" width="24px" borderRadius="2px" backgroundColor={el.value}></Box>
                                    </Box>
                                ))}
                            </HStack>
                        </VStack>
                        <VStack justifyContent="flex-start" align={"stretch"} alignItems={"start"} gap="8px" width={"full"} flexWrap={"wrap"}>
                            <AppTypography fontWeight={"400"} fontSize={"14px"}>
                                Size
                            </AppTypography>
                            <HStack
                                align={"stretch"}
                                gap={"8px"}
                                padding={"4px"}
                                rounded={"4px"}
                                border={"1px solid transparent"}
                                cursor={"pointer"}
                                _hover={{ border: "1px solid #2BCFA1", boxShadow: "0px 0px 4px 2px rgba(255, 255, 255, 0.62), 0px 0px 0px 4px rgba(43, 207, 161, 0.30)" }}
                                onClick={() => {
                                    updateState("current", { page: TILE_DESIGN_PAGES_ENUM.PRODUCT, section: PRODUCT_SECTIONS_ENUM.VARIANTS });
                                }}
                            >
                                {sizes.map((el, key: number) => (
                                    <Box
                                        key={key}
                                        display="flex"
                                        width="36px"
                                        height="36px"
                                        padding="8px"
                                        justifyContent="center"
                                        alignItems="center"
                                        gap="8px"
                                        border={"1px solid #DEDEDE"}
                                        rounded={"4px"}
                                        backgroundColor={key === 2 && white_if_dark_mode}
                                        color={key === 2 ? black_if_dark_mode : white_if_dark_mode}
                                    >
                                        {el.value}
                                    </Box>
                                ))}
                            </HStack>
                        </VStack>
                    </>
                ) : (
                    <HStack
                        justifyContent="flex-start"
                        align={"stretch"}
                        alignItems={"start"}
                        gap="8px"
                        width={"full"}
                        border={"1px solid transparent"}
                        cursor={"pointer"}
                        _hover={{ border: "1px solid #2BCFA1", boxShadow: "0px 0px 4px 2px rgba(255, 255, 255, 0.62), 0px 0px 0px 4px rgba(43, 207, 161, 0.30)" }}
                        onClick={() => {
                            updateState("current", { page: TILE_DESIGN_PAGES_ENUM.PRODUCT, section: PRODUCT_SECTIONS_ENUM.VARIANTS });
                        }}
                    >
                        <Select placeholder={"Color"} color={white_if_dark_mode}>
                            {colors.map((el, key: number) => (
                                <option value={el.caption}>{el?.caption}</option>
                            ))}
                        </Select>
                        <Select placeholder={"Size"} color={white_if_dark_mode}>
                            {sizes.map((el, key: number) => (
                                <option value={el.caption}>{el?.caption}</option>
                            ))}
                        </Select>
                    </HStack>
                )}
                <Stack
                    align={"stretch"}
                    cursor={"pointer"}
                    border={"1px solid transparent"}
                    rounded={"8px"}
                    _hover={{ border: "1px solid #2BCFA1", boxShadow: "0px 0px 4px 2px rgba(255, 255, 255, 0.62), 0px 0px 0px 4px rgba(43, 207, 161, 0.30)" }}
                    onClick={() => {
                        updateState("current", { page: TILE_DESIGN_PAGES_ENUM.PRODUCT, section: PRODUCT_SECTIONS_ENUM.BUTTON });
                    }}
                >
                    <BasicButton bg={BUTTON.backgroundColor} padding={"12px"} border={"none"} color={BUTTON.color} _hover={{}} _active={{}}>
                        {BUTTON.text}
                    </BasicButton>
                </Stack>
            </VStack>
        </Box>
    );
};

export default TileDesignPageProduct;
