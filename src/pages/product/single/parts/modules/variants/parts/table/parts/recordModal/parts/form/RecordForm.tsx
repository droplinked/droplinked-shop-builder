import React, { useCallback, useContext } from 'react'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import AppInput from 'components/common/form/textbox/AppInput'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { productContext } from 'pages/product/single/context'
import RecordModalModule from './recordFormModel'
import { Isku } from 'lib/apis/product/interfaces'
import { useMutation } from 'react-query'
import { recordCasperService } from 'lib/apis/sku/services'
import { IrecordCasperService } from 'lib/apis/sku/interfaces'
import recordContext from '../../context'
import useAppToast from 'functions/hooks/toast/useToast'

export interface IRecordModalProduct {
    title: string
    description: string
    shippingType: string
    media: Array<string>
    sku: Isku
}

interface Iprops {
    close: Function
    product: IRecordModalProduct
}

interface IRecordSubmit {
    blockchain: string
    commission: number
}

function RecordForm({ close, product }: Iprops) {
    const { state: { sku } } = useContext(productContext)
    const { updateState, state: { loading } } = useContext(recordContext)
    const { mutateAsync } = useMutation((params: IrecordCasperService) => recordCasperService(params))
    const { openCasperWallet, casperRecord } = RecordModalModule
    const { showToast } = useAppToast()

    const onSubmit = useCallback(async (data: IRecordSubmit) => {
        try {
            if (data.blockchain === "CASPER") {
                const CasperWallet = await openCasperWallet()
                updateState("loading", true)
                const record = await casperRecord({
                    commission: data.commission,
                    product,
                    publicKey: CasperWallet.publicKey,
                    sku: product.sku
                })
                if (!record.deployHash) throw Error("Desploy hash empty");
                await mutateAsync({
                    deploy_hash: record.deployHash,
                    skuID: product.sku._id,
                    commision: Number(data.commission)
                }, {
                    onSuccess: async () => {
                        updateState("hashkey", record.deployHash)
                    }
                })
            }
        } catch (error) {
            if (error?.message) {
                if (error?.message.includes("The first argument")) return updateState("loading", false)
                showToast(error?.message, "error");
            } else {
                showToast("Oops! Something went wrong please contact support", "error");
            }
            updateState("loading", false)
        }
    }, [product, sku])

    const formSchema = Yup.object().shape({
        blockchain: Yup.string().required('Required'),
        commission: Yup.number().min(.1).max(100).typeError("Please enter number").required('Required'),
    });

    return (
        <Formik
            initialValues={{
                blockchain: '',
                commission: 0,
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
                                    Once your product variant is recorded on a blockchain network, it becomes immutable and <Text color={"#FFF"} fontFamily={"aven"} display="inline-block">cannot be edited</Text>. Please ensure that all details of your product are accurate before recording it.
                                </Text>
                            </Box>
                            <HStack>
                                <Box width={"35%"}><Text fontSize={"lg"}>Blockchain Network</Text></Box>
                                <Box width={"65%"}>
                                    <AppSelectBox
                                        items={[{ value: "CASPER", caption: "Casper" }]}
                                        name="blockchain"
                                        placeholder='Select blockchain'
                                        error={errors.blockchain}
                                        onChange={(e) => setFieldValue("blockchain", e.target.value)}
                                        value={values.blockchain}
                                    />
                                </Box>
                            </HStack>
                            <HStack>
                                <Box width={"35%"}><Text fontSize={"lg"}>Commission</Text></Box>
                                <Box width={"65%"}>
                                    <AppInput
                                        name="blockchain"
                                        placeholder='%25'
                                        error={errors.commission}
                                        onChange={(e) => setFieldValue("commission", e.target.value)}
                                        value={values.commission || ""}
                                    />
                                </Box>
                            </HStack>
                            <HStack justifyContent={"space-between"}>
                                <Box width={"25%"}><BasicButton variant='outline' onClick={() => !loading ? close() : {}}>Cancel</BasicButton></Box>
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