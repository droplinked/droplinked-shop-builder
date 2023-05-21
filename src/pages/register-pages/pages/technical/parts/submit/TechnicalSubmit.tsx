import BasicButton from 'components/shared/BasicButton/BasicButton'
import { useCustomNavigate } from 'hooks/useCustomeNavigate/useCustomNavigate';
import { useProfile } from 'hooks/useProfile/useProfile';
import { IpaymentCreateService } from 'lib/apis/shop/interfaces';
import { paymentCreateService } from 'lib/apis/shop/shopServices';
import AppErrors from 'lib/utils/statics/errors/errors';
import React, { useCallback, useContext, useMemo } from 'react'
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
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

    const checkPayment = useMemo(() => checkPaymentMethod(payments), [payments])

    const clickSubmit = useCallback(async () => {
        try {
            await mutateAsync(isRegister ? payments.filter(el => el.isActive) : refactor({ payments, userPayments })) // Post payments service
            if (isRegister) {
                update({ imsType })
                shopNavigate(`register/contact-info`);
            } else {
                toast.success(AppErrors.store.has_been_updated("Payment options"));
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, [payments, imsType, userPayments])
    return (
        <BasicButton sizes="large" isDisabled={!imsType || !checkPayment} onClick={clickSubmit} isLoading={isLoading || loading}>
            {isRegister
                ? "Next"
                : "Update"}
        </BasicButton>
    )
}

export default TechnicalSubmit