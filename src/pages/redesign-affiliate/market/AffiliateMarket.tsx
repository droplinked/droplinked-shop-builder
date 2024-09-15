import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import React, { useState } from "react";
import AffiliateItem from "../_components/AffiliateItems";
import AppImage from "components/common/image/AppImage";

type DateTypes = { label: "Today"; value: "today" } | { label: "This week"; value: "week" } | { label: "This month"; value: "month" };
const AffiliateMarket = () => {
    const dates_constant: DateTypes[] = [
        { label: "Today", value: "today" },
        { label: "This week", value: "week" },
        { label: "This month", value: "month" },
    ];
    const [date, setDate] = useState({ label: "Today", value: "today" });
    return (
        <VStack spacing={"36px"}>
            <VStack alignItems="center" width="full" justifyContent="center" height="360px" background="radial-gradient(305.12% 110.25% at 13.65% 81.01%, #182522 1.56%, rgba(48, 48, 48, 0.08) 23.53%, rgba(46, 73, 63, 0.42) 44.64%, #171717 79.55%, #000 100%), linear-gradient(rgba(255, 255, 255, 0.16) .1em, transparent .1em), linear-gradient(90deg, rgba(255, 255, 255, 0.16) .1em, transparent .1em), #060606" backgroundPosition="center, 0 0, 0 0" backgroundSize="cover, 3em 3em, 3em 3em" backgroundRepeat="no-repeat, repeat, repeat" borderRadius="8px" border="1.5px solid #292929">
                <VStack display="inline-flex" flexDirection="column" alignItems="center" spacing="16px">
                    <AppTypography color="#FFF" textAlign="center" fontFamily="Poppins" fontSize="32px" fontStyle="normal" fontWeight="400" lineHeight="48px">Unlock Savings</AppTypography>
                    <AppTypography color="#FFF" textAlign="center" fontFamily="Poppins" fontSize="48px" fontStyle="normal" fontWeight="700" lineHeight="64px">Explore Top Affiliate Picks!</AppTypography>
                </VStack>
            </VStack>
            <VStack width="full" flexDirection="column" alignItems="flex-start" spacing="48px">
                <Box display="flex" flexDirection="column" alignItems="flex-start" gap="24px" alignSelf="stretch">
                    <Box display="flex" justifyContent="space-between" alignItems="center" alignSelf="stretch">
                        <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="20px" fontStyle="normal" fontWeight="700" lineHeight="32px">New Products</AppTypography>
                        <AppTypography color="#179EF8" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="500" lineHeight="24px" textDecorationLine="underline">See all</AppTypography>
                    </Box>
                    <Box display="flex" alignItems="flex-start" gap="24px">
                        <AffiliateItem price={39} image="https://upload-file-droplinked.s3.amazonaws.com/f8655ce8efa2d416775980ae2e4b28a36ac4ce4799b84fab3c25cb69c43f0027.jpg" commission={12} name="majid"/>
                        <AffiliateItem price={39} image="https://upload-file-droplinked.s3.amazonaws.com/f8655ce8efa2d416775980ae2e4b28a36ac4ce4799b84fab3c25cb69c43f0027.jpg" commission={12} name="majid"/>
                        <AffiliateItem price={39} image="https://upload-file-droplinked.s3.amazonaws.com/f8655ce8efa2d416775980ae2e4b28a36ac4ce4799b84fab3c25cb69c43f0027.jpg" commission={12} name="majid"/>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="flex-start" gap="24px" alignSelf="stretch">
                    <Box display="flex" justifyContent="space-between" alignItems="center" alignSelf="stretch">
                        <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="20px" fontStyle="normal" fontWeight="700" lineHeight="32px">New Merchants</AppTypography>
                        <AppTypography color="#179EF8" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="500" lineHeight="24px" textDecorationLine="underline">See all</AppTypography>
                    </Box>
                    <Box display="flex" alignItems="space-between" width={"full"} gap="24px">
                        <Box display="flex" alignItems="center" gap="16px" flex="1 0 0" borderRadius="8px">
                            <AppImage className="polygon-image" src="https://upload-file-droplinked.s3.amazonaws.com/f8655ce8efa2d416775980ae2e4b28a36ac4ce4799b84fab3c25cb69c43f0027.jpg" />
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                                <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="700" lineHeight="24px">Urban Bazaar</AppTypography>
                                <AppTypography color="#F5F7FA99" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">New Merchants</AppTypography>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center" gap="16px" flex="1 0 0" borderRadius="8px">
                            <AppImage className="polygon-image" src="https://upload-file-droplinked.s3.amazonaws.com/f8655ce8efa2d416775980ae2e4b28a36ac4ce4799b84fab3c25cb69c43f0027.jpg" />
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                                <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="700" lineHeight="24px">Urban Bazaar</AppTypography>
                                <AppTypography color="#F5F7FA99" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">New Merchants</AppTypography>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center" gap="16px" flex="1 0 0" borderRadius="8px">
                            <AppImage className="polygon-image" src="https://upload-file-droplinked.s3.amazonaws.com/f8655ce8efa2d416775980ae2e4b28a36ac4ce4799b84fab3c25cb69c43f0027.jpg" />
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                                <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="700" lineHeight="24px">Urban Bazaar</AppTypography>
                                <AppTypography color="#F5F7FA99" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">New Merchants</AppTypography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="flex-start" gap="24px" alignSelf="stretch">
                    <Box display="flex" justifyContent="space-between" alignItems="center" alignSelf="stretch">
                        <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="20px" fontStyle="normal" fontWeight="700" lineHeight="32px">Hot Products</AppTypography>
                        <Flex gap={"12px"}>
                            {dates_constant?.map((date_constant) => (
                                <Box
                                    key={date_constant?.value}
                                    cursor="pointer"
                                    onClick={() => setDate({ label: date_constant?.label, value: date_constant?.value })}
                                    backgroundColor={date_constant?.value === date?.value ? "#2BCFA1" : "#292929"}
                                    display="flex"
                                    padding="6px 16px"
                                    justifyContent="center"
                                    alignItems="center"
                                    gap="10px"
                                    borderRadius="100px"
                                >
                                    <AppTypography
                                        textAlign="center"
                                        fontFamily="Inter"
                                        fontSize="14px"
                                        fontStyle="normal"
                                        fontWeight="500"
                                        lineHeight="20px"
                                        color={date_constant?.value === date?.value ? "#000" : "#7B7B7B"}
                                    >
                                        {date_constant?.label}
                                    </AppTypography>
                                </Box>
                            ))}
                        </Flex>
                    </Box>
                    <Box display="flex" alignItems="flex-start" gap="24px">
                        <AffiliateItem price={39} image="https://upload-file-droplinked.s3.amazonaws.com/f8655ce8efa2d416775980ae2e4b28a36ac4ce4799b84fab3c25cb69c43f0027.jpg" commission={12} name="majid"/>
                        <AffiliateItem price={39} image="https://upload-file-droplinked.s3.amazonaws.com/f8655ce8efa2d416775980ae2e4b28a36ac4ce4799b84fab3c25cb69c43f0027.jpg" commission={12} name="majid"/>
                        <AffiliateItem price={39} image="https://upload-file-droplinked.s3.amazonaws.com/f8655ce8efa2d416775980ae2e4b28a36ac4ce4799b84fab3c25cb69c43f0027.jpg" commission={12} name="majid"/>
                    </Box>
                </Box>
            </VStack>
        </VStack>
    );
};

export default AffiliateMarket;
