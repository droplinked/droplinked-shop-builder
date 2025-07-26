import { Box, RadioGroup, Button, VStack, HStack } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import React, { useContext, useState } from "react";
import { TileDesignContext } from "./context/tile.design.context";
import "./styles/tile.radio.css";
import { CasperLogo } from "assets/logo/NetworkAndTokens/Casper/CasperLogo";
import { UnstoppableLogo } from "assets/logo/NetworkAndTokens/Unstoppable/UnstoppableLogo";

const TileDesignPagePayment = () => {
    const [checked, setChecked] = useState(false);
    const { t } = useLocaleResources('tile-design');
    const { state: { design: { PRODUCT: { CONTAINER } } } } = useContext(TileDesignContext);
    
    const textColor = CONTAINER.darkMode ? "#FFFFFF" : "#000000";
    const backgroundColor = CONTAINER.darkMode ? "#141414" : "#FFFFFF";
    const secondaryTextColor = CONTAINER.darkMode ? "#C2C2C2" : "#000000";

    return (
        <Box bg={backgroundColor} color={textColor} width={"full"} maxW={"80%"} p={"36px"} borderRadius="lg" display={"flex"} flexDir={"column"} boxShadow="base" mx="auto" gap={"48px"}>
            <AppTypography fontSize={"16px"} fontWeight={"700"}>
                {t('payment.title')}
            </AppTypography>
            <RadioGroup>
                <VStack spacing={6} width={"full"}>
                    <VStack spacing={4} width={"full"}>
                        <label className="applabel">
                            <input className={CONTAINER.darkMode ? "appinput_dark" : "appinput"} type="radio" style={{ minWidth: "16px", marginTop: "4px" }} checked={checked} />
                            <HStack
                                onClick={() => {
                                    setChecked((prev) => !prev);
                                }}
                                spacing={"8px"}
                                width={"full"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <AppTypography>{t('TileDesignPagePayment.casperWallet')}</AppTypography>
                                <CasperLogo width={"24px"} height={"24px"} />
                            </HStack>
                        </label>
                        <label className="applabel">
                            <input className={CONTAINER.darkMode ? "appinput_dark" : "appinput"} type="radio" style={{ minWidth: "16px", marginTop: "4px" }} checked={!checked} />
                            <HStack
                                onClick={() => {
                                    setChecked((prev) => !prev);
                                }}
                                spacing={"8px"}
                                width={"full"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <AppTypography>{t('payment.methods.unstoppableWallet')}</AppTypography>
                                <UnstoppableLogo width={"24px"} height={"24px"} />
                            </HStack>
                        </label>
                    </VStack>
                </VStack>
            </RadioGroup>
            <VStack spacing={"16px"} width={"full"} color={secondaryTextColor}>
                <HStack justify={"space-between"} width={"full"}>
                    <AppTypography fontWeight={"600"}>{t('TileDesignPagePayment.totalCart')}</AppTypography>
                    <AppTypography fontWeight={"600"}>$23.98 USD</AppTypography>
                </HStack>
                <HStack justify={"space-between"} width={"full"}>
                    <AppTypography fontWeight={"600"}>{t('TileDesignPagePayment.shipping')}</AppTypography>
                    <AppTypography fontWeight={"600"}>$23.98 USD</AppTypography>
                </HStack>
                <HStack justify={"space-between"} width={"full"}>
                    <AppTypography fontWeight={"600"}>{t('TileDesignPagePayment.tax')}</AppTypography>
                    <AppTypography fontWeight={"600"}>$23.98 USD</AppTypography>
                </HStack>
                <HStack justify={"space-between"} width={"full"}>
                    <AppTypography fontWeight={"600"}>{t('TileDesignPagePayment.total')}</AppTypography>
                    <AppTypography fontWeight={"600"}>$23.98 USD</AppTypography>
                </HStack>
            </VStack>
            <HStack width={"full"} justify={"space-between"}>
                <Button variant="outline" fontWeight={"400"} padding={"12px"} fontSize={"14px"} border={`1px solid ${textColor}`} color={textColor} _hover={{}} _active={{}}>
                    {t('common:back')}
                </Button>
                <Button bg={textColor} width={"200px"} paddingX={"36px"} fontSize={"14px"} fontWeight={"400"} padding={"12px"} border={"none"} color={backgroundColor} _hover={{}} _active={{}}>
                    {t('TileDesignPagePayment.pay').replace('{{amount}}', '$246.98 USD')}
                </Button>
            </HStack>
        </Box>
    );
};

export default TileDesignPagePayment;
