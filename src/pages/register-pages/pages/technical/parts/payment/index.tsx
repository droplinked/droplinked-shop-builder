import { Box, VStack } from '@chakra-ui/react';
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
    const { state: { paymentMethods }, userPayments, updateState } = useContext(technicalContext)
    const paymentPublic = useMutation(() => paymentPublicService())
    const { makePayments } = technicalPaymentsModel

    // Fetch payments method
    useEffect(() => {paymentPublic.mutate()}, [])

    // update payment methods
    useEffect(() => {
        const pPublic = paymentPublic.data?.data?.data
        if (pPublic && userPayments) updateState("paymentMethods", makePayments({
            paymentMethods: userPayments,
            paymentPublic: pPublic
        }))
    }, [userPayments, paymentPublic.data]);

    return (
        <AppCard>
            <VStack spacing={2} align='stretch'>
                <Box><FieldLabel label='Payment Method' textProps={{ fontSize: "18px", fontWeight: "bolder" }} isRequired /></Box>
                <Box>
                    <AppTypography fontSize="14px" color="#C2C2C2">
                        Activate the payment methods and add target wallet for each of them.
                    </AppTypography>
                </Box>
                <VStack align='stretch' spacing={3}>
                    <VStack spacing={2} align={"stretch"}>
                        {paymentPublic.isLoading ? <PaymentsLoading /> : paymentMethods && paymentMethods.map((el, key) => (
                            <BlackBox key={key} padding="5px 20px" height="55px" display="flex" alignItems="center">
                                <ContainerPayment
                                    title={el.type}
                                    locked={el.isActive}
                                    value={el.destinationAddress}
                                />
                            </BlackBox>
                        ))}
                    </VStack>
                </VStack>
            </VStack>
        </AppCard>
    )
}

export default Payments