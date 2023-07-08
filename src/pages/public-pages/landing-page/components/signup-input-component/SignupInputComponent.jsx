import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { SignupWrapper, DomainText, ShopNameInput, ErrorText } from "./SignupInputComponent-style";
import BasicButton from 'components/common/BasicButton/BasicButton';
import { useMutation } from "react-query";
import { shopService } from "lib/apis/shop/shopServices";

const SignupInputComponent = ({ setUsername, userName, toggleSignUp }) => {
  const { mutateAsync, isLoading } = useMutation((params) => shopService(params))
  const [error, setError] = useState(null);

  // onchange signup input
  const changeInputValue = (e) => {
    setUsername(e.target.value);
    setError(null);
  };

  // check shopname
  const clickSignin = async () => {
    try {
      if (!userName.length) throw Error("Please enter a name to proceed")
      if (!/^[A-Za-z0-9_]*$/.test(userName)) throw Error("Usernames may contain letters (a-z), numbers (0-9) and special characters")
      await mutateAsync({ shopName: userName })
      toggleSignUp()
    } catch (error) {
      setError(error?.response ? error?.response?.data?.data?.message : error.message)
    }
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
          <BasicButton sizes="large" width="100%" minWidth={"100%"} isLoading={isLoading} onClick={clickSignin}>Sign up </BasicButton>
        </Flex>
      </SignupWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
};

export default SignupInputComponent;
