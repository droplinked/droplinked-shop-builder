import { Box, Flex } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import useAppToast from 'functions/hooks/toast/useToast';
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import { IshopUpdateService } from 'lib/apis/shop/interfaces';
import { shopUpdateService } from 'lib/apis/shop/shopServices';
import AppErrors from 'lib/utils/statics/errors/errors';
import React, { useCallback, useContext } from 'react';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import technicalContext from '../../context';

function TechnicalSubmit() {
    const { state: { imsType, paymentMethods, loginMethods }, updateState } = useContext(technicalContext)
    const { mutateAsync, isLoading } = useMutation((params: IshopUpdateService) => shopUpdateService(params))
    const currentPath = useLocation().pathname
    const { setShopData: { loading, update }, shop } = useProfile()
    const { shopNavigate } = useCustomNavigate()
    const isRegister = currentPath.includes("register")
    const { showToast } = useAppToast()

    const clickSubmit = useCallback(async () => {
        try {
            const shopData: IshopUpdateService = {
                paymentMethods: isRegister ? paymentMethods.filter(el => el.isActive) : paymentMethods,
                loginMethods
            }
            await mutateAsync(shopData)

            if (isRegister) {
                if (!shop.imsType) await update({ imsType: imsType })
                shopNavigate("");
            } else {
                showToast({ message: AppErrors.store.payment_options_have_been_updated, type: "success" });
            }
        } catch (error) {
            showToast({ message: error.message, type: "error" });
        }
    }, [paymentMethods, imsType, paymentMethods, isRegister, shop, updateState])
    return (
        <Flex justifyContent={isRegister ? "space-between" : "right"} width={"100%"}>
            {isRegister && (
                <Box>
                    <BasicButton variant="outline" onClick={() => shopNavigate(`register/design`)}>Back</BasicButton>
                </Box>
            )}
            <Box>
                <BasicButton sizes="large" isDisabled={imsType === "DROPLINKED" && !imsType} onClick={clickSubmit} isLoading={isLoading || loading}>
                    {isRegister ? "Publish Store" : "Update"}
                </BasicButton>
            </Box>
        </Flex>
    )
}

export default TechnicalSubmit