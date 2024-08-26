import { Box, Flex, HStack, Image, VStack } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppInput from 'components/common/form/textbox/AppInput';
import AppModal from 'components/common/modal/AppModal';
import AppUploadImage from 'components/common/upload/image/AppUploadImage';
import { Form, Formik } from 'formik';
import useAppToast from 'functions/hooks/toast/useToast';
import { Collection, IcreateCollectionService, IupdateCollectionService } from 'lib/apis/collection/interfaces';
import { createCollectionService, updateCollectionService } from 'lib/apis/collection/services';
import { useCheckPermission } from 'lib/stores/app/appStore';
import AppErrors from 'lib/utils/statics/errors/errors';
import React, { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';

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

const CollectionCreate: React.FC<IProps> = ({ close, open, collection }) => {
    const queryClient = useQueryClient()
    const checkPermissionAndShowToast = useCheckPermission()
    const { showToast } = useAppToast()
    const createService = useMutation((params: IcreateCollectionService) => createCollectionService(params))
    const updateService = useMutation((params: IupdateCollectionService) => updateCollectionService(params))

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
        title: Yup.string().required('Name is required'),
        description: Yup.string(),
        image: Yup.string()
    })

    return (
        <AppModal close={close} open={open} size="2xl" title={collection ? 'Edit Collection' : 'Create Collection'}>
            <Formik
                initialValues={{
                    title: collection?.title || '',
                    description: collection?.description || '',
                    image: collection?.image || '',
                }}
                enableReinitialize
                validationSchema={formSchema}
                onSubmit={onSubmit}
            >
                {({ errors, values, setFieldValue }) => (
                    <Form>
                        <VStack spacing={5} align="stretch" color="#FFF">
                            <Flex gap={8} flexDirection="column" width="100%">
                                <AppInput
                                    name="title"
                                    value={values.title}
                                    onChange={(e) => setFieldValue('title', e.target.value)}
                                    maxLength={40}
                                    label="Name"
                                    placeholder="Collection 1"
                                    error={errors.title}
                                />
                                <AppInput
                                    name="description"
                                    value={values.description}
                                    onChange={(e) => setFieldValue('description', e.target.value)}
                                    maxLength={100}
                                    label="Description"
                                    placeholder="Describe collection"
                                    error={errors.description}
                                />
                                <Flex width="100%">
                                    {!values.image ?
                                        <Flex direction="column" gap={3} width="100%">
                                            <AppUploadImage onChange={(image: string) => setFieldValue('image', image)} values={values.image} mode="single" size="original" />
                                        </Flex>
                                        :
                                        <Box position="relative">
                                            <Box position="absolute" right="12px" top="12px" cursor="pointer" onClick={() => setFieldValue('image', '')}>
                                                <AppIcons.CloseRed />
                                            </Box>
                                            <Image height="157px" width="157px" src={values.image} objectFit="cover" borderRadius="4px" bgColor="black" />
                                        </Box>
                                    }
                                </Flex>
                            </Flex>
                            <HStack justifyContent="space-between">
                                <Box>
                                    <BasicButton variant="outline" onClick={close}>
                                        Cancel
                                    </BasicButton>
                                </Box>
                                <Box>
                                    <BasicButton type="submit" isLoading={createService.isLoading || updateService.isLoading}>
                                        {collection ? 'Edit' : 'Create'}
                                    </BasicButton>
                                </Box>
                            </HStack>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </AppModal>
    )
}

export default CollectionCreate