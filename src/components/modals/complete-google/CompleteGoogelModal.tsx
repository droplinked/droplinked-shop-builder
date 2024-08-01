import { Stack, VStack } from "@chakra-ui/react";
import BasicButton from "components/common/BasicButton/BasicButton";
import AppInput from "components/common/form/textbox/AppInput";
import AppModal from "components/common/modal/AppModal";
import { Form, Formik } from "formik";
import useAppToast from "functions/hooks/toast/useToast";
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import useAppStore from "lib/stores/app/appStore";
import { navigating_user_based_on_status } from "lib/utils/heper/helpers";
import { usernameRegex } from "lib/utils/heper/regex";
import { MODAL_TYPE } from "pages/public-pages/homePage/HomePage";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";

const CompleteGoogelModal = ({ show, close, switchModal }: { show: boolean; close: () => void; switchModal: (type: MODAL_TYPE) => void }) => {
    const [searchParams] = useSearchParams();
    const { login, loading } = useAppStore();
    const { showToast } = useAppToast();
    const { shopNavigate } = useCustomNavigate();
    const navigate = useNavigate();
    const formSchema = Yup.object().shape({
        username: Yup.string().matches(usernameRegex, "Username can contain letters (a-z), numbers (0-9) and underscores.").required("Required"),
        referral: Yup.string(),
    });
    const access_token = useMemo(() => searchParams.get("access_token"), [searchParams]);
    const refresh_token = useMemo(() => searchParams.get("refresh_token"), [searchParams]);
    const condition_to_kick_user_from_here = !access_token || !refresh_token || access_token === "" || refresh_token === "" || searchParams.get("modal") !== "google";

    useEffect(() => {
        if (condition_to_kick_user_from_here) switchModal(MODAL_TYPE.SIGNUP);
    }, [searchParams]);
    const onSubmit = async (data: any) => {
        try {
            if (condition_to_kick_user_from_here) throw Error("You cannot complete your process right now!");
            const { username, referral } = data;
            const params = { username, referralCode: referral && referral !== "" ? referral : undefined, access_token };
            const results = await login({ type: "google", access_token, refresh_token, params });
            if (results) {
                showToast({ message: "Account successfully created", type: "success" });
                close();
                const status = data.user.status;
                const { href, dashboard } = navigating_user_based_on_status(status, data);
                dashboard ? shopNavigate(href) : navigate(href)
            }
        } catch (error) {
            showToast({ message: error?.response?.data?.data?.message, type: "error" });
        }
    };

    return (
        <AppModal open={show} title="Sign Up" close={close}>
            <Formik
                initialValues={{
                    username: "",
                    referral: searchParams.get("referral") || "",
                }}
                validateOnChange={false}
                validationSchema={formSchema}
                onSubmit={onSubmit}
            >
                {({ errors, values, setFieldValue }) => (
                    <Form>
                        <VStack align={"stretch"} spacing={"32px"}>
                            <Stack w="100%" h="100%" spacing="16px">
                                <AppInput
                                    error={errors?.username ? errors.username.toString() : ""}
                                    name="username"
                                    onChange={(e) => setFieldValue("username", e.target.value)}
                                    value={values.username}
                                />
                                <AppInput
                                    name="referral"
                                    placeholder="Referral Code"
                                    onChange={(e) => setFieldValue("referral", e.target.value)}
                                    value={values.referral}
                                    isDisabled={Boolean(searchParams.get("referral"))}
                                />
                            </Stack>
                            <BasicButton type="submit" isLoading={loading}>
                                Complete Sign Up
                            </BasicButton>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </AppModal>
    );
};

export default CompleteGoogelModal;
