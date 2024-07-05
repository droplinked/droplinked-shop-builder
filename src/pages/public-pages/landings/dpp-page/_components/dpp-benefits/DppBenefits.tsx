import React from "react";
import { Flex, Image, useMediaQuery } from "@chakra-ui/react";

//Components
import AppTypography from "components/common/typography/AppTypography";
import CustomHeading from "pages/public-pages/landings/parts/heading/Heading";


const itemsData = [
  {
    number: "01",
    title: "Comprehensive Lifecycle Data",
    description: "Capture and access detailed information from production to disposal, ensuring full lifecycle traceability.",
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/0374091621cced8e5006487353dfa1a473591eb58f583712e60e6cf587bc688b.png_st.png"
  },
  {
    number: "02",
    title: "Advanced Technology Integration",
    description: "Leverage state-of-the-art technologies such as blockchain, QR codes, and RFID for secure, reliable data management.",
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/ea5f4d82fb5c0f87788916c0f4d5ae51b856803268809b23f509033c0cdb9f74.png_st.png"
  },
  {
    number: "03",
    title: "Enhanced Sustainability",
    description: "Make informed decisions with insights into materials, sourcing, and environmental impact, driving sustainable practices.",
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/00a59ce747f3846ed5c02b49f8aec02da5c491b0dc75019bf8698f2f5ea85889.png_st.png"
  },
  {
    number: "04",
    title: "Regulatory Compliance Made Easy",
    description: "Stay ahead of the curve with automatic compliance updates, keeping products aligned with the latest regulations.",
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/dff82f55158193a02724765fb78c525d5d6f07710c368d527b607b6331c3ea62.png_st.png"
  },
  {
    number: "05",
    title: "User-Friendly Interface",
    description: "Our intuitive platform allows for easy access and analysis of your data, streamlining management processes.",
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/b1707d01f7f1bc5352addf63ee5e9dd04603e10f1c74be50057de96a0ba2fa59.png_st.png"
  },
  {
    number: "06",
    title: "Data-Driven Decision Making",
    description: "Utilize rich analytics and reports to make strategic decisions, enhancing product’s value and market competitiveness.",
    imageUrl: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/8a3da8f087d91ab34cd3e5d1c8eca15564274f8227d94ad8fc70dd937bcdcd0f.png_st.png"
  },
];

const DppBenefits = () => {
  const [isLargerThan1250] = useMediaQuery("(min-width: 1250px)")

  return (
    <Flex flexDirection={"column"} gap={"42px"}>
      <Flex alignItems={"center"} flexDirection={"column"} gap={"36px"}>
        <CustomHeading title="Digital Product Passport Benefits" textAlign={"center"} />
        <AppTypography fontSize={"18px"} fontWeight={400} color={"#FFF"} textAlign={"center"}>
          Our Digital Product Passport solution is designed to bring unparalleled transparency, efficiency, and sustainability to your product management. Embrace a greener, smarter way to track, manage, and report every phase of your product's journey.
        </AppTypography>
      </Flex>
      
      <Flex width={"100%"} marginBottom={isLargerThan1250 ? "227px" : "0px"}>
        {isLargerThan1250 ?
          <Flex position={"relative"} flexDirection={"column"}>
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
