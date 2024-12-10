import { Flex, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import useAppToast from 'functions/hooks/toast/useToast';
import { Collection } from 'lib/apis/collection/interfaces';
import { createCollectionService, updateCollectionService } from 'lib/apis/collection/services';
import { useCheckPermission } from 'lib/stores/app/appStore';
import AppErrors from 'lib/utils/statics/errors/errors';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { collectionCreateInputFields } from './formConfigs';
import { collectionCreateSchema } from './formConfigs';
import ModalWrapper from './_components/ModalWrapper';
import { ICollectionForm } from './interface/interfaces';
import ImageUploader from './_components/ImageUploader';
import ModalButtons from './_components/ModalButtons';
import Textarea from 'components/redesign/textarea/Textarea';
import Input from 'components/redesign/input/Input';

interface IProps {
    close: () => void;
    open: boolean;
    collection?: Collection;
}

const CollectionCreate: React.FC<IProps> = ({ close, open, collection }) => {
    const queryClient = useQueryClient();
    const checkPermissionAndShowToast = useCheckPermission();
    const { showToast } = useAppToast();
    const createService = useMutation(createCollectionService);
    const updateService = useMutation(updateCollectionService);

    const onSubmit = async (data: ICollectionForm) => {
        try {
            const { title, description, image } = data;
            if (collection) {
                await updateService.mutateAsync({ title, collectionID: collection._id, description, image });
                showToast({ message: AppErrors.collection.update_Collection_name, type: 'success' });
            } else {
                if (!checkPermissionAndShowToast("collection_management")) return;
                await createService.mutateAsync({ title, description, image });
                showToast({ message: AppErrors.collection.create_Collection_name, type: 'success' });
            }
            close();
            queryClient.invalidateQueries({ queryKey: ['collectionList'] });
        } catch (error) {
            showToast({ message: 'Oops! Something went wrong', type: 'error' });
        }
    };

    return (
        <ModalWrapper isOpen={open} onClose={close} collection={collection}>
            <Formik
                initialValues={{
                    title: collection?.title || '',
                    description: collection?.description || '',
                    image: collection?.image || '',
                }}
                enableReinitialize
                validateOnChange={false}
                validationSchema={collectionCreateSchema}
                onSubmit={onSubmit}
            >
                {({ errors, values, setFieldValue }) => (
                    <Form>
                        <VStack px={{ lg: "48px !important", md: "32px !important", base: "16px !important" }} pt={"48px"} backgroundColor={"#1E1E1E"} spacing={5} align="stretch" color="#FFF">
                            <Flex gap={8} flexDirection="column" width="100%">
                                {collectionCreateInputFields.map((field) => (
                                    !field?.rows ?
                                        <Input
                                            inputProps={{
                                                name: field.name,
                                                value: values[field.name],
                                                onChange: (e) => setFieldValue(field.name, e.target.value),
                                                maxLength: field.maxLength,
                                                placeholder: field.placeholder,
                                                isRequired: field.isRequired,
                                            }}
                                            key={field.name}
                                            label={field.label}
                                            description={field.description}
                                            error={errors[field.name]}
                                        /> : <Textarea
                                            textareaProps={{
                                                name: field.name,
                                                value: values[field.name],
                                                onChange: (e) => setFieldValue(field.name, e.target.value),
                                                maxLength: field.maxLength,
                                                placeholder: field.placeholder,
                                                isRequired: field.isRequired,
                                            }}
                                            key={field.name}
                                            label={field.label}
                                            description={field.description}
                                            error={errors[field.name]}
                                        />
                                ))}
                                <ImageUploader errors={errors} setFieldValue={setFieldValue} values={values} />
                                <ModalButtons collection={collection} createService={createService} updateService={updateService} close={close} />
                            </Flex>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    );
};

export default CollectionCreate;