import { Flex, useDisclosure } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import AddBalanceModal from "components/redesign/add-balance-modal/AddBalanceModal";
import Button from "components/redesign/button/Button";
import React from "react";

interface Props {
    isLoading: boolean;
    handleRefetchData: () => void;
}

export const ActionButtons = ({ isLoading, handleRefetchData }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Flex
                flexDirection="row"
                gap={{ base: 4, md: 6 }}
                alignItems="center"
                width={{ base: "100%", md: "auto" }}
            >
                {/* <Button
                    flex={{ base: 1, md: "unset" }}
                    fontSize={14}
                    fontWeight={500}
                    variant="secondary"
                    leftIcon={<AppIcons.SendMoney />}
                    isLoading={isLoading}
                    width={{ base: "50%", md: "min-content" }}
                >
                    Withdraw
                </Button> */}
                <Button
                    flex={{ base: 1, md: "unset" }}
                    fontSize={14}
                    fontWeight={500}
                    leftIcon={<AppIcons.RecieveMoney />}
                    isLoading={isLoading}
                    width={{ base: "50%", md: "min-content" }}
                    onClick={onOpen}
                >
                    Add Credit
                </Button>
            </Flex>
            <AddBalanceModal isOpen={isOpen} onClose={onClose} handleRefetch={handleRefetchData} />
        </>
    );
};
