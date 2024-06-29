import React from "react";
import { Flex } from "@chakra-ui/react";

//Components
import CustomHeading from "../parts/heading/Heading";
import Layout from "../parts/layout/Layout";
import AppTypography from "components/common/typography/AppTypography";
import ProductPassport from "./_components/product-passport/ProductPassport";
import DppBenefits from "./_components/dpp-benefits/DppBenefits";
import DppBlockchain from "./_components/dpp-blockchain/DppBlockchain";
import DppChart from "./_components/dpp-chart/DppChart";
import DppContactUs from "./_components/dpp-contact-us/DppContactUs";


const DppPage = () => {

  return (
    <Layout>
      <Flex width={"100%"} direction={"column"} alignItems={"center"} gap={"100px"}>

        {/* section 1 */}
        <Flex flexDirection={"column"} alignItems={"center"} gap={"30px"}>
          <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"} gap={"10px"} textAlign={"center"} width={"100%"}>
            <CustomHeading title="Futureproof your organization's product lifecycle management" textAlign={"center"} fontSize={"48px"} fontWeight={700} maxWidth={"760px"} />
            <AppTypography fontSize={"26px"} fontWeight={400} color={"#C2C2C2"} textAlign={"center"}>
              Droplinked’s Digital Product Passport provides attribution efficiency andcompliance for inventory management at scale.
            </AppTypography>
          </Flex>
          <ProductPassport />  
        </Flex>

        {/* section 2 */}
        <DppBenefits />

        {/* section 3 */}
        <DppBlockchain />

        {/* section 4 */}
        <Flex alignItems={"center"} flexDirection={"column"} gap={"20px"}>
          <CustomHeading title="Provide Comprehensive Product Information" fontSize={"48px"} fontWeight={600} textAlign={"center"} />
          <AppTypography fontSize={"24px"} fontWeight={400} textAlign={"center"} color={"#FFF"}>Offer customers detailed insights into product specifications, materials, and production processes for clear purchase transparency.</AppTypography>
        </Flex>

        {/* section 5 */}
        <DppChart />
        
        {/* contact us */}
        <DppContactUs />
          
      </Flex>
    </Layout>
  )
}

export default DppPage;
