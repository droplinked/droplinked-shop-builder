import { InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppInput from 'components/common/form/textbox/AppInput';
import AppButton from 'components/redesign/button/AppButton';
import { useFormik } from 'formik';
import useAppToast from 'hooks/toast/useToast';
import { subscribeFeature } from 'services/user/services';
import * as React from 'react';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';

function NewsLetterSubscribe() {
    const { showToast } = useAppToast();
    const location = useLocation().pathname;
    const pathname = location !== "/" ? location : "/home"
    const { mutateAsync, isLoading } = useMutation(subscribeFeature, {
        onSuccess: () => {
            showToast({ type: "success", message: "Your email address successfully subscribed" });
            formik.setValues({ email: '' });
        },
        onError: () => {
            showToast({ type: "error", message: "Something went wrong" });
        }
    });

    const handleSubmit = async () => {
        mutateAsync({ feature: pathname.replace(/^\/|[\/?]+$/g, ''), email: formik.values.email });
    };

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: handleSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <InputGroup display={"flex"} width={{ sm: "100%", md: "385px" }}>
                <InputLeftElement height={"100%"} my="auto" ml="4px">
                    <AppIcons.Email />
                </InputLeftElement>
                <AppInput
                    type='email'
                    {...formik.getFieldProps('email')}
                    width={{ sm: "100%", md: "416px" }}
                    backgroundColor={"transparent"}
                    background={"radial-gradient(100% 1915.66% at 0% 0%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.12) 100%)"}
                    className='newsLetterInput'
                    padding={"22px 50px"}
                    name='email'
                    placeholder='Enter your email address'
                    borderRadius={"88px"}
                    border={`1px solid ${formik.values.email && formik.errors.email ? "red" : "#FFFFFF3D"}`}
                    height={"48px"}
                    focusBorderColor={`1px solid ${formik.values.email && formik.errors.email ? "red" : "#FFFFFF3D"}`}
                    _focusVisible={{ border: `1px solid ${formik.values.email && formik.errors.email ? "red" : "#FFFFFF3D"}` }}
                />
                <InputRightElement display={{ sm: "none", md: "flex" }} height={"100%"} m="auto">
                    <AppButton type='submit' isDisabled={isLoading} borderRadius={"36px"} fontSize={"12px"} fontWeight={"500"} width={"82px"} height={"32px"}>{isLoading ? "Sending" : "Subscribe"}</AppButton>
                </InputRightElement>
            </InputGroup>
            <AppButton isDisabled={isLoading} type='submit' mt={"1rem"} display={{ sm: "flex", md: "none" }} borderRadius={"36px"} fontSize={"14px"} fontWeight={"500"} width={"100%"}>{isLoading ? "Sending" : "Subscribe"}</AppButton>
        </form>
    );
}

export default NewsLetterSubscribe;