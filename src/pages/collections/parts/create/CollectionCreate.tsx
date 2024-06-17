import { Box, HStack, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppInput from 'components/common/form/textbox/AppInput'
import AppModal from 'components/common/modal/AppModal'
import { Form, Formik } from 'formik'
import useAppToast from 'functions/hooks/toast/useToast'
import { IcreateCollectionService, IupdateCollectionService } from 'lib/apis/collection/interfaces'
import { createCollectionService, updateCollectionService } from 'lib/apis/collection/services'
import { useCheckPermission } from 'lib/stores/app/appStore'
import AppErrors from 'lib/utils/statics/errors/errors'
import React, { useCallback } from 'react'
import { useMutation } from 'react-query'
import * as Yup from 'yup'

interface IProps {
    close: () => void;
    open: boolean;
    collection?: any;
    refetch: () => void;
}

interface Iform {
    title: string
}

function CollectionCreate({ close, open, collection, refetch }: IProps) {
    const checkPermissionAndShowToast = useCheckPermission()
    const createService = useMutation((params: IcreateCollectionService) => createCollectionService(params))
    const updateService = useMutation((params: IupdateCollectionService) => updateCollectionService(params))
    const { showToast } = useAppToast()

    const onSubmit = useCallback(async (data: Iform) => {
        try {
            const { title } = data
            if (collection) {
                await updateService.mutateAsync({ title, collectionID: collection._id })
                showToast({ message: AppErrors.collection.update_Collection_name, type: "success" })
            } else {
                if (!checkPermissionAndShowToast("collection_management")) return
                await createService.mutateAsync({ title })
                showToast({ message: AppErrors.collection.create_Collection_name, type: "success" })
            }
            close()
            refetch()
        } catch (error) {
            showToast({ message: "Oops! Something went wrong", type: "error" })
        }
    }, [collection])

    const formSchema = Yup.object().shape({
        title: Yup.string().required('Required'),
    });

    return (
        <AppModal close={close} open={open} size="2xl" title={collection ? "Edit Collection" : "Create Collection"} contentProps={{ padding: "50px 30px" }}>
            <Formik
                initialValues={{
                    title: collection ? collection.title : '',
                }}
                enableReinitialize
                validateOnChange={false}
                validationSchema={formSchema}
                onSubmit={onSubmit}
            >
                {({ errors, values, setFieldValue }) => (
                    <Form>
                        <VStack spacing={5} align={"stretch"} color="#FFF">
                            <Box>
                                <AppInput
                                    name="name"
                                    value={values.title}
                                    onChange={(e: any) => setFieldValue("title", e.target.value)}
                                    isRequired
                                    maxLength={40}
                                    label="Collection Title"
                                    placeholder="Summer Collection"
                                    error={errors.title ? errors.title.toString() : ""}
                                />
                            </Box>
                            <HStack justifyContent={"space-between"}>
                                <Box><BasicButton variant='outline' onClick={() => close()}>Cancel</BasicButton></Box>
                                <Box><BasicButton type='submit' isLoading={createService.isLoading || updateService.isLoading}>{collection ? "Edit" : "Create"}</BasicButton></Box>
                            </HStack>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </AppModal>
    )
}

export default CollectionCreate