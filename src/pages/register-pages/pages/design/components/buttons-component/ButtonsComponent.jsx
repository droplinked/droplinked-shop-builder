import { useContext, useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import { designContext } from "../../design-context";
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate";
import { useToasty } from "context/toastify/ToastContext";
import { useApi } from "hooks/useApi/useApi";
import { useProfile } from "hooks/useProfile/useProfile";
import { putUpdateShop } from "apis/shopApiService";
import { isValidData } from "../../utils";

import BasicButton from "components/shared/BasicButton/BasicButton";

const ButtonsComponent = () => {

  const [loading, setLoading] = useState(false);

  const { state } = useContext(designContext);
  const { shopNavigate } = useCustomNavigate();
  const { errorToast, successToast } = useToasty();
  const { putApi } = useApi();
  const { updateShopData } = useProfile();

  const currentPath = useLocation().pathname;

  const clickSubmit = async () => {
    if (!isValidData(state)) {
      errorToast("Required");
      return;
    }
    setLoading(true);
    const result = await putApi(putUpdateShop(state));
    updateShopData();
    setLoading(false);
    if (result) {
      if (currentPath.includes("register")) shopNavigate(`register/technical`);
      successToast("Updated");
    }
  };

  return (
    <Flex justifyContent={"right"} width={"100%"}>
      <Box>
        <BasicButton size="lg" click={clickSubmit} loading={loading}>
          {currentPath.includes("register") ? "Save & next step" : "Save"}
        </BasicButton>
      </Box>
    </Flex>
  );
};

export default ButtonsComponent;
