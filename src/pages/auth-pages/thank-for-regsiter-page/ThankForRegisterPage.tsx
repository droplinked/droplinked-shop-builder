import { Box } from "@chakra-ui/react";
import BasicButton from "components/common/BasicButton/BasicButton";
import useAppToast from "functions/hooks/toast/useToast";
import { IresendEmailService } from "lib/apis/user/interfaces";
import { resendEmailService } from "lib/apis/user/services";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { EmailText, MessageText, ThankPageWrapper, ThankText } from "./ThankForRegisterPage-style";
import AppTypography from "components/common/typography/AppTypography";

export default function ThankForRegisterPage() {
    const { mutateAsync } = useMutation((params: IresendEmailService) => resendEmailService(params));
    // use this state for loading state of button when calling api
    const [loading, setLoading] = useState(false);
    const { showToast } = useAppToast();

    // get email from localhost for show register email in text
    let email = JSON.parse(localStorage.getItem("registerEmail"));

    const resend = async () => {
        try {
            // call resent email api
            setLoading(true);
            await mutateAsync({ email });
            setLoading(false);
            // if get error from api
            showToast({ message: "A new link was sent to your email", type: "success" });
        } catch (error) {
            showToast({ message: error?.response?.data?.message[0], type: "error" });
            setLoading(false);
        }
    };

    return (
        <Box display="flex" width="100%" px={{ base: "20px", md: "80px" }} height="auto" flexDirection="column" alignItems="center" padding={"250px 0"}>
            <AppTypography color="#fff" fontSize={{ base: "30px", sm: "40px", md: "50px", lg: "60px" }} mb="10px">
                Thank you!
            </AppTypography>
            <AppTypography color="#fff" fontWeight="400" textAlign="center" fontSize={{ base: "12px", sm: "14px", md: "16px", lg: "22px" }} mb={{ base: "40px", md: "50px" }}>
                We have sent a verification email to
                <span style={{ color: "#fff", backgroundColor: "transparent", fontStyle: "avenir", fontWeight: "600" }}> "{email}"</span>. Check inbox to verify your email.
            </AppTypography>
            <Box w={{ sm: "150px", md: "200px" }}>
                <BasicButton onClick={resend} isLoading={loading}>
                    Resend the link
                </BasicButton>
            </Box>
        </Box>
    );
}
