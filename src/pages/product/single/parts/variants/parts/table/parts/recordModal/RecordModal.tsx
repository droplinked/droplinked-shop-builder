import React, { useCallback, useContext } from 'react'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import AppSelectBox from 'components/shared/form/select/AppSelectBox'
import AppInput from 'components/shared/form/textbox/AppInput'
import AppModal from 'components/shared/modal/AppModal'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { productContext } from 'pages/product/single/context'
import RecordModalModule from './recordModel'

interface Iprops {
    open: boolean
    close: Function
    skuID: string
}

interface IRecordSubmit {
    blockchain: string
    commission: number
}

function RecordModal({ close, open, skuID }: Iprops) {
    const { state: { sku }, methods: { updateState }, productID } = useContext(productContext)
    const { refactorSkues } = RecordModalModule

    const onSubmit = useCallback((data: IRecordSubmit) => {
        const updateSku = refactorSkues({
            id: skuID,
            skues: sku
        })
        updateState("sku", updateSku)
        close()
    }, [skuID, sku])

    const formSchema = Yup.object().shape({
        blockchain: Yup.string().required('Required'),
        commission: Yup.number().min(.1).typeError("Please enter number").required('Required'),
    });

    return (
        <AppModal
            open={open}
            close={close}
            size={"2xl"}
            contentProps={{
                padding: "30px"
            }}
        >
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
                                        Once your product variant(s) is recorded on a blockchain network, it becomes immutable and <Text color={"#FFF"} fontFamily={"aven"} display="inline-block">cannot be edited</Text>. Please ensure that all details of your product are accurate before recording it.
                                    </Text>
                                </Box>
                                <HStack>
                                    <Box width={"35%"}><Text fontSize={"lg"}>Blockchain Network</Text></Box>
                                    <Box width={"65%"}>
                                        <AppSelectBox
                                            items={[{ value: "CASPER", caption: "Casper" }]}
                                            name="blockchain"
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
                                    <Box width={"25%"}><BasicButton cancelType click={close}>Cancel</BasicButton></Box>
                                    <Box width={"25%"}><BasicButton type="submit">Save</BasicButton></Box>
                                </HStack>
                            </VStack>
                        </Box>
                    </Form>
                )}
            </Formik>
        </AppModal>
    )
}

export default RecordModal