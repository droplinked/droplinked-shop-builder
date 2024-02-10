import { Flex, useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import FormModel from 'components/common/form/FormModel'
import AppInput from 'components/common/form/textbox/AppInput'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useState } from 'react'
import ConfirmationModal from './parts/confirmation-modal/ConfirmationModal'
import DNSInformationModal from './parts/dns-information-modal/DNSInformationModal'

function StoreInformation() {
    const [storeName, setStoreName] = useState("")
    const [customURL, setCustomURL] = useState("")
    const confirmationModal = useDisclosure()

    return (
        <>
            <Flex direction={"column"} gap={"36px"}>
                <AppTypography fontSize='18px' fontWeight='bold'>Store Information</AppTypography>

                <Flex direction={"column"} gap={"12px"}>
                    <FieldLabel label='Store Name' isRequired />
                    <Flex direction={"column"} gap={"4px"}>
                        <Flex
                            alignItems={"center"}
                            backgroundColor={FormModel.baseStyleProps().backgroundColor}
                            paddingRight={"7.5px"}>
                            <AppInput
                                name='storeName'
                                value={storeName}
                                placeholder='e.g., droplinked'
                                isRequired
                                onChange={(e) => setStoreName(e.currentTarget.value)}
                            />
                        </Flex>
                        <AppTypography fontSize="14px" fontWeight={500} color="#808080">Enter your store name. (max 20 characters)</AppTypography>
                    </Flex>
                </Flex>

                <Flex direction={"column"} gap={"12px"}>
                    <FieldLabel label='Store URL' isRequired />
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <AppTypography fontSize='16px' color={"#C2C2C2"}>https://droplinked.io/[username]</AppTypography>
                        <ClipboardText text="https://droplinked.io/" />
                    </Flex>
                </Flex>

                <Flex direction={"column"} gap={"12px"}>
                    <AppTypography fontSize='16px' fontWeight={500} color={"#C2C2C2"}>Custom URL</AppTypography>
                    <Flex direction={"column"} gap={"4px"}>
                        <AppTypography fontSize="14px" fontWeight={500} color="#808080">
                            Enter your domain without “www.” and then add the provided DNS to your domain settings.
                        </AppTypography>
                        <Flex
                            alignItems={"center"}
                            backgroundColor={FormModel.baseStyleProps().backgroundColor}
                            paddingRight={"7.5px"}>
                            <AppInput
                                name='customURL'
                                value={customURL}
                                placeholder='Domain.com'
                                isRequired
                                onChange={(e) => setCustomURL(e.currentTarget.value)}
                            />
                            <BasicButton
                                sizes='medium'
                                isDisabled={!customURL}
                                onClick={confirmationModal.onOpen}
                            >
                                Save
                            </BasicButton>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex >

            {confirmationModal.isOpen && <ConfirmationModal isOpen={confirmationModal.isOpen} close={confirmationModal.onClose} />}

        </>
    )
}

export default StoreInformation