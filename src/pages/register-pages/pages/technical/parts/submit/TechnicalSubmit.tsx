import { Flex } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import useAppToast from 'functions/hooks/toast/useToast';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import { IshopUpdateService } from 'lib/apis/shop/interfaces';
import { shopUpdateService } from 'lib/apis/shop/shopServices';
import AppErrors from 'lib/utils/statics/errors/errors';
import React, { useCallback, useContext } from 'react';
import { useMutation } from 'react-query';
import technicalContext from '../../context';

function TechnicalSubmit() {
    const { state: { imsType, paymentMethods, loginMethods }, updateState } = useContext(technicalContext)
    const { mutateAsync, isLoading } = useMutation((params: IshopUpdateService) => shopUpdateService(params))
    const { setShopData: { loading }, shop } = useProfile()
    const { showToast } = useAppToast()

    // Validate total percent of destination addresses
    const validatePaymentMethods = (methods) => {
        for (const method of methods) {
            if (method.type === "STRIPE") {
                continue;
            }
            if (method.isActive && method?.destinationAddress?.length) {
                const totalPercent = method.destinationAddress?.reduce((acc, dest) => acc + dest.percent, 0);
                if (totalPercent !== 100) {
                    throw new Error(`The total percent for ${method.type} should equal 100. Current total is ${totalPercent}.`);
                }
            }
        }
    };

    const clickSubmit = useCallback(async () => {
        try {
            if (!loginMethods.length) throw new Error("You should activate at least one login method")
        
            const activePaymentMethods = paymentMethods.filter(payment => payment.isActive)
            if (!activePaymentMethods.length) throw new Error("You should activate at least one payment method")
            
            // Validate total percent of payment methods
            validatePaymentMethods(activePaymentMethods);

            const shopData: IshopUpdateService = { paymentMethods: activePaymentMethods, loginMethods }
            await mutateAsync(shopData)
            showToast({ message: AppErrors.store.payment_options_have_been_updated, type: "success" })
        } catch (error) {
            showToast({ message: error.message, type: "error" })
        }
    }, [paymentMethods, imsType, paymentMethods, shop, updateState])

    return (
        <Flex justifyContent={"flex-end"}>
            <BasicButton sizes="large" isDisabled={imsType === "DROPLINKED" && !imsType} onClick={clickSubmit} isLoading={isLoading || loading}>
                Update
            </BasicButton>
        </Flex>
    )
}

export default TechnicalSubmit