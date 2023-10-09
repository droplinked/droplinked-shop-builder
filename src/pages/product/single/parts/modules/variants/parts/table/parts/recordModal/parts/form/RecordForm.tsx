import React, { useCallback, useContext, useMemo } from 'react'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppInput from 'components/common/form/textbox/AppInput'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import RecordModalModule from './model/recordFormModel'
import { Isku } from 'lib/apis/product/interfaces'
import recordContext from '../../context'
import useAppToast from 'functions/hooks/toast/useToast'
import AppTypography from 'components/common/typography/AppTypography'
import BlockchainNetwork from './parts/blockchainNetwork/BlockchainNetwork'
import RecordCovers from './parts/covers/RecordCovers';
import useStack from 'functions/hooks/stack/useStack';

interface Iprops {
    close: Function
    product: any
    sku: Isku
}

interface IRecordSubmit {
    blockchain: string
    commission: number
    quantity: string
}

function RecordForm({ close, product, sku }: Iprops) {
    const stacks = useStack()
    const { updateState, state: { loading, image } } = useContext(recordContext)
    const { switchRecord } = RecordModalModule
    const { showToast } = useAppToast()

    const onSubmit = useCallback(async (data: IRecordSubmit) => {
        try {
            data.quantity = product.product_type === "PRINT_ON_DEMAND" ? "1000000" : sku.quantity.toString()
            if (!image) throw Error('Please enter image')
            updateState("loading", true)
            const deployhash = await switchRecord({ data, product, sku, stacks, imageUrl: image })
            updateState("hashkey", deployhash)
            updateState("loading", false)
            updateState("blockchain", data.blockchain)
        } catch (error) {
            if (error?.message) {
                if (error?.message.includes("The first argument")) return updateState("loading", false)
                showToast(error?.message, "error");
            } else {
                showToast("Oops! Something went wrong please contact support", "error");
            }
            updateState("loading", false)
        }
    }, [product, sku, image])

    const formSchema = useMemo(() => {
        return Yup.object().shape({
            blockchain: Yup.string().required('Required'),
            commission: Yup.number().min(.1).max(100).typeError("Please enter number").required('Required'),
        })
    }, [product.product_type])

    return (
        <Formik
            initialValues={{
                blockchain: '',
                commission: 0,
                quantity: ''
            }}
            validateOnChange={false}
            validationSchema={formSchema}
            onSubmit={onSubmit}
        >
            {({ errors, values, setFieldValue }) => (
                <Form>
                    <Box color={"#FFF"}>
                        <VStack align={"stretch"} spacing={8}>
                            <Box textAlign={"center"}><Text fontSize={"larger"} margin="12px 0" fontFamily="aven" color={"#FEB900"}>Warning !</Text></Box>
                            <Box textAlign={"center"}>
                                <Text color="#C2C2C2" fontSize={"lg"}>
                                    Once your product variant is recorded on a blockchain network, it becomes immutable, and <Text color={"#FFF"} fontFamily={"aven"} display="inline">neither the variants nor properties can be edited.</Text> Please ensure that all details of your product are accurate before recording it.
                                </Text>
                            </Box>
                            <Box>
                                <BlockchainNetwork
                                    error={errors.blockchain}
                                    onChange={(e) => setFieldValue("blockchain", e)}
                                    value={values.blockchain}
                                />
                            </Box>
                            <VStack align="stretch">
                                <AppInput
                                    name="blockchain"
                                    placeholder='%25'
                                    label='Commision'
                                    error={errors.commission}
                                    onChange={(e) => setFieldValue("commission", e.target.value)}
                                    value={values.commission || ""}
                                />
                                <AppTypography size='14px' weight='bolder' color="#808080">Specify a commission rate for co-selling the product variant. <a href='' target="_blank"><AppTypography size='14px' weight='bolder' display="inline" color="#2EC99E">Learn more</AppTypography></a></AppTypography>
                            </VStack>
                            <RecordCovers />
                            <HStack justifyContent={"space-between"}>
                                <Box width={"25%"}><BasicButton variant='outline' onClick={() => close()}>Cancel</BasicButton></Box>
                                <Box width={"25%"}><BasicButton type="submit" isLoading={loading}>Drop</BasicButton></Box>
                            </HStack>
                        </VStack>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

export default RecordForm