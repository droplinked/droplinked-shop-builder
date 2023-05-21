import { Box, HStack, VStack } from '@chakra-ui/react'
import BasicButton from 'common/BasicButton/BasicButton'
import AppInput from 'common/form/textbox/AppInput'
import AppModal from 'common/modal/AppModal'
import AppTypography from 'common/typography/AppTypography'
import { Form, Formik } from 'formik'
import { IcreateCollectionService, IupdateCollectionService } from 'lib/apis/collection/interfaces'
import { createCollectionService, updateCollectionService } from 'lib/apis/collection/services'
import AppErrors from 'lib/utils/statics/errors/errors'
import React, { useCallback } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import * as Yup from 'yup';

interface IProps {
    close: Function
    open: boolean
    collection?: any
    refetch: Function
}

interface Iform {
    title: string
}

function CollectionCreate({ close, open, collection, refetch }: IProps) {
    const createService = useMutation((params: IcreateCollectionService) => createCollectionService(params))
    const updateService = useMutation((params: IupdateCollectionService) => updateCollectionService(params))

    // submit form function
    const onSubmit = useCallback(async (data: Iform) => {
        try {
            const { title } = data
            if (collection) {
                await updateService.mutateAsync({ title, collectionID: collection._id })
                toast.success(AppErrors.collection.update_Collection_name)
            } else {
                await createService.mutateAsync({ title })
                toast.success(AppErrors.collection.create_Collection_name)
            }
            close()
            refetch()
        } catch (error) {
            toast.error("Oops! Something went wrong")
        }
    }, [collection])

    const formSchema = Yup.object().shape({
        title: Yup.string().required('Required'),
    });

    return (
        <AppModal close={close} open={open} size="2xl" contentProps={{ padding: "50px 30px" }}>
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
                            <Box textAlign={"center"}><AppTypography size='22px' weight='bolder'>Make Collection</AppTypography></Box>
                            <Box>
                                <AppTypography size='18px' textAlign={"center"}>
                                    After adding your product, visit the collection page to <AppTypography size='18px' weight='bolder' display={"inline-block"}>complete the collection creating process</AppTypography> and set the discount or gating rulesets
                                </AppTypography>
                            </Box>
                            <Box>
                                <AppInput
                                    name="name"
                                    value={values.title}
                                    onChange={(e: any) => setFieldValue("title", e.target.value)}
                                    isRequired
                                    label={"Collection name"}
                                    placeholder={"Collection name"}
                                    error={errors.title ? errors.title.toString() : ""}
                                />
                            </Box>
                            <HStack justifyContent={"space-between"}>
                                <Box><BasicButton variant='outline' onClick={() => close()}>Cancel</BasicButton></Box>
                                <Box><BasicButton type='submit' isLoading={createService.isLoading || updateService.isLoading}>Submit</BasicButton></Box>
                            </HStack>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </AppModal>
    )
}

export default CollectionCreate