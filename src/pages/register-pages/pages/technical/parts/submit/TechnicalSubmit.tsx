import { Box, Flex } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton'
import useAppToast from 'functions/hooks/toast/useToast';
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import { IpaymentCreateService } from 'lib/apis/shop/interfaces';
import { paymentCreateService } from 'lib/apis/shop/shopServices';
import AppErrors from 'lib/utils/statics/errors/errors';
import React, { useCallback, useContext, useMemo } from 'react'
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import technicalContext from '../../context';
import technicalModel from '../../model';
import TechnicalSubmitModel from './TechnicalSubmitModel';

function TechnicalSubmit() {
    const { state: { imsType, payments }, userPayments } = useContext(technicalContext)
    const { mutateAsync, isLoading } = useMutation((params: Array<IpaymentCreateService>) => paymentCreateService(params))
    const currentPath = useLocation().pathname
    const { checkPaymentMethod } = technicalModel
    const { setShopData: { loading, update } } = useProfile()
    const { shopNavigate } = useCustomNavigate()
    const { refactor } = TechnicalSubmitModel
    const isRegister = currentPath.includes("register")
    const { showToast } = useAppToast()

    const checkPayment = useMemo(() => checkPaymentMethod(payments), [payments])

    const clickSubmit = useCallback(async () => {
        try {
            await mutateAsync(isRegister ? payments.filter(el => el.isActive) : refactor({ payments, userPayments })) // Post payments service
            if (isRegister) {
                update({ imsType })
                shopNavigate(`products`);
            } else {
                showToast(AppErrors.store.payment_options_have_been_updated, "success");
            }
        } catch (error) {
            showToast(error.message, "error");
        }
    }, [payments, imsType, userPayments])
    return (
        <Flex justifyContent={isRegister ? "space-between" : "right"} width={"100%"}>
            {isRegister && (
                <Box>
                    <BasicButton variant="outline" onClick={() => shopNavigate(`register/design`)}>Back</BasicButton>
                </Box>
            )}
            <Box>
                <BasicButton sizes="large" isDisabled={imsType === "DROPLINKED" ? !imsType || !checkPayment : !imsType} onClick={clickSubmit} isLoading={isLoading || loading}>
                    {isRegister
                        ? "Next"
                        : "Update"}
                </BasicButton>
            </Box>
        </Flex>
    )
}

export default TechnicalSubmit