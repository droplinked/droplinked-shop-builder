import { Box, VStack, HStack, Input, Select, Button } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import React, { useContext } from "react";
import { TileDesignContext } from "./context/tile.design.context";

const sampleLocations = {
    countries: [{ name: "USA" }, { name: "Canada" }, { name: "Mexico" }],
    cities: [
        { name: "New York", state_name: "NY" },
        { name: "Los Angeles", state_name: "CA" },
    ],
};

const sampleCartShippings = [
    {
        groupId: "group1",
        data: [
            { id: "shipping1", label: "Standard Shipping", price: "$5.99" },
            { id: "shipping2", label: "Express Shipping", price: "$15.99" },
        ],
    },
    {
        groupId: "group2",
        data: [
            { id: "shipping3", label: "International Shipping", price: "$25.99" },
            { id: "shipping4", label: "Local Pickup", price: "Free" },
        ],
    },
];

const TileDesignPageInformation = () => {
    const {
        state: {
            design: {
                PRODUCT: { IMAGE, CONTAINER, BUTTON, VARIANTS, TITLE, PRICE },
            },
            current,
        },
    } = useContext(TileDesignContext);
    const white_if_dark_mode = CONTAINER.darkMode ? "#FFFFFF" : "#000000";
    const black_if_dark_mode = CONTAINER.darkMode ? "#141414" : "#FFFFFF";

    return (
        <Box bg={black_if_dark_mode} color={white_if_dark_mode} width={"full"} maxW={"80%"} p={"36px"} borderRadius="lg" display={"flex"} flexDir={"column"} boxShadow="base" mx="auto" gap={"48px"}>
            <AppTypography fontSize={"16px"} fontWeight={"700px"}>
                Information
            </AppTypography>
            <VStack spacing={12} width={"full"}>
                <HStack width={"full"} justifyContent={"space-between"}>
                    <VStack spacing={"8px"} width={"full"} alignItems={"flex-start"}>
                        <AppTypography fontSize={"14px"} fontWeight={"400"}>
                            First name
                        </AppTypography>
                        <Input padding={"12px 16px"} id="firstName" placeholder="John" />
                    </VStack>
                    <VStack spacing={"8px"} width={"full"} alignItems={"flex-start"}>
                        <AppTypography fontSize={"14px"} fontWeight={"400"}>
                            Last name
                        </AppTypography>
                        <Input padding={"12px 16px"} id="lastName" placeholder="Doe" />
                    </VStack>
                </HStack>
                <VStack spacing={"8px"} width={"full"} alignItems={"flex-start"}>
                    <AppTypography fontSize={"14px"} fontWeight={"400"}>
                        Email Address
                    </AppTypography>
                    <Input padding={"12px 16px"} id="email" type="email" placeholder="you@example.com" />
                </VStack>
                <VStack spacing={"8px"} width={"full"} alignItems={"flex-start"}>
                    <AppTypography fontSize={"14px"} fontWeight={"400"}>
                        Address
                    </AppTypography>
                    <Input padding={"12px 16px"} id="address" placeholder="your address" />
                </VStack>
                <HStack width={"full"}>
                    <VStack spacing={"8px"} width={"full"} alignItems={"flex-start"}>
                        <AppTypography fontSize={"14px"} fontWeight={"400"}>
                            State
                        </AppTypography>
                        <Select id="state" placeholder="Select" size={"lg"}>
                            {sampleLocations.countries.map((el) => (
                                <option key={el.name} value={el.name}>
                                    {el.name}
                                </option>
                            ))}
                        </Select>
                    </VStack>
                    <VStack spacing={"8px"} width={"full"} alignItems={"flex-start"}>
                        <AppTypography fontSize={"14px"} fontWeight={"400"}>
                            City
                        </AppTypography>
                        <Select id="city" placeholder="Select" size={"lg"}>
                            {sampleLocations.cities.map((el) => (
                                <option key={el.name} value={el.name}>
                                    {el.name}
                                </option>
                            ))}
                        </Select>
                    </VStack>
                    <VStack spacing={"8px"} width={"full"} alignItems={"flex-start"}>
                        <AppTypography fontSize={"14px"} fontWeight={"400"}>
                            Zip Code
                        </AppTypography>
                        <Input padding={"12px 16px"} id="zip" placeholder="Zip code" />
                    </VStack>
                </HStack>
                <HStack width={"full"} justify={"space-between"}>
                    <Button variant="outline" fontWeight={"400"} padding={"12px"} border={`1px solid ${white_if_dark_mode}`} color={white_if_dark_mode} _hover={{}} _active={{}}>
                        Back to Shop
                    </Button>
                    <Button bg={white_if_dark_mode} width={"100px"} paddingX={"36px"} fontWeight={"400"} padding={"12px"} border={"none"} color={black_if_dark_mode} _hover={{}} _active={{}}>
                        Next
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
};

export default TileDesignPageInformation;
