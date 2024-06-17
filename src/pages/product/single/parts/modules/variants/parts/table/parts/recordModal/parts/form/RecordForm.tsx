import { Box, Checkbox, HStack, VStack } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppInput from 'components/common/form/textbox/AppInput';
import AppTypography from 'components/common/typography/AppTypography';
import { Form, Formik } from 'formik';
import useStack from 'functions/hooks/stack/useStack';
import useHookStore from 'functions/hooks/store/useHookStore';
import useAppToast from 'functions/hooks/toast/useToast';
import useAppWeb3 from 'functions/hooks/web3/useWeb3';
import { Isku } from 'lib/apis/product/interfaces';
import { useCheckPermission } from 'lib/stores/app/appStore';
import React, { useCallback, useContext, useMemo } from 'react';
import * as Yup from 'yup';
import recordContext from '../../context';
import BlockchainNetwork from './parts/blockchainNetwork/BlockchainNetwork';
import RecordCovers from './parts/covers/RecordCovers';

interface Iprops {
    close: Function
    product: any
    sku: Isku
}

interface IRecordSubmit {
    blockchain: string
    commission: number
    quantity: string
    dropon: boolean
    royaltyon: boolean
    royalty: number
}

function RecordForm({ close, product, sku }: Iprops) {
    const checkPermissionAndShowToast = useCheckPermission()
    const stack = useStack()
    const { updateState, state: { loading, image } } = useContext(recordContext)
    const { web3 } = useAppWeb3()
    const { showToast } = useAppToast()
    const { app: { user: { wallets } } } = useHookStore()

    const onSubmit = useCallback(async (data: IRecordSubmit) => {
        try {
            data.quantity = product.product_type === "PRINT_ON_DEMAND" ? "1000000" : sku.quantity.toString()
            if (!image) throw Error('Please enter image')
            updateState("loading", true)
            const { commission, quantity, blockchain, royalty } = data
            const params = { commission, quantity, blockchain, royalty }

            const shop = JSON.parse(localStorage.getItem('appStore')).state.shop;
            const deployhash = await web3({ method: "record", params: { data: params, product, sku, imageUrl: image, shop }, chain: data.blockchain, wallets, stack })
            updateState("hashkey", deployhash)
            updateState("loading", false)
            updateState("blockchain", data.blockchain)
        } catch (error) {
            if (error?.message) {
                if (error?.message.includes("The first argument")) return updateState("loading", false)
                showToast({ message: error?.message, type: "error" });
            } else {
                showToast({ message: "Oops! Something went wrong please contact support", type: "error" });
            }
            updateState("loading", false)
        }
    }, [product, sku, image, wallets, stack.stxAddress])

    const formSchema = useMemo(() => {
        return Yup.object().shape({
            blockchain: Yup.string().required('Required'),
            dropon: Yup.boolean(),
            commission: Yup.number().when('dropon', { is: true, then: (schema) => schema.min(.1).max(100).typeError("Please enter number").required('Required') }),
            royaltyon: Yup.boolean(),
            royalty: Yup.number().when('royaltyon', { is: true, then: (schema) => schema.min(.1).max(100).typeError("Please enter number").required('Required') }),
        })
    }, [product.product_type])

    return (
        <Formik
            initialValues={{
                blockchain: '',
                commission: 0,
                royalty: 0,
                quantity: '',
                dropon: false,
                royaltyon: false,
            }}
            validateOnChange={false}
            validationSchema={formSchema}
            onSubmit={onSubmit}
        >
            {({ errors, values, setFieldValue }) => (
                <Form>
                    <Box color={"#FFF"}>
                        <VStack align={"stretch"} spacing={8}>
                            <Box textAlign={"center"}><AppTypography fontSize={"larger"} margin="12px 0" color={"#FEB900"}>Warning !</AppTypography></Box>
                            <Box textAlign={"center"}>
                                <AppTypography color="#C2C2C2" fontSize={"lg"}>
                                    Once your product variant is recorded on a blockchain network, it becomes immutable, and <AppTypography color={"#FFF"} fontWeight='600' fontSize={"lg"} display="inline">neither the variants nor properties can be edited.</AppTypography> Please ensure that all details of your product are accurate before recording it.
                                </AppTypography>
                            </Box>
                            <Box>
                                <BlockchainNetwork
                                    error={errors.blockchain}
                                    onChange={(e) => setFieldValue("blockchain", e)}
                                    value={values.blockchain}
                                />
                            </Box>
                            <Box>
                                <Checkbox size='md' onChange={e => setFieldValue('dropon', e.target.checked)} value='DROPLINKED' alignItems="flex-start" colorScheme='green'>
                                    <VStack align='stretch' paddingLeft={2} spacing={2}>
                                        <AppTypography fontWeight='700' fontSize="14px" color="#C2C2C2">Drop on affiliate</AppTypography>
                                        <AppTypography fontSize="14px" color="#C2C2C2">
                                            You can drop your product on the affiliate system to let other stores cooperate with you on your sales
                                        </AppTypography>
                                    </VStack>
                                </Checkbox>
                            </Box>
                            {values.dropon && (
                                <VStack align="stretch">
                                    <AppInput
                                        name="blockchain"
                                        placeholder='%25'
                                        label='Commision'
                                        error={errors.commission}
                                        onChange={(e) => setFieldValue("commission", e.target.value)}
                                        value={values.commission || ""}
                                    />
                                    <AppTypography fontSize='14px' fontWeight='bold' color="#808080">Specify a commission rate for co-selling the product variant. <a href='' target="_blank"><AppTypography fontSize='14px' fontWeight='bold' display="inline" color="#2EC99E">Learn more</AppTypography></a></AppTypography>
                                </VStack>
                            )}
                            <Box>
                                <Checkbox
                                    size='md'
                                    value='DROPLINKED'
                                    alignItems="flex-start"
                                    colorScheme='green'
                                    onChange={({ target: { checked } }) => {
                                        if (!checkPermissionAndShowToast("web3_royalty_feature")) return
                                        setFieldValue('royaltyon', checked)
                                    }}
                                >
                                    <VStack align='stretch' paddingLeft={2} spacing={2}>
                                        <AppTypography fontWeight='700' fontSize="14px" color="#C2C2C2">Royalty</AppTypography>
                                        <AppTypography fontSize="14px" color="#C2C2C2">Ensures you receive a percentage from each resale.</AppTypography>
                                    </VStack>
                                </Checkbox>
                            </Box>
                            {values.royaltyon && (
                                <VStack align="stretch">
                                    <AppInput
                                        name="royalty"
                                        placeholder='%25'
                                        label='Royalty'
                                        error={errors.royalty}
                                        onChange={(e) => setFieldValue("royalty", e.target.value)}
                                        value={values.royalty || ""}
                                    />
                                    <AppTypography fontSize='14px' fontWeight='bold' color="#808080">Specify a commission rate for co-selling the product variant. <a href='' target="_blank"><AppTypography fontSize='14px' fontWeight='bold' display="inline" color="#2EC99E">Learn more</AppTypography></a></AppTypography>
                                </VStack>
                            )}
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