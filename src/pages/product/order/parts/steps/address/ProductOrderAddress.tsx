import React, { useContext } from 'react'
import { Box, Flex, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import AddressModalModel from 'pages/register-pages/pages/shop-info/parts/address/modal/AddressModalModel';
import AppInput from 'components/common/form/textbox/AppInput';
import AppDropDown from 'components/common/form/dropdown/AppDropDown';
import { useMutation, useQuery } from 'react-query';
import { allCountriesService, citiesService, statesService } from 'lib/apis/address/addressServices';
import { IcitiesService, IcreateAddressService, IsatatesService } from 'lib/apis/address/interfaces';
import BasicButton from 'components/common/BasicButton/BasicButton';
import ProductOrderCard from '../../card/ProductOrderCard';
import productOrderContext from 'pages/product/order/context'
import useAppToast from 'functions/hooks/toast/useToast';
import { createSampleService } from 'lib/apis/order/services';
import { IcrateSampleService } from 'lib/apis/order/interfaces';

function ProductOrderAddress() {
    const { params: { skus, shipmentRates }, methods: { updateState } } = useContext(productOrderContext)
    const countryService = useQuery({
        queryFn: allCountriesService,
        queryKey: "allCountriesService",
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })
    const states = useMutation((params: IsatatesService) => statesService(params))
    const cities = useMutation((params: IcitiesService) => citiesService(params))
    const createSample = useMutation((params: IcrateSampleService) => createSampleService(params))
    const { showToast } = useAppToast()

    const getStates = ({ country_name }: IsatatesService) => states.mutate({ country_name })
    const getCities = ({ country_name, state_name }: IcitiesService) => cities.mutate({ state_name, country_name })

    const onSubmit = async (params: IcreateAddressService) => {
        try {
            if (!Object.keys(skus).length) throw Error('Please enter skues')
            const { data } = await createSample.mutateAsync({ address: params, skus: Object.values(skus) })
            updateState('shipmentRates', data?.data?.shipmentRates);

        } catch (error) {
            showToast({ type: 'error', message: error?.message })
        }
    }

    return (
        <ProductOrderCard title="Shipping Address">
            <Formik
                initialValues={{
                    ...{} as IcreateAddressService,
                    addressType: 'SHOP'
                }}
                enableReinitialize
                validateOnChange={false}
                validationSchema={AddressModalModel.formSchema()}
                onSubmit={onSubmit}
            >
                {({ errors, values, setFieldValue }) => (
                    <Form>
                        <VStack align={"stretch"} spacing={8}>
                            <Flex gap={7}>
                                <Box width={"50%"}>
                                    <AppInput name='First name' value={values.firstName} onChange={(e: any) => setFieldValue('firstName', e.target.value)} label='First Name' isRequired />
                                </Box>
                                <Box width={"50%"}>
                                    <AppInput name='Last name' value={values.lastName} onChange={(e: any) => setFieldValue('lastName', e.target.value)} label='Last Name' isRequired />
                                </Box>
                            </Flex>
                            <Box>
                                <AppInput name='address' value={values.addressLine1} error={errors.addressLine1} onChange={(e: any) => setFieldValue('addressLine1', e.target.value)} label='Address line 1' isRequired />
                            </Box>
                            <Box>
                                <AppInput name='address' value={values.addressLine2} error={errors.addressLine2} onChange={(e: any) => setFieldValue('addressLine2', e.target.value)} label='Address line 2' />
                            </Box>
                            <Flex gap={7}>
                                <Box width={"50%"}>
                                    <AppDropDown
                                        label={"Country"}
                                        name="Country"
                                        {...values.country && { value: { label: values.country, value: values.country } }}
                                        isRequired
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
                                        loading={states.isLoading ? !states.isLoading : true}
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
                                        loading={cities.isLoading ? !cities.isLoading : true}
                                        error={errors.city}
                                        options={cities.data?.data?.data?.cities ? cities.data?.data?.data?.cities.map(el => ({ value: el.name, label: el.name })) : [{ value: values.city, label: values.city }]}
                                        onChange={(e: any) => setFieldValue("city", e.value)}
                                    />
                                </Box>
                                <Box width={"50%"}>
                                    <AppInput name='zipcode' value={values.zip} error={errors.zip} onChange={(e: any) => setFieldValue('zip', e.target.value)} label='Zip Code' isRequired />
                                </Box>
                            </Flex>
                            {!shipmentRates && !Object.keys(shipmentRates).length ? (
                                <Flex flexDirection="row-reverse">
                                    <BasicButton type='submit' isLoading={createSample.isLoading}>Next</BasicButton>
                                </Flex>
                            ) : null}
                        </VStack>
                    </Form>
                )}
            </Formik>
        </ProductOrderCard>
    )
}

export default ProductOrderAddress