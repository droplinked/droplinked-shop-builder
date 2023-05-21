import { useContext } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { designContext } from "../../design-context";
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate";
import { useProfile } from "hooks/useProfile/useProfile";
import BasicButton from "common/BasicButton/BasicButton";
import DesignRegisterMdel from "./model";
import AppErrors from "lib/utils/statics/errors/errors";
import { toast } from "react-toastify";

const ButtonsComponent = () => {

  const { state } = useContext(designContext);
  const { shopNavigate } = useCustomNavigate();
  const { setShopData: { loading, update } } = useProfile();
  const { validation } = DesignRegisterMdel
  const currentPath = useLocation().pathname;

  const clickSubmit = async () => {
    try {
      await validation(state)
      await update(state)
      if (currentPath.includes("register")) {
        shopNavigate(`register/technical`)
      } else {
        toast.success(AppErrors.store.has_been_updated("Store design"))
      }
    } catch (error) {
      toast.error(error?.errors ? error.errors[0] : "Oops! Something went wrong");
    }
  };

  return (
    <Flex justifyContent={"right"} width={"100%"}>
      <Box>
        <BasicButton sizes="large" onClick={clickSubmit} isLoading={loading}>
          {currentPath.includes("register") ? "Next" : "Update"}
        </BasicButton>
      </Box>
    </Flex>
  );
};

export default ButtonsComponent;
