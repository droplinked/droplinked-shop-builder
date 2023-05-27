import { useCallback, useContext } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { designContext } from "../../design-context";
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate";
import { useProfile } from "hooks/useProfile/useProfile";
import BasicButton from 'components/common/BasicButton/BasicButton';
import DesignRegisterMdel from "./model";
import AppErrors from "lib/utils/statics/errors/errors";
import useAppToast from "hooks/toast/useToast";

const ButtonsComponent = () => {
  const { state, methods: { resetState } } = useContext(designContext);
  const { shopNavigate } = useCustomNavigate();
  const { setShopData: { loading, update } } = useProfile();
  const { validation } = DesignRegisterMdel
  const currentPath = useLocation().pathname
  const { showToast } = useAppToast()
  const isRegister = currentPath.includes("register")

  const clickSubmit = async () => {
    try {
      await validation(state)
      await update(state)
      if (isRegister) {
        shopNavigate(`register/technical`)
      } else {
        showToast(AppErrors.store.has_been_updated("Store design"), "success")
      }
    } catch (error) {
      showToast(error?.errors ? error.errors[0] : "Oops! Something went wrong", "error");
    }
  };

  return (
    <Flex justifyContent={isRegister ? "space-between" : "right"} width={"100%"}>
      {isRegister && (
        <Box>
          <BasicButton variant="outline" onClick={() => shopNavigate(`register/shop-info`)}>Back</BasicButton>
        </Box>
      )}
      <Flex gap={4}>
        {isRegister && <BasicButton sizes="large" variant="ghost" onClick={resetState}>Reset</BasicButton>}
        <BasicButton sizes="large" onClick={clickSubmit} isLoading={loading}>
          {isRegister ? "Next" : "Update"}
        </BasicButton>
      </Flex>
    </Flex>
  );
};

export default ButtonsComponent;
