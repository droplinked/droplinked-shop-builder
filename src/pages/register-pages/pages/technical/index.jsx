import {
  PageContent,
  PageContentWrapper,
} from "pages/register-pages/RegisterPages-style";
import React, { useCallback, useEffect, useState } from "react";
import Ims from "./parts/ims";
import Payments from "./parts/payment";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate";
import { useLocation } from "react-router-dom";
import { useToasty } from "context/toastify/ToastContext";
import { useProfile } from "hooks/useProfile/useProfile";
import { useApi } from "hooks/useApi/useApi";
import { putUpdateShop } from "lib/apis/shopApiService";
import technicalContext, { technicalContextState } from "./context";
import { appDeveloment } from "lib/utils/app/variable";
import technicalModel from "./model";
import Wallet from "./parts/wallet";
import BasicButton from "components/shared/BasicButton/BasicButton";
import AppCard from "components/shared/card/AppCard";

// technical
function Technical() {
  const [Technical, setTechnical] = useState(technicalContextState);

  const { putApi } = useApi();
  const { updateShopData, shop } = useProfile();
  const { errorToast, successToast } = useToasty();
  const currentPath = useLocation().pathname;
  const { shopNavigate } = useCustomNavigate();
  const selector = useSelector((state) => state);

  const updateState = (key, value) => {
    setTechnical((prev) => ({ ...prev, [key]: value }));
  };

  // update Technical as state managment
  useEffect(() => {
    setTechnical({
      imsType: selector?.shop?.currentShop?.imsType || "",
    });
  }, [selector]);

  const clickSubmit = async () => {
    try {
      if (!validate().data.imsType) {
        throw Error("Required IMS Type");
      }

      const result = await putApi(putUpdateShop(Technical));

      if (result) {
        updateShopData();
        if (currentPath.includes("register")) {
          shopNavigate(`register/contact-info`);
        } else {
          successToast("Updated");
        }
      }
    } catch (error) {
      errorToast(error.message);
    }
  };

  const validate = useCallback(
    () => technicalModel.validate(Technical),
    [Technical]
  );

  return (
    <technicalContext.Provider
      value={{
        state: Technical,
        updateState,
      }}
    >
      <PageContent>
        <AppCard>
          <VStack spacing={10} align="stretch">
            <Ims />
            {appDeveloment && (
              <>
                <Payments />
                <Wallet />
              </>
            )}
            <Flex justifyContent={"right"} width={"100%"}>
              <Box>
                <BasicButton
                  size="lg"
                  disabled={!validate().data.imsType && !shop.imsTypeUpdated}
                  click={clickSubmit}
                >
                  {currentPath.includes("register")
                    ? "Save & next step"
                    : "Save"}
                </BasicButton>
              </Box>
            </Flex>
          </VStack>
        </AppCard>
      </PageContent>
    </technicalContext.Provider>
  );
}

export default Technical;
