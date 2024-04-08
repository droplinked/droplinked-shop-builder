import { Flex } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppModal from 'components/common/modal/AppModal';
import AppStripe from 'components/common/stripe/AppStripe';
import AppTypography from 'components/common/typography/AppTypography';
import useAppToast from 'functions/hooks/toast/useToast';
import { cancelSampleService } from 'lib/apis/order/services';
import productOrderContext from 'pages/product/order/context';
import React, { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

interface Props {
    isOpen: boolean;
    close: Function;
    clientSecret: string;
    amount: number;
}

function PaymentModal({ isOpen, close, clientSecret, amount }: Props) {
    const { methods: { resetState } } = useContext(productOrderContext)
    const [successfulPayment, setSuccessfulPayment] = useState(false)
    const { mutate } = useMutation(cancelSampleService)
    const { showToast } = useAppToast()
    const navigate = useNavigate()

    const cancel = async () => {
        try {
            await mutate()
            resetState()
            close()
        }
        catch (e) {
            showToast({ type: 'error', message: (e as Error).message })
        }
    }

    return (
        <AppModal
            open={isOpen}
            close={() => { return }}
            isCentered={true}
            size="2xl"
            contentProps={{ padding: 8 }}
        >
            <Flex direction={"column"} gap={"36px"}>
                {
                    !successfulPayment ?
                        <>
                            <AppTypography fontSize={18} fontWeight={'bold'} color={"#C2C2C2"}>Payment</AppTypography>
                            <AppStripe
                                clientSecret={clientSecret}
                                onSuccess={() => setSuccessfulPayment(true)}
                                cancel={cancel}
                                amount={amount}
                            />
                        </>
                        :
                        <>
                            <AppTypography fontSize={24} fontWeight={'bold'} color={"#2BCFA1"}>Order Submitted!</AppTypography>
                            <AppTypography fontSize={16} color={"#fff"}>Sample order confirmed! Your selection is on its way.</AppTypography>
                            <Flex justifyContent={"center"}>
                                <BasicButton onClick={() => {
                                    close()
                                    navigate("/dashboard/products")
                                }}>Ok</BasicButton>
                            </Flex>
                        </>
                }
            </Flex>
        </AppModal>
    )
}

export default PaymentModal