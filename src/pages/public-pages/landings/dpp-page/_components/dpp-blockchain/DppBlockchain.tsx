import React from "react";
import { Flex, Image } from "@chakra-ui/react";

//Components
import AppTypography from "components/common/typography/AppTypography";
import CustomHeading from "pages/public-pages/landings/parts/heading/Heading";

const dppWithBlcBenefits = [
  {
    title: "Traceability",
    benefits: ["Real-Time Tracking", "Supply Chain Insights", "Counterfeit Prevention"],
    imageUrl: "assets/images/dpp-page/img-traceability.png",
  },
  {
    title: "Transparency",
    benefits: ["Product History Visibility", "Public Verification", "Consistent Information"],
    imageUrl: "assets/images/dpp-page/img-transparency.png",
  },
  {
    title: "Security",
    benefits: ["Immutable Records", "Decentralization", "Controlled Access"],
    imageUrl: "assets/images/dpp-page/img-security.png",
  },
];

const DppBlockchain = () => {
  return (
    <Flex alignItems={"center"} flexDirection={"column"} gap={"40px"}>
      <CustomHeading title="Enhancing DPPs with Blockchain" textAlign={"center"} fontSize={"48px"} fontWeight={600} />
      <AppTypography fontSize={"24px"} fontWeight={400} color={"#FFF"} textAlign={"center"}>
        Using blockchain technology to implement Digital Product Passports (DPPs) as Non-Fungible Tokens (NFTs) can significantly enhance their value in terms of security, transparency, and traceability.
      </AppTypography>

      {/* cards */}
      <Flex justifyContent={"center"} alignItems={"flex-start"} gap={"42px"}>
        {dppWithBlcBenefits.map((benefit, index) => (
          <Flex key={index} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} padding={"9px 0"} maxWidth={"384px"} height={"455px"} borderTop={"2px solid #2ec99e"} borderRadius={"25px"} bg={"linear-gradient(180deg, rgba(46, 201, 158, 0.10) 0%, rgba(46, 201, 158, 0.00) 50%)"}>
            <Flex flexDirection={"column"} alignItems={"center"} gap={"10px"}>
              <AppTypography fontSize={"36px"} fontWeight={700} color={"#2BCFA1"}>{benefit.title}</AppTypography>
              {benefit.benefits.map((item, idx) => (
                <AppTypography key={idx} fontSize={"20px"} fontWeight={700} color={"#FFF"}>{item}</AppTypography>
              ))}
            </Flex>
            <Flex width={"255px"} height={"186px"}>
              <Image src={benefit.imageUrl} objectFit={"contain"} width={"100%"} height={"100%"} />
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default DppBlockchain;
