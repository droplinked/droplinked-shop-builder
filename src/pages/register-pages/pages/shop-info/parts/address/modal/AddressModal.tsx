import { Box, Flex, VStack } from '@chakra-ui/react';
import BasicButton from 'common/BasicButton/BasicButton';
import AppDropDown from 'common/form/dropdown/AppDropDown';
import AppInput from 'common/form/textbox/AppInput';
import AppModal, { IAppModal } from 'common/modal/AppModal'
import AppTypography from 'common/typography/AppTypography';
import { Form, Formik } from 'formik'
import { useProfile } from 'hooks/useProfile/useProfile';
import { addressByIdService, createAddressService, updateAddressService } from 'lib/apis/address/addressServices';
import { IaddressByIdService, IcreateAddressService, IupdateAddressService } from 'lib/apis/address/interfaces';
import { countries_statics } from 'lib/utils/statics/countries';
import React, { useCallback, useEffect } from 'react'
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import AddressModalModel from './AddressModalModel';

interface Iprops extends IAppModal {
    addressID?: string
    onSuccess?: Function
}

function AddressModal({ close, open, addressID, onSuccess }: Iprops) {
    const fetchService = useMutation((params: IaddressByIdService) => addressByIdService(params))
    const createService = useMutation((params: IcreateAddressService) => createAddressService(params))
    const updateService = useMutation((params: IupdateAddressService) => updateAddressService(params))
    const address = fetchService.data ? fetchService.data.data?.data : null
    const { updateShopData } = useProfile()
    const { initialValues, formSchema } = AddressModalModel
    const loading = !Boolean(addressID && fetchService.isLoading)
    

    const onSubmit = useCallback(async (params: IcreateAddressService) => {
        try {
            if (addressID) {
                await updateService.mutateAsync({ addressID, params })
            } else {
                await createService.mutateAsync(params)
            }
            if (onSuccess) onSuccess()
            updateShopData()
            toast.success("Address create")
            close()
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }, [onSuccess, addressID])

    // Fetch address by ID
    useEffect(() => addressID && fetchService.mutate({ addressID }), [addressID, open])

    return (
        <AppModal close={close} open={open} contentProps={{ padding: 8 }} size="2xl">
            <>
                <Formik
                    initialValues={initialValues({ address })}
                    enableReinitialize
                    validateOnChange={false}
                    validationSchema={formSchema()}
                    onSubmit={onSubmit}
                >
                    {({ errors, values, setFieldValue }) => (
                        <Form>
                            <VStack align={"stretch"} spacing={8}>
                                <Flex justifyContent={"center"}>
                                    <AppTypography size='18px' color={"#FFF"} weight='bolder'>Address Information</AppTypography>
                                </Flex>
                                <Box>
                                    <AppInput loading={loading} name='address' value={values.addressLine1} error={errors.addressLine1} onChange={(e: any) => setFieldValue('addressLine1', e.target.value)} label='Address line 1' isRequired />
                                </Box>
                                <Box>
                                    <AppInput loading={loading} name='address' value={values.addressLine2} error={errors.addressLine2} onChange={(e: any) => setFieldValue('addressLine2', e.target.value)} label='Address line 2' />
                                </Box>
                                <Flex gap={7}>
                                    <Box width={"50%"}>
                                        <AppDropDown
                                            label={"Country"}
                                            name="Country"
                                            {...values.country && { value: { label: values.country, value: values.country } }}
                                            isRequired
                                            loading={loading}
                                            error={errors.country}
                                            options={countries_statics}
                                            onChange={(e: any) => setFieldValue("country", e.value)}
                                        />
                                    </Box>
                                    <Box width={"50%"}>
                                        <AppInput loading={loading} name='state' value={values.state} error={errors.state} onChange={(e: any) => setFieldValue('state', e.target.value)} label='State' isRequired />
                                    </Box>
                                </Flex>
                                <Flex gap={7}>
                                    <Box width={"50%"}>
                                        <AppInput loading={loading} name='city' value={values.city} error={errors.city} onChange={(e: any) => setFieldValue('city', e.target.value)} label='City' isRequired />
                                    </Box>
                                    <Box width={"50%"}>
                                        <AppInput loading={loading} name='zipcode' value={values.zip} error={errors.zip} onChange={(e: any) => setFieldValue('zip', e.target.value)} label='Zip Code' isRequired />
                                    </Box>
                                </Flex>
                                <Flex gap={7}>
                                    <Box width={"50%"}>
                                        <AppInput loading={loading} name='fistname' value={values.firstName} onChange={(e: any) => setFieldValue('firstName', e.target.value)} label='First Name' isRequired />
                                    </Box>
                                    <Box width={"50%"}>
                                        <AppInput loading={loading} name='lastname' value={values.lastName} onChange={(e: any) => setFieldValue('lastName', e.target.value)} label='Last Name' isRequired />
                                    </Box>
                                </Flex>
                                <Flex gap={7}>
                                    <Box width={"50%"}>
                                        <BasicButton onClick={close} variant='outline'>Discard</BasicButton>
                                    </Box>
                                    <Box width={"50%"} textAlign="right">
                                        <BasicButton type='submit' isLoading={createService.isLoading || updateService.isLoading}>Save</BasicButton>
                                    </Box>
                                </Flex>
                            </VStack>
                        </Form>
                    )}
                </Formik>
            </>
        </AppModal>
    )
}

export default AddressModal