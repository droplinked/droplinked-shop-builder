import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import InputFieldComponent from 'components/shared/input-field-component/InputFieldComponent'
import ModalWrapper from 'modals/modal-wrapper/ModalWrapper'
import React, { useState } from 'react'
import roundedQuestionMark from "assest/icon/rounded-question-mark-icon.svg";
import BasicButton from 'components/shared/BasicButton/BasicButton';
import { useMutation } from 'react-query';
import { createCollectionService } from 'lib/apis/collection/services';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchCollection } from 'lib/store/features/product/collection';

function ModalCollection({ open, close }) {
    const [Name, setName] = useState("")
    const { mutate, isLoading } = useMutation((params) => createCollectionService(params))
    const dispatch = useDispatch()

    const CreateCollection = () => {
        if (!Name.length) return toast.error("Please enter collection name")

        mutate(
            {
                title: Name
            },
            {
                onSuccess: () => {
                    toast.success("Collection created")
                    dispatch(fetchCollection()) // fetch and update collection from service
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
                    <Box width={"30%"}><BasicButton width="100%" size="md" cancelType onClick={close}>Cancel</BasicButton></Box>
                    <Box width={"30%"}><BasicButton width="100%" size="md" loading={isLoading} onClick={CreateCollection}>Save</BasicButton></Box>
                </HStack>
            </VStack>
        </ModalWrapper>
    )
}

export default ModalCollection