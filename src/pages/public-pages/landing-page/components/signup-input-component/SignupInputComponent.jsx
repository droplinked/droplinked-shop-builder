import { useState } from "react";
import { Flex, Image } from "@chakra-ui/react";
import { useApi } from "../../../../../hooks/useApi/useApi"
import { getIsShopExist } from "../../../../../apis/shopApiService";
import {
  SignupWrapper,
  DomainText,
  ShopNameInput,
  SignupButton,
  ErrorText,
} from "./SignupInputComponent-style";

import BasicButton from "../../../../../components/shared/BasicButton/BasicButton"
import alertIcon from "../../../../../assest/icon/alert.png";

const SignupInputComponent = ({ setUsername, userName, toggleSignUp }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { getApi } = useApi()

  const ERRORS_TYPE = {
    EMPTY_ERROR: "Please enter a name to proceed",
    VALIDATION_ERROR:
      "Usernames may contain letters (a-z), numbers (0-9) and special characters",
  };

  // onchange signup input
  const changeInputValue = (e) => {
    setUsername(e.target.value);
    setError(null);
  };

  // check shopname
  const clickSignin = async () => {
    // validation shop name
    if (userName.trim() == "") {
      setError(ERRORS_TYPE.EMPTY_ERROR);
      return;
    }
    if (!/^[A-Za-z0-9_]*$/.test(userName)) {
      setError(ERRORS_TYPE.VALIDATION_ERROR);
      return;
    }

    setLoading(true);
    let result = await getApi(getIsShopExist(userName))
    if (result) toggleSignUp();
    setLoading(false);
  };

  return (
    <>
      <SignupWrapper>
        <Flex justifyContent="start" w="75%" maxW="75%">
          <DomainText>droplinked.com/</DomainText>
          <ShopNameInput
            type="text"
            placeholder="username"
            onChange={changeInputValue}
            value={userName}
          />
        </Flex>
        <Flex w="25%">
          <SignupButton >
            <BasicButton loading={loading} click={clickSignin}>Sign up </BasicButton>
            {/* {loading ? <Spinner color="white" thickness="4px" /> : <>Sign up</>} */}
          </SignupButton>
        </Flex>
      </SignupWrapper>
      {error && (
        <Flex h="30px" w="100%" mt={{ base: "12px", md: "0.8vw" }}>
          <Image w="20px" h="20px" m="auto 0px" src={alertIcon} alt="" />
          <ErrorText>{error}</ErrorText>
        </Flex>
      )}
    </>
  );
};

export default SignupInputComponent;
