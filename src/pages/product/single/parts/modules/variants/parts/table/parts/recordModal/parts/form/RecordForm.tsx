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
import { useMutation, useQuery } from 'react-query'
import { recordCasperService, supportedChainsService } from 'lib/apis/sku/services'
import { IrecordCasperService } from 'lib/apis/sku/interfaces'
import recordContext from '../../context'
import useAppToast from 'functions/hooks/toast/useToast'
import AppTypography from 'components/common/typography/AppTypography'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import { stacksRecord } from 'lib/utils/blockchain/stacks/record'
import useStack from 'functions/hooks/stack/useStack'
import { PolygonLogin } from 'lib/utils/blockchain/polygon/metamaskLogin'
import { record_merch_polygon } from 'lib/utils/blockchain/polygon/record'

export interface IRecordModalProduct {
    title: string
    description: string
    shippingType: string
    media: Array<any>
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
    const { state: { sku, product_type }, productID } = useContext(productContext)
    const chains = useQuery({
        queryFn: supportedChainsService,
        queryKey: "supported_chains",
        cacheTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })
    const { updateState, state: { loading } } = useContext(recordContext)
    const { mutateAsync } = useMutation((params: IrecordCasperService) => recordCasperService(params))
    const { openCasperWallet, casperRecord } = RecordModalModule
    const { login, isRequestPending, openContractCall, stxAddress } = useStack()
    const { showToast } = useAppToast()

    const deploy = useCallback((data: IRecordSubmit, deployHash: string) => {
        return mutateAsync({
            chain: data.blockchain,
            params: {
                deploy_hash: deployHash,
                skuID: product.sku._id,
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
                const CasperWallet = await openCasperWallet()
                const record = await casperRecord({
                    commission,
                    product,
                    publicKey: CasperWallet.publicKey,
                    sku: product.sku
                })
                if (!record.deployHash) throw Error("Desploy hash empty");
                deploy(data, record.deployHash)
            } else if (data.blockchain === "STACKS") {
                await login()
                const query = await stacksRecord({
                    isRequestPending,
                    openContractCall,
                    params: {
                        price: product.sku.price * 100,
                        amount: product.sku.quantity,
                        commission,
                        productID: productID,
                        creator: stxAddress,
                        uri: "record"
                    }
                })
                if (query) deploy(data, query.txId)
            } else if (data.blockchain === "POLYGON") {
                const login = await PolygonLogin()
                const quantityPOD = '11579208923731619542357098500868790785326998466564056403945758400791312963999'
                const record = await record_merch_polygon(product.sku, login.address, product.title, product.description, product.media[0].url, product.sku.price * 100, product_type === "PRINT_ON_DEMAND" ? quantityPOD : product.sku.quantity, commission * 100)
                if (record) deploy(data, record)
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
    }, [product, sku, stxAddress, productID, product_type])

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