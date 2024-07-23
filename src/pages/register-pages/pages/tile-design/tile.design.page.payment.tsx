import { Box, RadioGroup, Button, VStack, HStack } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import React, { useContext, useState } from "react";
import { TileDesignContext } from "./context/tile.design.context";
import "./styles/tile.radio.css";
import AppIcons from "assest/icon/Appicons";

const TileDesignPagePayment = () => {
    const {
        state: {
            design: {
                PRODUCT: { IMAGE, CONTAINER, BUTTON, VARIANTS, TITLE, PRICE },
            },
            current,
        },
    } = useContext(TileDesignContext);
    const [checked, setChecked] = useState(false);
    const white_if_dark_mode = CONTAINER.darkMode ? "#FFFFFF" : "#000000";
    const black_if_dark_mode = CONTAINER.darkMode ? "#000000" : "#FFFFFF";
    const grey_if_dark_mode = CONTAINER.darkMode ? "#C2C2C2" : "#000000";

    return (
        <Box bg={black_if_dark_mode} color={white_if_dark_mode} width={"full"} maxW={"80%"} p={"36px"} borderRadius="lg" display={"flex"} flexDir={"column"} boxShadow="base" mx="auto" gap={"48px"}>
            <AppTypography fontSize={"16px"} fontWeight={"700"}>
                Payment
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
                                <AppTypography>Casper Wallet</AppTypography>
                                <AppIcons.CasperIcon width={"24px"} height={"24px"} />
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
                                <AppTypography>Unstoppable Wallet</AppTypography>
                                <AppIcons.UnstoppableDomainsIcon width={"24px"} height={"24px"} />
                            </HStack>
                        </label>
                    </VStack>
                </VStack>
            </RadioGroup>
            <VStack spacing={"16px"} width={"full"} color={grey_if_dark_mode}>
                <HStack justify={"space-between"} width={"full"}>
                    <AppTypography fontWeight={"600"}>Total cart</AppTypography>
                    <AppTypography fontWeight={"600"}>$23.98 USD</AppTypography>
                </HStack>
                <HStack justify={"space-between"} width={"full"}>
                    <AppTypography fontWeight={"600"}>Shipping</AppTypography>
                    <AppTypography fontWeight={"600"}>$23.98 USD</AppTypography>
                </HStack>
                <HStack justify={"space-between"} width={"full"}>
                    <AppTypography fontWeight={"600"}>Tax</AppTypography>
                    <AppTypography fontWeight={"600"}>$23.98 USD</AppTypography>
                </HStack>
                <HStack justify={"space-between"} width={"full"}>
                    <AppTypography fontWeight={"600"}>Total</AppTypography>
                    <AppTypography fontWeight={"600"}>$23.98 USD</AppTypography>
                </HStack>
            </VStack>
            <HStack width={"full"} justify={"space-between"}>
                <Button variant="outline" fontWeight={"400"} padding={"12px"} fontSize={"14px"} border={`1px solid ${white_if_dark_mode}`} color={white_if_dark_mode} _hover={{}} _active={{}}>
                    Back
                </Button>
                <Button bg={white_if_dark_mode} width={"200px"} paddingX={"36px"} fontSize={"14px"} fontWeight={"400"} padding={"12px"} border={"none"} color={black_if_dark_mode} _hover={{}} _active={{}}>
                    Pay $246.98 USD
                </Button>
            </HStack>
        </Box>
    );
};

export default TileDesignPagePayment;
