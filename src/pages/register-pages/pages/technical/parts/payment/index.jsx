import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import AppLoading from 'components/shared/loading/AppLoading';
import { paymentMethodsService, paymentPublicService } from 'lib/apis/shop/shopServices';
import { BlackBox, StarLabel, Text18px } from 'pages/register-pages/RegisterPages-style'
import React, { useCallback, useContext, useEffect } from 'react'
import { useMutation } from 'react-query';
import technicalContext from '../../context';
import technicalPaymentsModel from './model';
import ContainerPayment from './parts/container';
import PaymentsLoading from './parts/loading/PaymentsLoading';

function Payments() {
    const { state: { payments }, updateState } = useContext(technicalContext)
    const paymentPublic = useMutation((params) => paymentPublicService(params))
    const paymentMethods = useMutation((params) => paymentMethodsService(params))

    // Fetch payments method
    useEffect(() => {
        paymentMethods.mutate()
        paymentPublic.mutate()
    }, [])

    // update payment methods
    useEffect(() => {
        const pPublic = paymentPublic.data?.data?.data
        const pMethods = paymentMethods.data?.data?.data
        if (pPublic && pMethods) updateState("payments", technicalPaymentsModel.makePayments({
            paymentMethods: pMethods,
            paymentPublic: pPublic
        }))
    }, [paymentMethods.data, paymentPublic.data]);

    return (
        <VStack
            spacing={3}
            align='stretch'
        >
            <Box>
                <Text18px>Payment Method <StarLabel>*</StarLabel></Text18px>
            </Box>
            <Box>
                <Text fontSize="sm" color="lightGray">
                    Activate the payment methods and choose your target wallet for each of them
                </Text>
            </Box>
            <VStack align='stretch' spacing={3}>
                <VStack spacing={2} align={"stretch"}>
                    {paymentPublic.isLoading || paymentMethods.isLoading ? <PaymentsLoading /> : payments && payments.map((el, key) => (
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