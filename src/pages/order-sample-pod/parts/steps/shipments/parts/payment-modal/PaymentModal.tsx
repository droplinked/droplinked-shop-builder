import { Flex } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppModal from 'components/common/modal/AppModal';
import AppStripe from 'components/common/stripe/AppStripe';
import AppTypography from 'components/common/typography/AppTypography';
import useAppToast from 'hooks/toast/useToast';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { cancelSampleService } from 'services/order/services';
import productOrderContext from 'pages/order-sample-pod/context';
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
    const { t } = useLocaleResources("orderSamplePOD")

    const cancel = async () => {
        try {
            await mutate()
            resetState()
            close()
        }
        catch (e) {
            showToast({ type: 'error', message: (e as Error).message || t("common:error") })
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
                            <AppTypography fontSize={18} fontWeight={'bold'} color={"#C2C2C2"}>{t("payment.title")}</AppTypography>
                            <AppStripe
                                clientSecret={clientSecret}
                                onSuccess={() => setSuccessfulPayment(true)}
                                cancel={cancel}
                                amount={amount}
                            />
                        </>
                        :
                        <>
                            <AppTypography fontSize={24} fontWeight={'bold'} color={"#2BCFA1"}>{t("payment.successTitle")}</AppTypography>
                            <AppTypography fontSize={16} color={"#fff"}>{t("payment.successDesc")}</AppTypography>
                            <Flex justifyContent={"center"}>
                                <BasicButton onClick={() => {
                                    close()
                                    navigate("/analytics/products")
                                }}>{t("payment.ok")}</BasicButton>
                            </Flex>
                        </>
                }
            </Flex>
        </AppModal>
    )
}

export default PaymentModal