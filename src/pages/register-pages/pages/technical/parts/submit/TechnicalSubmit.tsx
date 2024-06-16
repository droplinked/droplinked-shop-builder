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

    const clickSubmit = useCallback(async () => {
        try {
            if (!loginMethods.length) throw new Error("You should activate at least one login method")
            if (!paymentMethods.filter(payment => payment.isActive).length) throw new Error("You should activate at least one payment method")

            const shopData: IshopUpdateService = { paymentMethods, loginMethods }
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