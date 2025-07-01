import { Flex } from "@chakra-ui/react";
import React from "react";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

//Components
import AppTypography from "components/common/typography/AppTypography";
import Layout from "../_components/layout/Layout";
import SpectrumHeader from "../_components/spectrum-header/SpectrumHeader";
import DppBenefits from "./_components/dpp-benefits/DppBenefits";
import DppBlockchain from "./_components/dpp-blockchain/DppBlockchain";
import DppChart from "./_components/dpp-chart/DppChart";
import DppContactUs from "./_components/dpp-contact-us/DppContactUs";
import ProductPassport from "./_components/product-passport/ProductPassport";
import localEn from 'locales/public-pages/landings/dpp-page/en.json';
import localAr from 'locales/public-pages/landings/dpp-page/ar.json';


const DppPage = () => {
  const { t } = useLocaleResources('public-pages/landings/dpp-page', { en: localEn , ar: localAr })

  return (
    <Layout>
      <Flex width={"100%"} direction={"column"} alignItems={"center"} gap={"100px"}>

        {/* section 1 */}
        <Flex flexDirection={"column"} alignItems={"center"} gap={"30px"}>
          <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"} gap={"10px"} textAlign={"center"} width={"100%"}>
            <SpectrumHeader maxWidth={"760px"}>{t('section1.title')}</SpectrumHeader>
            <AppTypography fontSize={"26px"} fontWeight={400} color={"#C2C2C2"} textAlign={"center"}>
              {t('section1.description')}
            </AppTypography>
          </Flex>
          <ProductPassport t={t} />
        </Flex>

        {/* section 2 */}
        <Flex alignItems={"center"} flexDirection={"column"} gap={"20px"}>
          <SpectrumHeader>{t('section2.title')}</SpectrumHeader>
          <AppTypography fontSize={"24px"} fontWeight={400} textAlign={"center"} color={"#FFF"}>{t('section2.description')}</AppTypography>
        </Flex>

        {/* section 3 */}
        <DppBenefits t={t} />

        {/* section 4 */}
        <DppBlockchain t={t} />

        {/* section 5 */}
        <Flex alignItems={"center"} flexDirection={"column"} gap={"20px"}>
          <SpectrumHeader>{t('section5.title')}</SpectrumHeader>
          <AppTypography fontSize={"24px"} fontWeight={400} textAlign={"center"} color={"#FFF"}>{t('section5.description')}</AppTypography>
        </Flex>

        {/* section 6 */}
        <DppChart t={t} />

        {/* section 7 */}
        <DppContactUs t={t} />
      </Flex>
    </Layout>
  )
}

export default DppPage;
