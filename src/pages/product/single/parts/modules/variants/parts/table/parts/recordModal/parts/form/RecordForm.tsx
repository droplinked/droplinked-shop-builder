import React, { useCallback, useContext } from 'react'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import AppInput from 'components/common/form/textbox/AppInput'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import RecordModalModule from './model/recordFormModel'
import { Isku } from 'lib/apis/product/interfaces'
import { useMutation, useQuery } from 'react-query'
import { recordCasperService, supportedChainsService } from 'lib/apis/sku/services'
import { IrecordCasperService } from 'lib/apis/sku/interfaces'
import recordContext from '../../context'
import useAppToast from 'functions/hooks/toast/useToast'
import AppTypography from 'components/common/typography/AppTypography'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import { stacksRecord } from 'lib/utils/blockchain/stacks/record'
import useStack from 'functions/hooks/stack/useStack'

interface Iprops {
    close: Function
    product: any
    sku: Isku
}

interface IRecordSubmit {
    blockchain: string
    commission: number
}

function RecordForm({ close, product, sku }: Iprops) {
    const chains = useQuery({
        queryFn: supportedChainsService,
        queryKey: "supported_chains",
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })
    const { updateState, state: { loading } } = useContext(recordContext)
    const { mutateAsync } = useMutation((params: IrecordCasperService) => recordCasperService(params))
    const { casper, record } = RecordModalModule
    const { login, isRequestPending, openContractCall, stxAddress } = useStack()
    const { showToast } = useAppToast()

    const deploy = useCallback((data: IRecordSubmit, deployHash: string) => {
        return mutateAsync({
            chain: data.blockchain,
            params: {
                deploy_hash: deployHash,
                skuID: sku._id,
                commision: Number(data.commission)
            }
        }, {
            onSuccess: async () => {
                updateState("hashkey", deployHash)
            }
        })
    }, [product])

    const onSubmit = useCallback(async (data: IRecordSubmit) => {
        try {
            updateState("loading", true)
            const commission = data.commission
            if (data.blockchain === "CASPER") {
                const deployHash = await casper({ commission, product, sku })
                deploy(data, deployHash)
            } else if (data.blockchain === "STACKS") {
                await login()
                const query = await stacksRecord({
                    isRequestPending,
                    openContractCall,
                    params: {
                        price: sku.price * 100,
                        amount: sku.quantity,
                        commission,
                        productID: product?._id,
                        creator: stxAddress,
                        uri: "record"
                    }
                })
                if (query) deploy(data, query.txId)
            } else if (["POLYGON", "RIPPLE"].includes(data.blockchain)) {
                const res = await record({ commission, product, product_type: product.product_type, blockchain: data.blockchain, sku })
                if (res) deploy(data, res)
            }
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
    }, [product, stxAddress, sku])

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
                                    Once your product variant is recorded on a blockchain network, it becomes immutable, and <Text color={"#FFF"} fontFamily={"aven"} display="inline">neither the variants nor properties can be edited.</Text> Please ensure that all details of your product are accurate before recording it.
                                </Text>
                            </Box>
                            <Box>
                                <AppSelectBox
                                    items={chains.data ? chains.data?.data?.data.map((el: any) => ({ value: el, caption: capitalizeFirstLetter(el) })) : []}
                                    name="blockchain"
                                    label='Blockchain Network'
                                    loading={!chains.isLoading}
                                    placeholder='Select Blockchain'
                                    error={errors.blockchain}
                                    onChange={(e) => setFieldValue("blockchain", e.target.value)}
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