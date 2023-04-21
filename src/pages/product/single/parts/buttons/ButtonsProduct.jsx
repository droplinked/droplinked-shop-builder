import { Box, HStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import React, { useCallback, useContext } from 'react'
import { productContext } from '../../context'
import ButtonsProductClass from './model'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { useCustomNavigate } from 'hooks/useCustomeNavigate/useCustomNavigate'
import { productServices, productUpdateServices } from 'apis/product/productServices'

function ButtonsProduct() {
    const create = useMutation((params) => productServices(params))
    const update = useMutation((params) => productUpdateServices(params))
    const { state, productID } = useContext(productContext)
    const { shopNavigate } = useCustomNavigate()
    const { validate } = ButtonsProductClass

    const submit = useCallback(async () => {
        try {
            const query = productID ? update.mutate : create.mutate
            await validate(state)
            query(
                productID ? { productID, params: state } : state,
                {
                    onSuccess: () => {
                        toast.success(`Product ${productID ? "update" : "created"} success`)
                        shopNavigate("products")
                    }
                }
            )
        } catch (error) {
            toast.error(error.errors[0])
        }
    }, [state, productID])


    return (
        <HStack justifyContent={"space-between"} maxWidth={"1000px"} width={"100%"}>
            <Box width={"150px"}><BasicButton width="100%" size="md" cancelType>Cancel</BasicButton></Box>
            <Box width={"150px"}>
                <BasicButton
                    width="100%"
                    size="md"
                    loading={productID ? update.isLoading : create.isLoading}
                    onClick={submit}
                >
                    {productID ? "Update" : "Save"}
                </BasicButton>
            </Box>
        </HStack>
    )
}

export default ButtonsProduct