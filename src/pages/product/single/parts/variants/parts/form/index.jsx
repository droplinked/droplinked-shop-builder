import { Box, HStack, VStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import React, { useCallback, useContext, useEffect } from 'react'
import VariantMakeForm from './parts/container'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify'
import VariantsFormModel from './model/model'
import { productContext } from 'pages/product/single/context'

function SkuForm({ close, update }) {
    const { state: { properties, sku }, methods: { updateState }, productID } = useContext(productContext)
    const { register, handleSubmit, setValue } = useForm();
    const { makeDataService, validation, duplicateCheck, findKeySku } = VariantsFormModel
    const staticFields = ["Price", "Quantity", "External ID", "Delivery boxing"]

    const onSubmit = async formData => {
        try {
            await validation({
                formData,
                skues: sku
            })
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
            toast.error(error?.errors ? error?.errors[0] : error);
        }
    }

    // set ids properties for "react-hook-form"
    useEffect(() => {
        if (properties.length) properties.map(el => {
            setValue(`ids[${el.title}]`, el.value, { shouldValidate: false })
        })
    }, [properties])

    // Set sku ID when update mode
    useEffect(() => {
        if (update && update?._id && productID) setValue(`_id`, update._id, { shouldValidate: false })
    }, [update, productID])

    const getKey = useCallback(() => {
        return findKeySku({
            sku: update,
            skues: sku
        })
    }, [sku, update])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack align={"stretch"} spacing={10}>
                <VStack align={"stretch"} spacing={4}>
                    {staticFields.map((el, key) => (
                        <VariantMakeForm
                            caption={el}
                            key={key}
                            state={update}
                            form={register}
                        />
                    ))}
                    {properties.length && properties.map((el, key) => (
                        <VariantMakeForm
                            key={key}
                            property={el}
                            state={update}
                            caption={el.title}
                            form={register}
                        />
                    ))}
                </VStack>
                <HStack justifyContent={"space-between"}>
                    <Box><BasicButton onClick={close} cancelType>Close</BasicButton></Box>
                    <Box><BasicButton type="submit">{update ? "Update" : "Add"} Variant</BasicButton></Box>
                </HStack>
            </VStack>
        </form>
    )
}

export default SkuForm