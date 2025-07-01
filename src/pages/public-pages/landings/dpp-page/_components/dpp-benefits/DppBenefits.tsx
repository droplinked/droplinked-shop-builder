import { Flex, Image, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import AppTypography from "components/common/typography/AppTypography";
import SpectrumHeader from "pages/public-pages/landings/_components/spectrum-header/SpectrumHeader";
import { TFunction } from "i18next";

interface DppBenefitsProps {
  t: TFunction;
}

const getItemsData = (t: TFunction) => [
  {
    number: t('dppBenefits.items.comprehensiveLifecycleData.number'),
    title: t('dppBenefits.items.comprehensiveLifecycleData.title'),
    description: t('dppBenefits.items.comprehensiveLifecycleData.description'),
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/0374091621cced8e5006487353dfa1a473591eb58f583712e60e6cf587bc688b.png_st.png"
  },
  {
    number: t('dppBenefits.items.advancedTechnologyIntegration.number'),
    title: t('dppBenefits.items.advancedTechnologyIntegration.title'),
    description: t('dppBenefits.items.advancedTechnologyIntegration.description'),
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/ea5f4d82fb5c0f87788916c0f4d5ae51b856803268809b23f509033c0cdb9f74.png_st.png"
  },
  {
    number: t('dppBenefits.items.enhancedSustainability.number'),
    title: t('dppBenefits.items.enhancedSustainability.title'),
    description: t('dppBenefits.items.enhancedSustainability.description'),
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/00a59ce747f3846ed5c02b49f8aec02da5c491b0dc75019bf8698f2f5ea85889.png_st.png"
  },
  {
    number: t('dppBenefits.items.regulatoryCompliance.number'),
    title: t('dppBenefits.items.regulatoryCompliance.title'),
    description: t('dppBenefits.items.regulatoryCompliance.description'),
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/dff82f55158193a02724765fb78c525d5d6f07710c368d527b607b6331c3ea62.png_st.png"
  },
  {
    number: t('dppBenefits.items.userFriendlyInterface.number'),
    title: t('dppBenefits.items.userFriendlyInterface.title'),
    description: t('dppBenefits.items.userFriendlyInterface.description'),
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/b1707d01f7f1bc5352addf63ee5e9dd04603e10f1c74be50057de96a0ba2fa59.png_st.png"
  },
  {
    number: t('dppBenefits.items.dataDrivenDecisionMaking.number'),
    title: t('dppBenefits.items.dataDrivenDecisionMaking.title'),
    description: t('dppBenefits.items.dataDrivenDecisionMaking.description'),
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/8a3da8f087d91ab34cd3e5d1c8eca15564274f8227d94ad8fc70dd937bcdcd0f.png_st.png"
  },
];

const DppBenefits = ({ t }: DppBenefitsProps) => {
  const [isLargerThan1250] = useMediaQuery("(min-width: 1250px)")
  const itemsData = getItemsData(t);

  return (
    <Flex flexDirection={"column"} gap={"42px"}>
      <Flex alignItems={"center"} flexDirection={"column"} gap={"36px"}>
        <SpectrumHeader>{t('dppBenefits.title')}</SpectrumHeader>
        <AppTypography fontSize={"18px"} fontWeight={400} color={"#FFF"} textAlign={"center"}>
          {t('dppBenefits.description')}
        </AppTypography>
      </Flex>

      <Flex width={"100%"} marginBottom={isLargerThan1250 ? "227px" : "0px"}>
        {isLargerThan1250 ?
          <Flex position={"relative"} flexDirection={"column"} marginLeft={"50px"} width={"50%"}>
            <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"227px"}>
              {itemsData.filter((_, index) => index % 2 === 0).map((item) => (
                <Flex alignItems={"center"} gap={"28px"} key={item.number}>
                  <Flex width={"128px"} height={"128px"}>
                    <Image src={item.imageUrl} objectFit="contain" width={"100%"} height={"100%"} />
                  </Flex>
                  <Flex flexDirection={"column"} alignItems={"flex-start"}>
                    <Flex alignItems={"center"} gap={"12px"}>
                      <AppTypography fontSize={"48px"} fontWeight={700} color={"rgba(255, 255, 255, 0.25)"}>{item.number}</AppTypography>
                      <AppTypography fontSize={"16px"} fontWeight={700} color={"#FFF"}>{item.title}</AppTypography>
                    </Flex>
                    <AppTypography fontSize={"20px"} fontWeight={400} color={"#C2C2C2"} width={"390px"}>{item.description}</AppTypography>
                  </Flex>
                </Flex>
              ))}
            </Flex>
            <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"227px"} position={"absolute"} left={"100%"} top={"227px"}>
              {itemsData.filter((_, index) => index % 2 !== 0).map((item) => (
                <Flex alignItems={"center"} gap={"28px"} key={item.number}>
                  <Flex width={"128px"} height={"128px"}>
                    <Image src={item.imageUrl} objectFit="contain" width={"100%"} height={"100%"} />
                  </Flex>
                  <Flex flexDirection={"column"} alignItems={"flex-start"}>
                    <Flex alignItems={"center"} gap={"12px"}>
                      <AppTypography fontSize={"48px"} fontWeight={700} color={"rgba(255, 255, 255, 0.25)"}>{item.number}</AppTypography>
                      <AppTypography fontSize={"16px"} fontWeight={700} color={"#FFF"}>{item.title}</AppTypography>
                    </Flex>
                    <AppTypography fontSize={"20px"} fontWeight={400} color={"#C2C2C2"} width={"390px"}>{item.description}</AppTypography>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
          :
          <Flex flexDirection={"column"} alignItems={"center"} justifyContent={"center"} gap={"42px"} width={"100%"}>
            {itemsData.map((item) => (
              <Flex alignItems={"center"} flexDirection={"column"} gap={"28px"} key={item.number}>
                <Flex width={"128px"} height={"128px"}>
                  <Image src={item.imageUrl} objectFit="contain" width={"100%"} height={"100%"} />
                </Flex>
                <Flex flexDirection={"column"} alignItems={"center"}>
                  <Flex alignItems={"center"} gap={"12px"}>
                    <AppTypography fontSize={"48px"} fontWeight={700} color={"rgba(255, 255, 255, 0.25)"}>{item.number}</AppTypography>
                    <AppTypography fontSize={"16px"} fontWeight={700} color={"#FFF"}>{item.title}</AppTypography>
                  </Flex>
                  <AppTypography fontSize={"20px"} fontWeight={400} color={"#C2C2C2"} textAlign={"center"}>{item.description}</AppTypography>
                </Flex>
              </Flex>
            ))}
          </Flex>
        }
      </Flex>
    </Flex>
  );
}

export default DppBenefits;
