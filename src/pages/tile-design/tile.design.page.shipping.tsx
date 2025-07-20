import { Box, RadioGroup, Button, VStack, HStack } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import React, { useContext, useState } from "react";
import { TileDesignContext } from "./context/tile.design.context";
import './styles/tile.radio.css'

const TileDesignPageShipping = () => {
    const { t } = useLocaleResources('tile-design');
    const { state: { design: { PRODUCT: { CONTAINER } } } } = useContext(TileDesignContext);
    const [checked, setChecked] = useState(false);
    const white_if_dark_mode = CONTAINER.darkMode ? "#FFFFFF" : "#000000";
    const black_if_dark_mode = CONTAINER.darkMode ? "#141414" : "#FFFFFF";
    
    return (
        <Box bg={black_if_dark_mode} color={white_if_dark_mode} width={"full"} maxW={"80%"} p={"36px"} borderRadius="lg" display={"flex"} flexDir={"column"} boxShadow="base" mx="auto" gap={"48px"}>
            <AppTypography fontSize={"16px"} fontWeight={"700"}>
                {t('shipping.fields.method')}
            </AppTypography>
            <RadioGroup>
                <VStack spacing={6} width={"full"}>
                    <VStack spacing={4} width={"full"}>
                        <label className="applabel">
                            <input className={CONTAINER.darkMode ? "appinput_dark" : "appinput"} type="radio" style={{ minWidth: "16px" }} checked={checked} />
                            <VStack
                                onClick={() => {
                                    setChecked((prev) => !prev);
                                }}
                                spacing={"8px"}
                                width={"full"}
                                justifyContent={"flex-start"}
                                alignItems={"flex-start"}
                            >
                                <HStack>
                                    <AppTypography>{t('shipping.methods.standard')}</AppTypography>
                                    <AppTypography>$23.98 USD</AppTypography>
                                </HStack>
                                <HStack>
                                    <AppTypography>{t('TileDesignPageShipping.fulfillmentDate')}</AppTypography>
                                    <AppTypography>•</AppTypography>
                                    <AppTypography>3 - 5 days</AppTypography>
                                </HStack>
                            </VStack>
                        </label>
                        <label className="applabel">
                            <input className={CONTAINER.darkMode ? "appinput_dark" : "appinput"} type="radio" style={{ minWidth: "16px" }} checked={!checked} />
                            <VStack
                                onClick={() => {
                                    setChecked((prev) => !prev);
                                }}
                                spacing={"8px"}
                                width={"full"}
                                justifyContent={"flex-start"}
                                alignItems={"flex-start"}
                            >
                                <HStack>
                                    <AppTypography>{t('TileDesignPageShipping.local')}</AppTypography>
                                    <AppTypography>$3.98 USD</AppTypography>
                                </HStack>
                                <HStack>
                                    <AppTypography>{t('TileDesignPageShipping.fulfillmentDate')}</AppTypography>
                                    <AppTypography>•</AppTypography>
                                    <AppTypography>3 - 5 days</AppTypography>
                                </HStack>
                            </VStack>
                        </label>
                    </VStack>
                </VStack>
            </RadioGroup>
            <HStack width={"full"} justify={"space-between"}>
                <Button variant="outline" fontWeight={"400"} padding={"12px"} border={`1px solid ${white_if_dark_mode}`} color={white_if_dark_mode} _hover={{}} _active={{}}>
                    {t('common.back')}
                </Button>
                <Button bg={white_if_dark_mode} width={"100px"} paddingX={"36px"} fontWeight={"400"} padding={"12px"} border={"none"} color={black_if_dark_mode} _hover={{}} _active={{}}>
                    {t('common.next')}
                </Button>
            </HStack>
        </Box>
    );
};

export default TileDesignPageShipping;
