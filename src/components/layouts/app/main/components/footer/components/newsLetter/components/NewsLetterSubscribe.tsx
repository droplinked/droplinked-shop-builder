import { InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppInput from 'components/common/form/textbox/AppInput';
import Button from 'pages/invoice-management/components/Button';
import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAppToast from 'functions/hooks/toast/useToast';

function NewsLetterSubscribe() {
    const { showToast } = useAppToast()
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: (values) => {
            try {
                showToast({ message: "Your email address successfully subscribed", type: "success" })
            } catch (error) {
                showToast({ message: "Something went wrong", type: "error" })
            } finally {
                formik.setValues({ email: '' })
            }
        },
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
                    <Button type='submit' borderRadius={"36px"} fontSize={"12px"} fontWeight={"500"} width={"82px"} height={"32px"}>Subscribe</Button>
                </InputRightElement>
            </InputGroup>
            <Button type='submit' mt={"1rem"} display={{ sm: "flex", md: "none" }} borderRadius={"36px"} fontSize={"14px"} fontWeight={"500"} width={"100%"}>Subscribe</Button>
        </form>
    );
}

export default NewsLetterSubscribe;