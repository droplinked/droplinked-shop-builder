import React, { useContext, useEffect } from 'react'
import { Box, VStack } from '@chakra-ui/react'
import FieldLabel from 'common/form/fieldLabel/FieldLabel';
import AppTypography from 'common/typography/AppTypography';
import { paymentPublicService } from 'lib/apis/shop/shopServices';
import { BlackBox } from 'pages/register-pages/RegisterPages-style'
import { useMutation } from 'react-query';
import technicalContext from '../../context';
import technicalPaymentsModel from './model';
import ContainerPayment from './parts/container';
import PaymentsLoading from './parts/loading/PaymentsLoading';

function Payments() {
    const { state: { payments }, userPayments, updateState } = useContext(technicalContext)
    const paymentPublic = useMutation(() => paymentPublicService())
    const { makePayments } = technicalPaymentsModel

    // Fetch payments method
    useEffect(() => paymentPublic.mutate(), [])

    // update payment methods
    useEffect(() => {
        const pPublic = paymentPublic.data?.data?.data
        if (pPublic && userPayments) updateState("payments", makePayments({
            paymentMethods: userPayments,
            paymentPublic: pPublic
        }))
    }, [userPayments, paymentPublic.data]);

    return (
        <VStack spacing={2} align='stretch'>
            <Box>
                <FieldLabel label='Payment Method' isRequired />
            </Box>
            <Box>
                <AppTypography size="14px" color="#C2C2C2">
                    Activate the payment methods and choose your target wallet for each of them
                </AppTypography>
            </Box>
            <VStack align='stretch' spacing={3}>
                <VStack spacing={2} align={"stretch"}>
                    {paymentPublic.isLoading ? <PaymentsLoading /> : payments && payments.map((el, key) => (
                        <BlackBox key={key} padding={3}>
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
    )
}

export default Payments