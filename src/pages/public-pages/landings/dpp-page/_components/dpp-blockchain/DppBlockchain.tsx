import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { TFunction } from "i18next";

//Components
import AppTypography from "components/common/typography/AppTypography";
import SpectrumHeader from "pages/public-pages/landings/_components/spectrum-header/SpectrumHeader";

interface DppBlockchainProps {
  t: TFunction;
}

const getDppWithBlcBenefits = (t: TFunction) => [
  {
    title: t('dppBlockchain.benefits.traceability.title'),
    benefits: t('dppBlockchain.benefits.traceability.benefits', { returnObjects: true }) as string[],
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/8189319e13867f3f38c3cc35f2a19ccf6cd0978d88d837e8ce5829552fcc7b38.png_st.png",
  },
  {
    title: t('dppBlockchain.benefits.transparency.title'),
    benefits: t('dppBlockchain.benefits.transparency.benefits', { returnObjects: true }) as string[],
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/84c564db1a66734b32c22c535bbaac18ab674ddb35acb1a5ab24d5c07d0fcf46.png_st.png",
  },
  {
    title: t('dppBlockchain.benefits.security.title'),
    benefits: t('dppBlockchain.benefits.security.benefits', { returnObjects: true }) as string[],
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/4b62b0b38320a5f39b2927feb44d9ba205a3623196ed265a0e570d8e31a99f27.png_st.png",
  },
];

const DppBlockchain = ({ t }: DppBlockchainProps) => {
  const dppWithBlcBenefits = getDppWithBlcBenefits(t);

  return (
    <Flex alignItems={"center"} flexDirection={"column"} gap={"40px"}>
      <SpectrumHeader>{t('dppBlockchain.title')}</SpectrumHeader>
      <AppTypography fontSize={"24px"} fontWeight={400} color={"#FFF"} textAlign={"center"}>
        {t('dppBlockchain.description')}
      </AppTypography>

      {/* cards */}
      <Flex justifyContent={"center"} alignItems={"flex-start"} flexDirection={{ base: "column", lg: "row" }} gap={"42px"} width={"100%"}>
        {dppWithBlcBenefits.map((benefit, index) => (
          <Flex key={index} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} padding={"9px 0"} width={"100%"} maxWidth={{ base: "100%", lg: "384px" }} height={"455px"} borderTop={"2px solid #2ec99e"} borderRadius={"25px"} bg={"linear-gradient(180deg, rgba(46, 201, 158, 0.10) 0%, rgba(46, 201, 158, 0.00) 50%)"}>
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
