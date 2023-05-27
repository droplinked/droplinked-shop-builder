import { Box, HStack, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import React, { useCallback, useContext, useMemo } from 'react'
import VariantMakeForm from './parts/container'
import VariantsFormModel from './model/model'
import { productContext } from 'pages/product/single/context'
import { Formik, Form } from 'formik';
import variontFormContext from './context';
import useAppToast from 'functions/hooks/toast/useToast'

function SkuForm({ close, update }) {
    const { state: { properties, sku }, methods: { updateState } } = useContext(productContext)
    const { makeDataService, duplicateCheck, findKeySku, initialFormik } = VariantsFormModel
    const staticFields = ["Price", "Quantity", "External ID", "Delivery boxing"]
    const { showToast } = useAppToast()

    const onSubmit = async formData => {
        try {
            if (update) formData["_id"] = update._id
            const remakeData = makeDataService(formData)
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
            showToast(error?.errors ? error?.errors[0] : error, "error");
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
                                <Box><BasicButton onClick={close} variant="outline">Back</BasicButton></Box>
                                <Box><BasicButton type="submit">Save</BasicButton></Box>
                            </HStack>
                        </VStack>
                    </variontFormContext.Provider>
                </Form>
            )}
        </Formik>
    )
}

export default SkuForm