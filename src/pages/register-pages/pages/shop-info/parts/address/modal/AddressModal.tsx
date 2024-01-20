import { Box, Flex, VStack } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppDropDown from 'components/common/form/dropdown/AppDropDown';
import AppInput from 'components/common/form/textbox/AppInput';
import AppModal, { IAppModal } from 'components/common/modal/AppModal'
import { Form, Formik } from 'formik'
import useAppToast from 'functions/hooks/toast/useToast';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import { addressByIdService, allCountriesService, citiesService, createAddressService, statesService, updateAddressService } from 'lib/apis/address/addressServices';
import { IaddressByIdService, IcitiesService, IcreateAddressService, IsatatesService, IupdateAddressService } from 'lib/apis/address/interfaces';
import AppErrors from 'lib/utils/statics/errors/errors';
import React, { useCallback, useEffect } from 'react'
import { useMutation } from 'react-query';
import AddressModalModel from './AddressModalModel';

interface Iprops extends IAppModal {
    addressID?: string
    onSuccess?: Function
}

function AddressModal({ close, open, addressID, onSuccess }: Iprops) {
    const fetchService = useMutation((params: IaddressByIdService) => addressByIdService(params))
    const createService = useMutation((params: IcreateAddressService) => createAddressService(params))
    const updateService = useMutation((params: IupdateAddressService) => updateAddressService(params))
    const countryService = useMutation(() => allCountriesService())
    const states = useMutation((params: IsatatesService) => statesService(params))
    const cities = useMutation((params: IcitiesService) => citiesService(params))
    const address = fetchService.data ? fetchService.data.data?.data : null
    const { updateShopData } = useProfile()
    const { initialValues, formSchema } = AddressModalModel
    const loading = !Boolean(addressID && fetchService.isLoading)
    const { showToast } = useAppToast()

    const onSubmit = useCallback(async (params: IcreateAddressService) => {
        try {
            if (addressID) await updateService.mutateAsync({ addressID, params })
            else await createService.mutateAsync(params)

            if (onSuccess) onSuccess()
            updateShopData()
            showToast(addressID ? AppErrors.store.store_address__been_updated : AppErrors.store.store_address_added_successfully, "success")
            close()
        } catch (error) {
            const err = error?.response?.data
            showToast(err && err?.statusCode && err?.statusCode === 422 ? "Cant verify address" : "Oops! Something went wrong", "error");
        }
    }, [onSuccess, addressID])

    // Fetch address by ID
    useEffect(() => {
        if (addressID) {
            fetchService.mutate({ addressID }, {
                onSuccess: (res) => {
                    const data = res?.data?.data
                    getStates({ country_name: data?.country })
                    getCities({ country_name: data?.country, state_name: data?.state })
                }
            })

        }
    }, [addressID, open])

    useEffect(() => countryService.mutate(), [])

    const getStates = useCallback(({ country_name }: IsatatesService) => states.mutate({ country_name }), [])
    const getCities = useCallback(({ country_name, state_name }: IcitiesService) => cities.mutate({ state_name, country_name }), [])

    return (
        <AppModal close={close} title="Address Information" open={open} contentProps={{ padding: 8 }} size="2xl">
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
                                            options={countryService.data?.data?.data?.countries ? countryService.data?.data?.data?.countries.map(el => ({ value: el.name, label: el.name })) : []}
                                            onChange={(e: any) => {
                                                setFieldValue("country", e.value)
                                                setFieldValue("state", null)
                                                setFieldValue("city", null)
                                                getStates({ country_name: e.value })
                                            }}
                                        />
                                    </Box>
                                    <Box width={"50%"}>
                                        <AppDropDown
                                            label={"State"}
                                            name="State"
                                            {...values.state && { value: { label: values.state, value: values.state } }}
                                            isRequired
                                            loading={states.isLoading ? !states.isLoading : loading}
                                            error={errors.state}
                                            options={states.data?.data?.data?.states ? states.data?.data?.data?.states.map(el => ({ value: el.name, label: el.name })) : [{ value: values.state, label: values.state }]}
                                            onChange={(e: any) => {
                                                setFieldValue("state", e.value)
                                                setFieldValue("city", null)
                                                getCities({ country_name: values.country, state_name: e.value })
                                            }}
                                        />
                                    </Box>
                                </Flex>
                                <Flex gap={7}>
                                    <Box width={"50%"}>
                                        <AppDropDown
                                            label={"City"}
                                            name="city"
                                            {...values.city && { value: { label: values.city, value: values.city } }}
                                            isRequired
                                            loading={cities.isLoading ? !cities.isLoading : loading}
                                            error={errors.city}
                                            options={cities.data?.data?.data?.cities ? cities.data?.data?.data?.cities.map(el => ({ value: el.name, label: el.name })) : [{ value: values.city, label: values.city }]}
                                            onChange={(e: any) => setFieldValue("city", e.value)}
                                        />
                                    </Box>
                                    <Box width={"50%"}>
                                        <AppInput loading={loading} name='zipcode' value={values.zip} error={errors.zip} onChange={(e: any) => setFieldValue('zip', e.target.value)} label='Zip Code' isRequired />
                                    </Box>
                                </Flex>
                                <Flex gap={7}>
                                    <Box width={"50%"}>
                                        <AppInput loading={loading} name='First name' value={values.firstName} onChange={(e: any) => setFieldValue('firstName', e.target.value)} label='First Name' isRequired />
                                    </Box>
                                    <Box width={"50%"}>
                                        <AppInput loading={loading} name='Last name' value={values.lastName} onChange={(e: any) => setFieldValue('lastName', e.target.value)} label='Last Name' isRequired />
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