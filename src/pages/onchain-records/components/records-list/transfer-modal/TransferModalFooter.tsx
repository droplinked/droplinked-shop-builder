import { Divider, Flex, ModalFooter, useTabsContext } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

interface Props {
    onClose: () => void
    handleSubmit: (selectedIndex: number) => void
    isLoading: boolean
}

export default function TransferModalFooter({ onClose, handleSubmit, isLoading }: Props) {
    const { t } = useLocaleResources("onchainRecords")
    const { selectedIndex } = useTabsContext()

    return (
        <>
            <Divider borderColor="neutral.gray.800" />
            <ModalFooter
                pt={{ base: "16px !important", md: "36px !important" }}
                display="flex"
                flexDirection="column"
                gap={4}
            >
                <Flex width="100%" justifyContent="space-between" gap={4}>
                    <AppButton
                        width={{ base: "25%", md: "max-content" }}
                        onClick={onClose}
                        variant="secondary"
                        isDisabled={isLoading}
                    >
                        {t("cancel")}
                    </AppButton>
                    <AppButton
                        width={{ base: "70%", md: "max-content" }}
                        onClick={() => handleSubmit(selectedIndex)}
                        isLoading={isLoading}
                    >
                        {selectedIndex === 1 ? t("TransferModalFooter.upload") : t("TransferModalFooter.validate")}
                    </AppButton>
                </Flex>
            </ModalFooter>
        </>
    )
}

