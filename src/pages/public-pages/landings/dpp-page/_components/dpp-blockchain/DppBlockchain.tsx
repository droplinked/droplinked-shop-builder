import React from "react";
import { Flex, Image } from "@chakra-ui/react";

//Components
import AppTypography from "components/common/typography/AppTypography";
import CustomHeading from "pages/public-pages/landings/parts/heading/Heading";

const dppWithBlcBenefits = [
  {
    title: "Traceability",
    benefits: ["Real-Time Tracking", "Supply Chain Insights", "Counterfeit Prevention"],
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/8189319e13867f3f38c3cc35f2a19ccf6cd0978d88d837e8ce5829552fcc7b38.png_st.png",
  },
  {
    title: "Transparency",
    benefits: ["Product History Visibility", "Public Verification", "Consistent Information"],
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/84c564db1a66734b32c22c535bbaac18ab674ddb35acb1a5ab24d5c07d0fcf46.png_st.png",
  },
  {
    title: "Security",
    benefits: ["Immutable Records", "Decentralization", "Controlled Access"],
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/4b62b0b38320a5f39b2927feb44d9ba205a3623196ed265a0e570d8e31a99f27.png_st.png",
  },
];

const DppBlockchain = () => {
  return (
    <Flex alignItems={"center"} flexDirection={"column"} gap={"40px"}>
      <CustomHeading title="Enhancing DPPs with Blockchain" textAlign={"center"} />
      <AppTypography fontSize={"24px"} fontWeight={400} color={"#FFF"} textAlign={"center"}>
        Using blockchain technology to implement Digital Product Passports (DPPs) as Non-Fungible Tokens (NFTs) can significantly enhance their value in terms of security, transparency, and traceability.
      </AppTypography>

      {/* cards */}
      <Flex justifyContent={"center"} alignItems={"flex-start"} flexDirection={{base: "column", lg: "row"}} gap={"42px"} width={"100%"}>
        {dppWithBlcBenefits.map((benefit, index) => (
          <Flex key={index} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} padding={"9px 0"} width={"100%"} maxWidth={{base: "100%", lg: "384px"}} height={"455px"} borderTop={"2px solid #2ec99e"} borderRadius={"25px"} bg={"linear-gradient(180deg, rgba(46, 201, 158, 0.10) 0%, rgba(46, 201, 158, 0.00) 50%)"}>
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
