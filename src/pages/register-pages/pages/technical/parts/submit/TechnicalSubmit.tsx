import { Box, Flex } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import useAppToast from 'functions/hooks/toast/useToast';
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import { IshopUpdateService } from 'lib/apis/shop/interfaces';
import { shopUpdateService } from 'lib/apis/shop/shopServices';
import AppErrors from 'lib/utils/statics/errors/errors';
import React, { useCallback, useContext, useMemo } from 'react';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import technicalContext from '../../context';
import technicalModel from '../../model';
import TechnicalSubmitModel from './TechnicalSubmitModel';

function TechnicalSubmit() {
    const { state: { imsType, paymentMethods, loginMethods }, userPayments } = useContext(technicalContext)
    const { mutateAsync, isLoading } = useMutation((params: IshopUpdateService) => shopUpdateService(params))
    const currentPath = useLocation().pathname
    const { checkPaymentMethod } = technicalModel
    const { setShopData: { loading, update }, shop } = useProfile()
    const { shopNavigate } = useCustomNavigate()
    const { refactor } = TechnicalSubmitModel
    const isRegister = currentPath.includes("register")
    const { showToast } = useAppToast()

    const checkPayment = useMemo(() => checkPaymentMethod(paymentMethods), [paymentMethods])

    const clickSubmit = useCallback(async () => {
        try {
            if (loginMethods.length < 1) throw new Error("Please select a login method")
            const shopData: IshopUpdateService = {
                paymentMethods: isRegister ? paymentMethods.filter(el => el.isActive) : refactor({ payments: paymentMethods, userPayments }),
                loginMethods
            }
            await mutateAsync(shopData)

            if (isRegister) {
                if (!shop.imsType) await update({ imsType: imsType })
                shopNavigate(``);
            } else {
                showToast(AppErrors.store.payment_options_have_been_updated, "success");
            }
        } catch (error) {
            showToast(error.message, "error");
        }
    }, [paymentMethods, imsType, userPayments, isRegister, shop])
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
                        ? "Publish Store"
                        : "Update"}
                </BasicButton>
            </Box>
        </Flex>
    )
}

export default TechnicalSubmit