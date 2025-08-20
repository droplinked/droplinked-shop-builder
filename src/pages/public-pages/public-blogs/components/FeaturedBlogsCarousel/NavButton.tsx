import { Box, Text, BoxProps } from "@chakra-ui/react";
import React from "react";
import { ChevronleftLg } from "assets/icons/Navigation/ChevronLeft/ChevronleftLg";
import { ChevronrightLg } from "assets/icons/Navigation/ChevronRight/ChevronrightLg";

interface NavButtonProps extends BoxProps {
    direction: "prev" | "next";
    onClick: () => void;
}

export function NavButton({ direction, onClick, ...boxProps }: NavButtonProps) {
    return (
        <Box
            role="button"
            aria-label={direction === "prev" ? "Previous" : "Next"}
            onClick={onClick}
            cursor="pointer"
            p={2}
            bg="blackAlpha.200"
            borderRadius="lg"
            boxShadow="0px 0.82px 2.54px rgba(0,0,0,0.17), 0px 2.25px 7.01px rgba(0,0,0,0.25), 0px 5.43px 16.88px rgba(0,0,0,0.33), 0px 18px 56px rgba(0,0,0,0.50)"
            border="1px"
            borderColor="whiteAlpha.100"
            backdropFilter="blur(16px)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            {...boxProps}
        >
            <Text color="white" fontSize="xl">
                {direction === "prev" ? <ChevronleftLg /> : <ChevronrightLg />}
            </Text>
        </Box>
    );
}
