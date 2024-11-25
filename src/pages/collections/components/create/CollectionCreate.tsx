import { Box, Button, Flex, HStack, Image, VStack } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import BasicButton from 'components/redesign/BasicButton/BasicButton';
import ErrorLabel from 'components/common/form/errorLabel/errorLabel';
import AppInput from 'components/redesign/form/textbox/AppInput';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import AppUploadImage from 'components/redesign/image/AppUploadImage';
import { Form, Formik } from 'formik';
import useAppToast from 'functions/hooks/toast/useToast';
import { Collection, IcreateCollectionService, IupdateCollectionService } from 'lib/apis/collection/interfaces';
import { createCollectionService, updateCollectionService } from 'lib/apis/collection/services';
import { useCheckPermission } from 'lib/stores/app/appStore';
import AppErrors from 'lib/utils/statics/errors/errors';
import React, { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import AppTypography from 'components/common/typography/AppTypography';

interface IProps {
    close: () => void;
    open: boolean;
    collection?: Collection;
}

interface IForm {
    title: string;
    description?: string;
    image: string;
}

interface IFileData {
    title: string;
    size: string;
}

const CollectionCreate: React.FC<IProps> = ({ close, open, collection }) => {
    const queryClient = useQueryClient()
    const checkPermissionAndShowToast = useCheckPermission()
    const { showToast } = useAppToast()
    const createService = useMutation((params: IcreateCollectionService) => createCollectionService(params))
    const updateService = useMutation((params: IupdateCollectionService) => updateCollectionService(params))
    const [fileData, setFileData] = useState<IFileData>()
    const onSubmit = useCallback(
        async (data: IForm) => {
            try {
                const { title, description, image } = data
                if (collection) {
                    await updateService.mutateAsync({ title, collectionID: collection._id, description, image })
                    showToast({ message: AppErrors.collection.update_Collection_name, type: 'success' })
                }
                else {
                    if (!checkPermissionAndShowToast("collection_management")) return
                    await createService.mutateAsync({ title, description, image })
                    showToast({ message: AppErrors.collection.create_Collection_name, type: 'success' })
                }

                close()
                queryClient.invalidateQueries({ queryKey: ['collectionList'] })
            } catch (error) {
                showToast({ message: 'Oops! Something went wrong', type: 'error' })
            }
        },
        [collection, close, createService, showToast, updateService, checkPermissionAndShowToast]
    )

    const formSchema = Yup.object().shape({
        title: Yup.string().required('Please provide a name for the collection'),
        description: Yup.string(),
        image: Yup.string().required('Please provide an image for the collection')
    })

    return (
        <AppModal modalRootProps={{ isOpen: open, onClose: close, isCentered: false, size: "2xl" }} modalContentProps={{ background: "#141414", px: "0px", paddingInline: "0px", sx: { paddingInline: "0px", paddingBlock: "0px", paddingTop: "48px" } }}>
            <ModalHeaderData icon={<AppIcons.ReorderDesigned />}
                backgroundColor='#141414'
                modalHeaderProps={{ px: { lg: "48px !important", md: "32px !important", base: "16px !important" }, padding: "0px", paddingBlock: "0px" }}
                title={collection ? 'Edit Collection' : 'Create Collection'}
                description={collection ? 'Edit the details of your collection.' : 'Create a new collection by providing the necessary details.'}
            />
            <Formik
                initialValues={{
                    title: collection?.title || '',
                    description: collection?.description || '',
                    image: collection?.image || '',
                }}
                enableReinitialize
                validateOnChange={false}
                validationSchema={formSchema}
                onSubmit={onSubmit}
            >
                {({ errors, values, setFieldValue }) => (
                    <Form>
                        <VStack px={{ lg: "48px !important", md: "32px !important", base: "16px !important" }} pt={"48px"} backgroundColor={"#1E1E1E"} spacing={5} align="stretch" color="#FFF">
                            <Flex gap={8} flexDirection="column" width="100%">
                                <AppInput
                                    name="title"
                                    value={values.title}
                                    onChange={(e) => setFieldValue('title', e.target.value)}
                                    maxLength={40}
                                    label="Collection Name"
                                    description='Provide a title to the collection that will  be displayed to site visitors.'
                                    placeholder="e.g., StreamWave"
                                    isRequired={true}
                                    error={errors.title}
                                />
                                <AppInput
                                    name="description"
                                    value={values.description}
                                    onChange={(e) => setFieldValue('description', e.target.value)}
                                    maxLength={100}
                                    label="Description"
                                    placeholder="e.g., StreamWave"
                                    description='Provide the message to display to visitors.'
                                    error={errors.description}
                                />
                                <VStack width="100%">
                                    <Flex width={"100%"} direction="column" gap={"16px"}>
                                        <AppTypography fontSize={"16px"} fontWeight={500}>Collection Cover</AppTypography>
                                        <AppUploadImage setFileData={(data: IFileData) => setFileData(data)} onChange={(image: string) => setFieldValue('image', image)} values={values.image} size='original' accept={{ "image/png": [".png", ".jpeg", ".jpg"] }} />
                                        {errors.image && <ErrorLabel message={errors.image} />}
                                    </Flex>
                                    {values.image &&
                                        <HStack border={"1px solid #292929"} p={"12px"} borderRadius={"8px"} mt={"16px"} width={"100%"} justifyContent={"space-between"}>
                                            <Flex gap="16px" alignItems={"center"}>
                                                <Image height="56px" width="56px" src={values.image} objectFit="cover" borderRadius="4px" bgColor="black" />
                                                <VStack alignItems={"start"}>
                                                    <AppTypography>{fileData?.title?.substring(0, 30) ?? "Collection_Image"}...</AppTypography>
                                                    {fileData?.size && <AppTypography color={"#7B7B7B"} fontSize={"12px"}>{fileData?.size}</AppTypography>}
                                                </VStack>
                                            </Flex>
                                            <Box onClick={() => setFieldValue('image', '')} cursor={"pointer"}>
                                                <AppIcons.TrashRed />
                                            </Box>
                                        </HStack>
                                    }
                                </VStack>
                            </Flex>
                            <HStack borderTop={"1px solid #292929"} py={"2rem"} justifyContent="space-between">
                                <BasicButton background={"#292929"} variant='ghost' width={"79px"} >{collection ? 'Cancel' : 'Discard'}</BasicButton>
                                <BasicButton type="submit" width={"79px"} isLoading={createService.isLoading || updateService.isLoading}>
                                    {collection ? 'Edit' : 'Create'}
                                </BasicButton>
                            </HStack>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </AppModal>
    )
}

export default CollectionCreate