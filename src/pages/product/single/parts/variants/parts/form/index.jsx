import { Box, Flex, HStack, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import { BlackBox } from 'pages/register-pages/RegisterPages-style'
import React, { useCallback, useEffect } from 'react'
import VariantMakeForm from './parts/container'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify'
import VariantsFormModal from './model'

function SkuForm({ close }) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(VariantsFormModal.makeDataService(data))
    }

    // toast error message
    const checkError = useCallback(() => {
        if (errors && Object.keys(errors).length) toast.error(`${Object.keys(errors)[0]} is required`);
    }, [errors])


    return (
        <BlackBox>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack align={"stretch"} spacing={10}>
                    <VStack align={"stretch"} spacing={4}>
                        <VariantMakeForm
                            caption="Price"
                            form={register}
                        />
                        <VariantMakeForm
                            caption="Quantity"
                            form={register}
                        />
                        <VariantMakeForm
                            caption="External ID"
                            form={register}
                        />
                        <VariantMakeForm
                            caption="Delivery boxing"
                            form={register}
                        />
                    </VStack>
                    <HStack justifyContent={"space-between"}>
                        <Box><BasicButton onClick={close} cancelType>Close</BasicButton></Box>
                        <Box><BasicButton onClick={checkError} type="submit">Save Variant</BasicButton></Box>
                    </HStack>
                </VStack>
            </form>
        </BlackBox>
    )
}

export default SkuForm