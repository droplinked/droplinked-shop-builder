import { Box, HStack, VStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import React, { useCallback, useContext, useEffect, useMemo } from 'react'
import VariantMakeForm from './parts/container'
import { toast } from 'react-toastify'
import VariantsFormModel from './model/model'
import { productContext } from 'pages/product/single/context'
import { Formik, Form } from 'formik';
import variontFormContext from './context';

function SkuForm({ close, update }) {
    const { state: { properties, sku }, methods: { updateState }, productID } = useContext(productContext)
    const { makeDataService, duplicateCheck, findKeySku, initialFormik } = VariantsFormModel
    const staticFields = ["Price", "Quantity", "External ID", "Delivery boxing"]

    const onSubmit = async formData => {
        try {
            if (update) formData["_id"] = update._id
            console.log("formData", formData);
            const remakeData = makeDataService(formData)
            console.log("remakeData", remakeData);
            await duplicateCheck({
                params: remakeData,
                skues: sku,
                ...update && { skuKey: getKey() }
            })

            if (update) {
                updateState("sku", sku.map((el, key) => key === getKey() ? remakeData : el))
            } else {
                updateState("sku", [...sku, remakeData])
            }

            close()
        } catch (error) {
            toast.error(error?.errors ? error?.errors[0] : error);
        }
    }

    const getKey = useCallback(() => {
        return findKeySku({
            sku: update,
            skues: sku
        })
    }, [sku, update])

    const InitialFormik = useMemo(() => {
        return initialFormik({ properties, update })
    }, [properties, update])

    return (
        <Formik
            initialValues={{
                price: update ? update.price : '',
                quantity: update ? update.quantity : '',
                externalID: update ? update.externalID : '',
                length: update ? update.dimensions.length : '',
                height: update ? update.dimensions.height : '',
                width: update ? update.dimensions.width : '',
                weight: update ? update.weight : '',
                ...InitialFormik.values
            }}
            enableReinitialize
            validateOnChange={false}
            validationSchema={InitialFormik.schema}
            onSubmit={onSubmit}
        >

            {({ errors, values, setFieldValue }) => (
                <Form>
                    <variontFormContext.Provider value={{
                        form: { errors, setFieldValue, values },
                        state: update
                    }}>
                        <VStack align={"stretch"} spacing={10}>
                            <VStack align={"stretch"} spacing={4}>
                                {staticFields.map((el, key) => (
                                    <VariantMakeForm
                                        caption={el}
                                        key={key}
                                    />
                                ))}
                                {properties.length && properties.map((el, key) => (
                                    <VariantMakeForm
                                        key={key}
                                        property={el}
                                        caption={el.title}
                                    />
                                ))}
                            </VStack>
                            <HStack justifyContent={"space-between"}>
                                <Box><BasicButton onClick={close} cancelType>Close</BasicButton></Box>
                                <Box><BasicButton type="submit">{update ? "Update" : "Add"} Variant</BasicButton></Box>
                            </HStack>
                        </VStack>
                    </variontFormContext.Provider>
                </Form>
            )}
        </Formik>
    )
}

export default SkuForm