import { Flex, useOutsideClick } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import BasicButton from "components/common/BasicButton/BasicButton";
import ClipboardText from "components/common/clipboardText/ClipboardText";
import AppInput from "components/common/form/textbox/AppInput";
import AppTypography from "components/common/typography/AppTypography";
import { useFormik } from "formik";
import WithPermission from "functions/hoc/shop-permissions/WithPermission";
import useDebounce from "functions/hooks/debounce/useDebounce";
import useAppToast from "functions/hooks/toast/useToast";
import { ICustomReferralCode } from "lib/apis/shop/interfaces";
import { updateCustomReferralCodeService } from "lib/apis/shop/shopServices";
import { BUILDER_URL } from "lib/utils/app/variable";
import React, { useRef, useState, useTransition } from "react";
import { useMutation } from "react-query";
import { object, string } from "yup";
import { IShopInfoChildProps } from "../../ShopInfo";

const ReferralCode = ({ States: { referralDetails: { code, customCode, percent } }, updateStates }: IShopInfoChildProps) => {
    const { mutateAsync, isLoading: referral_update_loading } = useMutation((params: ICustomReferralCode) => updateCustomReferralCodeService(params))
    const [pending, start_transition] = useTransition();
    const [enable, set_enable] = useState<boolean>(false);
    const { showToast } = useAppToast();
    const ref = useRef();
    const update_referral = async (values, actions) => await mutateAsync({ customCode: values.customCode }).then((res) => updateStates('referralDetails', res.data.data)).catch((err) => actions.setFieldError('customCode', err.response.data.data.message))
    const { values, handleSubmit, handleChange, setFieldValue, setFieldError, errors } = useFormik({ initialValues: { customCode }, validationSchema: object().shape({ customCode: string().matches(/^[A-Za-z0-9_]+$/, 'Invalid format').required("Required") }), validateOnChange: false, onSubmit: update_referral });
    useOutsideClick({ ref, handler: () => { start_transition(() => { set_enable(false); setFieldValue('customCode', customCode); setFieldError("customCode", null) }) } });
    const debounced_code = useDebounce(values?.customCode);
    return (
        <Flex direction="column" gap="36px">
            <Flex direction="column" gap="8px"><AppTypography fontSize="18px" fontWeight="bold">Referral Code</AppTypography><AppTypography fontSize="16px" color="lightGray">Earn more with every referral! When someone joins the community using your code, you receive 15% commission of any plan or subscription.</AppTypography></Flex>

            <WithPermission requiredPermission="create_referral_code" >
                <Flex direction="column" gap="12px">
                    <AppTypography fontSize="16px" fontWeight={500} color="lightGray">Referral Link</AppTypography>
                    <Flex justifyContent="space-between" alignItems="center"><AppTypography fontSize="16px" fontWeight={400} color="lightGray">{`${BUILDER_URL}/?modal=signup&referral=${code.toLowerCase()}`}</AppTypography><ClipboardText text={`${BUILDER_URL}/?modal=signup&referral=${code.toLowerCase()}`} /></Flex>
                    <Flex gap="8px" alignItems="center"><AppIcons.InfoIcon /><AppTypography color="lightGray" fontSize="12px" fontWeight="400">Users also have the option to enter the code <span style={{ fontWeight: 700 }}>{code}</span> in their signup form.</AppTypography></Flex>
                </Flex>
                <Flex direction="column" gap="12px"><AppTypography fontSize="16px" fontWeight={500} color="lightGray">Custom Referral Code</AppTypography>
                    <Flex direction="column" gap="8px"><AppTypography fontSize="14px" fontWeight={500} color="#808080">Create and share your personalized referral code and share it with anyone.</AppTypography>
                        <form ref={ref} onSubmit={handleSubmit}>
                            <Flex alignItems="center" backgroundColor={"bG"} paddingRight="7.5px" rounded="8px" style={{ border: `1px solid ${errors.customCode ? '#E63F43' : 'transparent'}` }}>
                                <AppInput isReadOnly={!enable} value={values.customCode} placeholder="Your custom referral code" onChange={handleChange} id="customCode" name="customCode" border="none" />
                                {!enable ?
                                    (<Flex gap="8px" alignItems="center">
                                        <BasicButton py="12px" px="14px" minW="auto" variant="ghost" sizes="medium" onClick={() => { navigator.clipboard.writeText(`${BUILDER_URL}/?modal=signup&referral=${customCode}`); showToast({ message: "Copied", type: "info", options: { autoClose: 200, hideProgressBar: true } }) }}>Copy Link</BasicButton>
                                        <BasicButton py="12px" px="14px" minW="auto" sizes="medium" onClick={() => set_enable(true)}>Edit</BasicButton>
                                    </Flex>) : (<BasicButton isLoading={referral_update_loading} type="submit" py="12px" px="14px" minW="auto" variant="ghost" sizes="medium" onClick={() => { }}>Create</BasicButton>)}
                            </Flex>
                            {errors.customCode && <AppTypography fontWeight={'500'} fontSize={"14px"} mt={'8px'} color='error'>{errors.customCode}</AppTypography>}
                        </form>
                    </Flex>
                </Flex>
            </WithPermission>
        </Flex>
    );
};

export default ReferralCode;
