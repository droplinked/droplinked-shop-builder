import { Flex } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import Button from "components/redesign/button/Button";
import React from "react";

export const ActionButtons = () => {
    return (
        <Flex
            flexDirection={"row"}
            gap={{ base: 4, md: 6 }}
            alignItems="center"
            width={{ base: "100%", md: "auto" }}
        >
            <Button
                flex={{ base: 1, md: "unset" }}
                fontSize={14}
                fontWeight={500}
                leftIcon={<AppIcons.SendMoney />}
                width={{ base: "50%", md: "min-content" }}
            >
                Withdraw
            </Button>
            <Button
                flex={{ base: 1, md: "unset" }}
                fontSize={14}
                fontWeight={500}
                leftIcon={<AppIcons.RecieveMoney />}
                width={{ base: "50%", md: "min-content" }}
            >
                Add Credit
            </Button>
        </Flex>
    );
};
