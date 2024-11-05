import * as React from "react";
import { Flex } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import AppCard from "components/common/card/AppCard";
import { useQuery } from "react-query";
import { getCurrencyList, getShopInformationService } from "lib/apis/shop/shopServices";
import Select from "components/redesign/select/AppSelect";
import technicalContext from "../../context";
import { DefaultCurrencyDescription } from "./components/DefaultCurrencyDecsription";
import { CurrencySelect } from "./components/CurrencySelect";

function DefaultCurrency() {
  const { isLoading, data } = useQuery({
    queryKey: ["currencyList"],
    queryFn: () => getCurrencyList(),
  });
  const { isLoading: shopInfoLoading, data: shopInfoData } = useQuery({
    queryKey: ["shopInfo"],
    queryFn: () => getShopInformationService(),
  });
  const { updateState, state: { currencyAbbreviation } } = React.useContext(technicalContext)
  React.useEffect(() => {
    if (!shopInfoLoading && !isLoading) {
      updateState("currencyAbbreviation", shopInfoData?.data?.data?.currency?.abbreviation)
    }
  }, [shopInfoLoading, isLoading, shopInfoData])
  const currencyData = data?.data?.data ?? [];
  return (
    <AppCard>
      <Flex direction={"column"} gap={"5px"}>
        <AppTypography
          fontSize="24px"
          fontWeight="bold"
          color={"white"}
          mb={"48px"}
        >
          Store Currency
        </AppTypography>
        <Flex direction={"row"}>
          <DefaultCurrencyDescription />
          <CurrencySelect
            isLoading={isLoading}
            shopInfoLoading={shopInfoLoading}
            currencyAbbreviation={currencyAbbreviation}
            updateState={updateState}
            currencyData={currencyData} />
        </Flex>
      </Flex>
    </AppCard>
  );
}

export default DefaultCurrency;
