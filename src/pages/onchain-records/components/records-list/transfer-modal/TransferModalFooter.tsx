import { Divider, Flex, ModalFooter, useTabsContext } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import React from 'react'

interface Props {
    onClose: () => void;
    handleSubmit: (selectedIndex: number) => void;
    isLoading: boolean;
}

export default function TransferModalFooter({ onClose, handleSubmit, isLoading }: Props) {
    const { selectedIndex } = useTabsContext()

    return (
        <>
            <Divider borderColor={"neutral.gray.800"} />
            <ModalFooter
                pt={{ base: "16px !important", md: "36px !important" }}
                display={"flex"}
                flexDirection="column"
                gap={4}
            >
                <Flex width="100%" justifyContent="space-between" gap={4}>
                    <Button
                        width={{ base: "25%", md: "max-content" }}
                        fontWeight={500}
                        onClick={onClose}
                        fontSize={14}
                        variant="secondary"
                        isDisabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        width={{ base: "70%", md: "max-content" }}
                        fontWeight={500}
                        onClick={() => handleSubmit(selectedIndex)}
                        fontSize={14}
                        isLoading={isLoading}
                    >
                        {selectedIndex === 1 ? "Upload" : "Validate"}
                    </Button>
                </Flex>
            </ModalFooter>
        </>
    )
}
