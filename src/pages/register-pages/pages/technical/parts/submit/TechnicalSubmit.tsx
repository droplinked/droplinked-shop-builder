import BasicButton from 'components/shared/BasicButton/BasicButton'
import { useToasty } from 'context/toastify/ToastContext';
import { useApi } from 'hooks/useApi/useApi';
import { useCustomNavigate } from 'hooks/useCustomeNavigate/useCustomNavigate';
import { useProfile } from 'hooks/useProfile/useProfile';
import { IpaymentCreateService } from 'lib/apis/shop/interfaces';
import { paymentCreateService } from 'lib/apis/shop/shopServices';
import { putUpdateShop } from 'lib/apis/shopApiService';
import React, { useCallback, useContext, useMemo } from 'react'
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import technicalContext from '../../context';
import technicalModel from '../../model';

function TechnicalSubmit() {
    const { state: { imsType, payments } } = useContext(technicalContext)
    const { mutateAsync, isLoading } = useMutation((params: Array<IpaymentCreateService>) => paymentCreateService(params))
    const currentPath = useLocation().pathname;
    const { checkPaymentMethod } = technicalModel
    const { putApi } = useApi();
    const { updateShopData, shop } = useProfile();
    const { errorToast, successToast } = useToasty();
    const { shopNavigate } = useCustomNavigate();

    const checkPayment = useMemo(() => checkPaymentMethod(payments), [payments])

    const clickSubmit = useCallback(async () => {
        try {
            const result = shop?.imsType ? true : await putApi(putUpdateShop({ imsType: imsType })) // Update shop service
            await mutateAsync(currentPath.includes("register") ? payments.filter(el => el.isActive) : payments) // Post payments service
            if (result) {
                updateShopData();
                if (currentPath.includes("register")) {
                    shopNavigate(`register/contact-info`);
                } else {
                    successToast("Updated");
                }
            }
        } catch (error) {
            errorToast(error.message);
        }
    }, [payments, imsType])
    return (
        <BasicButton sizes="large" isDisabled={!imsType || !checkPayment} onClick={clickSubmit} isLoading={isLoading}>
            {currentPath.includes("register")
                ? "Save & next step"
                : "Update"}
        </BasicButton>
    )
}

export default TechnicalSubmit