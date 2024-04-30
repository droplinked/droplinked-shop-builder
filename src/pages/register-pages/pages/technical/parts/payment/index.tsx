import { Flex, VStack } from '@chakra-ui/react';
import AppCard from 'components/common/card/AppCard';
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel';
import AppTypography from 'components/common/typography/AppTypography';
import { paymentPublicService } from 'lib/apis/shop/shopServices';
import { BlackBox } from 'pages/register-pages/RegisterPages-style';
import React, { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import technicalContext from '../../context';
import technicalPaymentsModel from './model';
import ContainerPayment from './parts/container';
import PaymentsLoading from './parts/loading/PaymentsLoading';

function Payments() {
    const { state: { paymentMethods } } = useContext(technicalContext)
    const paymentPublic = useMutation(() => paymentPublicService())
    const { makePayments } = technicalPaymentsModel
    const combinedPaymentMethods = makePayments({
        paymentMethods: paymentMethods,
        paymentPublic: paymentPublic.data?.data?.data
    })

    useEffect(() => { paymentPublic.mutate() }, [])

    return (
        <AppCard>
            <Flex direction={"column"} gap={6}>
                <Flex direction={"column"} gap={0}>
                    <FieldLabel label='Payment Method' textProps={{ fontSize: "18px", fontWeight: "bolder" }} isRequired />
                    <AppTypography fontSize="14px" color="#C2C2C2">Activate the payment methods and add target wallet for each of them.</AppTypography>
                </Flex>
                <VStack align='stretch' spacing={3}>
                    <VStack spacing={2} align={"stretch"}>
                        {paymentPublic.isLoading ? <PaymentsLoading /> : combinedPaymentMethods?.map((payment, key) => {
                            return payment.tokens?.length ?
                                payment.tokens.map((token, index) =>
                                    <BlackBox key={index} padding="4px 20px" height="56px" display="flex" alignItems="center">
                                        <ContainerPayment chain={payment} token={token} />
                                    </BlackBox>
                                )
                                :
                                <BlackBox key={key} padding="4px 20px" height="56px" display="flex" alignItems="center">
                                    <ContainerPayment chain={payment} />
                                </BlackBox>
                        })}
                    </VStack>
                </VStack>
            </Flex>
        </AppCard>
    )
}

export default Payments