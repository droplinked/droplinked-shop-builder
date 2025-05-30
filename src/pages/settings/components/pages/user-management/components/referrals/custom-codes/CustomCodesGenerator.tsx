import { Box, Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import AppTypography from 'components/common/typography/AppTypography'
import AppButton from 'components/redesign/button/AppButton'
import AppInput from 'components/redesign/input/AppInput'
import useAppToast from 'hooks/toast/useToast'
import { ICustomReferralCode } from 'services/shop/interfaces'
import { updateCustomReferralCodeService } from 'services/shop/shopServices'
import useAppStore from 'stores/app/appStore'
import { BUILDER_URL } from 'utils/app/variable'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function CustomCodesGenerator() {
    const { mutateAsync, isLoading } = useMutation((params: ICustomReferralCode) => updateCustomReferralCodeService(params))
    const { shop, updateState } = useAppStore()
    const { customCode } = shop.referralDetails ?? {}
    const [shopInitialCustomCode, setShopInitialCustomCode] = useState(customCode)
    const [value, setValue] = useState("")
    const { showToast } = useAppToast()
    const { t } = useLocaleResources('settings');

    const isValidLength = value?.length >= 8

    const handleCreateCustomCode = async () => {
        try {
            await mutateAsync({ customCode: value });
            updateState({
                key: 'shop',
                params: { ...shop, referralDetails: { ...shop.referralDetails, customCode: value } }
            });
            setShopInitialCustomCode(customCode)
            setValue("")
            showToast({ type: "success", message: t('settings.referrals.customCodes.success') });
        } catch (error) {
            showToast({ type: "error", message: "Failed to create custom code" });
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.replace(/\s/g, '');
        setValue(newValue);
    }

    return (
        <Flex flexDirection={"column"} gap={6}>
            <AppInput
                inputProps={{
                    placeholder: t('settings.referrals.customCodes.placeholder'),
                    value,
                    onChange: handleInputChange,
                    isDisabled: shopInitialCustomCode
                }}
                inputContainerProps={{ padding: 2, paddingLeft: 4 }}
                rightElement={
                    <>
                        {/* TODO: Check with the design */}
                        <AppButton
                            borderRadius={4}
                            isLoading={isLoading}
                            fontSize={"12px"}
                            height={"32px"}
                            paddingInline={{ base: 3, lg: 3 }}
                            padding={1}
                            onClick={handleCreateCustomCode}
                            isDisabled={!isValidLength || shopInitialCustomCode}
                        >
                            {t('settings.referrals.customCodes.createButton')}
                        </AppButton>
                    </>
                }
            />
            {shopInitialCustomCode &&
                <Flex alignItems={"center"} gap={4}>
                    <Box px={4} py={3} border={"1px solid"} borderColor="neutral.gray.800" width={"100%"} borderRadius={"8px"}>
                        <AppTypography fontSize={16} color={"neutral.white"}>
                            {shopInitialCustomCode}
                        </AppTypography>
                    </Box>
                    <ClipboardText
                        iconStyles={{
                            width: "24px",
                            height: "24px"
                        }}
                        text={`${BUILDER_URL}/?modal=signup&referral=${shopInitialCustomCode.toLowerCase()}`}
                    />
                    <AppIcons.RedTrash onClick={() => setShopInitialCustomCode("")} style={{ width: "24px", height: "24px", cursor: "pointer" }} />
                </Flex>
            }
        </Flex>
    )
}
