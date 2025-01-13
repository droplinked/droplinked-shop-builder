import { Flex } from "@chakra-ui/react"
import AppCard from "components/common/card/AppCard"
import AppTypography from "components/common/typography/AppTypography"
import CurrencySelect from "components/redesign/select/CurrencySelect"
import useAppStore from "lib/stores/app/appStore"
import React, { useContext } from "react"
import technicalContext from "../../context"
import { DefaultCurrencyDescription } from "./components/DefaultCurrencyDecsription"

function DefaultCurrency() {
  const { shop: { currency } } = useAppStore()
  const { updateState, state: { currencyAbbreviation } } = useContext(technicalContext)

  return (
    <AppCard>
      <Flex direction="column">
        <AppTypography mb={12} fontSize={24} fontWeight="bold" color="white">
          Store Currency
        </AppTypography>

        <Flex gap={4}>
          <DefaultCurrencyDescription />
          <CurrencySelect
            width="50%"
            value={currencyAbbreviation || currency?.abbreviation}
            onChange={(e) => updateState("currencyAbbreviation", e.target.value)}
          />
        </Flex>
      </Flex>
    </AppCard>
  )
}

export default DefaultCurrency