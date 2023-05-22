import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import InputFieldComponent from 'common/input-field-component/InputFieldComponent'
import ModalWrapper from 'modals/modal-wrapper/ModalWrapper'
import React, { useState } from 'react'
import roundedQuestionMark from "assest/icon/rounded-question-mark-icon.svg";
import BasicButton from 'common/BasicButton/BasicButton';
import { useMutation } from 'react-query';
import { createCollectionService } from 'lib/apis/collection/services';
import useAppToast from 'hooks/toast/useToast';

function ModalCollection({ open, close }) {
    const [Name, setName] = useState("")
    const { mutate, isLoading } = useMutation((params) => createCollectionService(params))
    const { showToast } = useAppToast()

    const CreateCollection = () => {
        if (!Name.length) return showToast("Please enter collection name", "error")

        mutate(
            {
                title: Name
            },
            {
                onSuccess: () => {
                    showToast("Collection created", "success")
                    close()
                }
            }
        )
    }

    return (
        <ModalWrapper show={open} close={close}>
            <VStack align={"stretch"} spacing={8}>
                <Text color="lightGray" fontWeight="700" fontSize="18px" textAlign="center">Make Collection</Text>
                <InputFieldComponent
                    label="Name"
                    placeholder="default collection"
                    value={Name}
                    change={(e) => setName(e.target.value)}
                />
                <HStack>
                    <Box><Image src={roundedQuestionMark} /></Box>
                    <Box>
                        <Text color="#808080">
                            complete the details about your collection on the collections page
                        </Text>
                    </Box>
                </HStack>
                <HStack justifyContent="space-between">
                    <Box width={"30%"}><BasicButton width="100%" sizes="medium" variant='outline' onClick={close}>Cancel</BasicButton></Box>
                    <Box width={"30%"}><BasicButton width="100%" sizes="medium" isLoading={isLoading} onClick={CreateCollection}>Save</BasicButton></Box>
                </HStack>
            </VStack>
        </ModalWrapper>
    )
}

export default ModalCollection