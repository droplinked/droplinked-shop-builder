import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassPage-style.scss";
import BasicButton from 'components/common/BasicButton/BasicButton';
import useAppToast from "functions/hooks/toast/useToast";
import AppCard from 'components/common/card/AppCard';
import { Flex, VStack } from "@chakra-ui/react";
import AppInput from 'components/common/form/textbox/AppInput';
import AppTypography from 'components/common/typography/AppTypography';
import { useMutation } from "react-query";
import { IchangePasswordService } from "lib/apis/user/interfaces";
import { changePasswordService } from "lib/apis/user/services";

export default function ResetPassPage() {
  const { mutateAsync } = useMutation((params: IchangePasswordService) => changePasswordService(params))
  const [newPass, setNewpass] = useState("");
  const [confirmnewPass, setConfirmNewpass] = useState("");
  const [confirmError, setConfirmError] = useState(false);
  const [btnActivd, setBtnActivd] = useState(false);
  const { showToast } = useAppToast()

  let navigate = useNavigate();
  let token = useParams().token;

  const changeConfirmPass = (e: any) => {
    setConfirmNewpass(e.target.value);
    setConfirmError(false);
  };

  const changePassword = async () => {
    if (newPass !== confirmnewPass) {
      setConfirmError(true);
      return;
    }

    setBtnActivd(true);
    try {
      await mutateAsync({ accountRecoveryToken: token, newPassword: newPass })
      showToast("Confirmation email sent! Please check your inbox and follow the instructions to reset your account password.", "success");
      navigate("/?modal=login");
    } catch (error) {
      navigate("/")
    }
  };

  return (
    <Flex justifyContent={"center"} margin="60px 0">
      <AppCard mini maxWidth="600px">
        <VStack align={"stretch"} spacing={6}>
          <Flex justifyContent={"center"}>
            <AppTypography size="18px" weight="bolder">Set your new password</AppTypography>
          </Flex>
          <AppInput
            type={"password"}
            name={"password"}
            isRequired
            label={"New password"}
            value={newPass}
            onChange={(e) => {
              setNewpass(e.target.value);
            }}
          />
          <AppInput
            isRequired
            type={"password"}
            name={"Confirm password"}
            label={"Confirm password"}
            value={confirmnewPass}
            onChange={changeConfirmPass}
          />
          {confirmError && (<p className="error">{`Password and confirm password don't match.`}</p>)}
          <BasicButton onClick={changePassword} isDisabled={btnActivd}>
            Save new password
          </BasicButton>
        </VStack>
      </AppCard>
    </Flex>
  );
}
