import { Box, HStack, VStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import React, { useContext, useEffect } from 'react'
import VariantMakeForm from './parts/container'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify'
import VariantsFormModel from './model/model'
import { productContext } from 'pages/product/single/context'

function SkuForm({ close, update }) {
    const { state: { properties, sku }, methods: { updateState }, productID } = useContext(productContext)
    const { register, handleSubmit, setValue } = useForm();
    const { makeDataService, validation } = VariantsFormModel
    const staticFields = ["Price", "Quantity", "External ID", "Delivery boxing"]

    const onSubmit = async data => {
        try {
            await validation(data)
            const remakeData = makeDataService(data)

            if (update) {
                updateState("sku", sku.map((el, key) => key === update.key ? remakeData : el))
            } else {
                updateState("sku", [...sku, remakeData])
            }

            close()
        } catch (error) {
            toast.error(error?.errors[0]);
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
        if (update && update?.sku?._id && productID) setValue(`_id`, update.sku._id, { shouldValidate: false })
    }, [update, productID])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack align={"stretch"} spacing={10}>
                <VStack align={"stretch"} spacing={4}>
                    {staticFields.map((el, key) => (
                        <VariantMakeForm
                            caption={el}
                            key={key}
                            state={update?.sku}
                            form={register}
                        />
                    ))}
                    {properties.length && properties.map((el, key) => (
                        <VariantMakeForm
                            key={key}
                            property={el}
                            state={update?.sku}
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