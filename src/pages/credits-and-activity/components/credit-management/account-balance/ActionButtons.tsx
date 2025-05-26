import { Flex, useDisclosure } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import AddBalanceModal from "components/redesign/add-balance-modal/AddBalanceModal"
import AppButton from "components/redesign/button/AppButton"
import React from "react"

interface Props {
    isLoading: boolean
    handleRefetchData: () => void
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
                <AppButton
                    width={{ base: "50%", md: "min-content" }}
                    flex={{ base: 1, md: "unset" }}
                    leftIcon={<AppIcons.RecieveMoney />}
                    isLoading={isLoading}
                    onClick={onOpen}
                >
                    Add Credit
                </AppButton>
            </Flex>
            <AddBalanceModal isOpen={isOpen} onClose={onClose} handleRefetch={handleRefetchData} />
        </>
    )
}
