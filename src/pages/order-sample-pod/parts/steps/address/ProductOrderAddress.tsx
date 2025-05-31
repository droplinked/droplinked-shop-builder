import { Box, Flex } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppDropDown from 'components/common/form/dropdown/AppDropDown';
import AppInput from 'components/common/form/textbox/AppInput';
import { Form, Formik } from 'formik';
import useAppToast from 'hooks/toast/useToast';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { allCountriesService, citiesService, statesService } from 'services/address/addressServices';
import { IcitiesService, IcreateAddressService, IsatatesService } from 'services/address/interfaces';
import { IcrateSampleService } from 'services/order/interfaces';
import { createSampleService } from 'services/order/services';
import productOrderContext from 'pages/order-sample-pod/context';
import AddressModalModel from './AddressModalModel';
import React, { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import ProductOrderCard from '../../card/ProductOrderCard';

function ProductOrderAddress() {
    const { params: { skus, shipmentRates }, methods: { updateState } } = useContext(productOrderContext)
    const countryService = useQuery({
        queryFn: allCountriesService,
        queryKey: "allCountriesService",
        cacheTime: 60 * 60 * 1000,
    })
    const states = useMutation((params: IsatatesService) => statesService(params))
    const cities = useMutation((params: IcitiesService) => citiesService(params))
    const createSample = useMutation((params: IcrateSampleService) => createSampleService(params))
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("orderSamplePOD")

    const getStates = ({ country_name }: IsatatesService) => states.mutate({ country_name })
    const getCities = ({ country_name, state_name }: IcitiesService) => cities.mutate({ state_name, country_name })

    const onSubmit = async (params: IcreateAddressService) => {
        try {
            if (!Object.keys(skus).length) throw Error('Please select a sku')
            const { data } = await createSample.mutateAsync({ address: params, skus: Object.values(skus) })
            updateState('orderId', data.data._id);
            updateState('taxAmount', data.data.taxAmount);
            updateState('shipmentRates', data.data.shipmentRates);
        } catch (error) {
            showToast({ type: 'error', message: error?.response?.data?.data?.message || error?.message || 'An error occurred' })
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
                validationSchema={AddressModalModel.formSchema(t)}
                onSubmit={onSubmit}
            >
                {({ errors, values, setFieldValue }) => (
                    <Form>
                        <Flex direction={"column"} gap={6}>
                            <Flex gap={6}>
                                <Box width={"50%"}>
                                    <AppInput name='First name' value={values.firstName} onChange={(e: any) => setFieldValue('firstName', e.target.value)} label={t("address.firstName")} isRequired />
                                </Box>
                                <Box width={"50%"}>
                                    <AppInput name='Last name' value={values.lastName} onChange={(e: any) => setFieldValue('lastName', e.target.value)} label={t("address.lastName")} isRequired />
                                </Box>
                            </Flex>
                            <Box>
                                <AppInput name='address' value={values.addressLine1} error={errors.addressLine1} onChange={(e: any) => setFieldValue('addressLine1', e.target.value)} label={t("address.addressLine1")} isRequired />
                            </Box>
                            <Box>
                                <AppInput name='address' value={values.addressLine2} error={errors.addressLine2} onChange={(e: any) => setFieldValue('addressLine2', e.target.value)} label={t("address.addressLine2")} />
                            </Box>
                            <Flex gap={6}>
                                <Box width={"50%"}>
                                    <AppDropDown
                                        label={t("address.country")}
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
                                        label={t("address.state")}
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
                            <Flex gap={6}>
                                <Box width={"50%"}>
                                    <AppDropDown
                                        label={t("address.city")}
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
                                    <AppInput name='zipcode' value={values.zip} error={errors.zip} onChange={(e: any) => setFieldValue('zip', e.target.value)} label={t("address.zip")} isRequired />
                                </Box>
                            </Flex>
                            {!Object.keys(shipmentRates).length ? (
                                <Flex flexDirection="row-reverse">
                                    <BasicButton type='submit' isLoading={createSample.isLoading}>{t("address.next")}</BasicButton>
                                </Flex>
                            ) : null}
                        </Flex>
                    </Form>
                )}
            </Formik>
        </ProductOrderCard>
    )
}

export default ProductOrderAddress