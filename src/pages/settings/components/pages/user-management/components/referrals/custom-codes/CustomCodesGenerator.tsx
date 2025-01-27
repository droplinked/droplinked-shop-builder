import { Box, Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import Button from 'components/redesign/button/Button'
import Input from 'components/redesign/input/Input'
import useAppToast from 'functions/hooks/toast/useToast'
import { ICustomReferralCode } from 'lib/apis/shop/interfaces'
import { updateCustomReferralCodeService } from 'lib/apis/shop/shopServices'
import useAppStore from 'lib/stores/app/appStore'
import { BUILDER_URL } from 'lib/utils/app/variable'
import React, { useState } from 'react'
import { useMutation } from 'react-query'

export default function CustomCodesGenerator() {
    const { mutateAsync, isLoading } = useMutation((params: ICustomReferralCode) => updateCustomReferralCodeService(params))
    const { shop, updateState } = useAppStore()
    const { customCode } = shop.referralDetails ?? {}
    const [shopInitialCustomCode, setShopInitialCustomCode] = useState(customCode)
    const [value, setValue] = useState("")
    const { showToast } = useAppToast()

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
            showToast({ type: "success", message: "Custom code updated successfully" });
        } catch (error) {
            showToast({ type: "error", message: "Failed to create custom code" });
        }
    }
    const handleCopyLink = () => {
        const link = `${BUILDER_URL}/?modal=signup&referral=${shopInitialCustomCode.toLowerCase()}`;
        navigator.clipboard.writeText(link)
        showToast({ type: "success", message: "Custom code copied successfully" })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.replace(/\s/g, '');
        setValue(newValue);
    }

    return (
        <Flex flexDirection={"column"} gap={6}>
            <Input
                inputProps={{
                    placeholder: "Type a custom code or text without any spaces (minimum 8 characters)",
                    value,
                    onChange: handleInputChange,
                    isDisabled: shopInitialCustomCode
                }}
                inputContainerProps={{ padding: 2, paddingLeft: 4 }}
                rightElement={
                    <>
                        <Button
                            borderRadius={4}
                            isLoading={isLoading}
                            fontSize={"12px"}
                            height={"32px"}
                            paddingInline={{ base: 3, lg: 3 }}
                            padding={1}
                            onClick={handleCreateCustomCode}
                            isDisabled={!isValidLength || shopInitialCustomCode}
                        >
                            Create
                        </Button>
                    </>
                }
            />
            {shopInitialCustomCode &&
                <Flex alignItems={"center"} gap={4}>
                    <Box px={4} py={3} border={"1px solid #292929"} width={"100%"} borderRadius={"8px"}>
                        <AppTypography fontSize={16} color={"#fff"}>
                            {shopInitialCustomCode}
                        </AppTypography>
                    </Box>
                    <AppIcons.Copy onClick={handleCopyLink} style={{ width: "24px", height: "24px", cursor: "pointer" }} />
                    <AppIcons.RedTrash onClick={() => setShopInitialCustomCode("")} style={{ width: "24px", height: "24px", cursor: "pointer" }} />
                </Flex>
            }
        </Flex>
    )
}
