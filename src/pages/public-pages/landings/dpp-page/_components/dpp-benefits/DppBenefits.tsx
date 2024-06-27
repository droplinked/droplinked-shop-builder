import React from "react";
import { Flex, Image } from "@chakra-ui/react";

//Components
import AppTypography from "components/common/typography/AppTypography";
import CustomHeading from "pages/public-pages/landings/parts/heading/Heading";

const DppBenefits = () => {
  return (
    <Flex flexDirection={"column"} gap={"42px"}>
      <Flex alignItems={"center"} flexDirection={"column"} gap={"36px"}>
        <CustomHeading title="Digital Product Passport Benefits" textAlign={"center"} fontSize={"48px"} fontWeight={600} />
        <AppTypography fontSize={"18px"} fontWeight={400} color={"#FFF"} textAlign={"center"}>Our Digital Product Passport solution is designed to bring unparalleled transparency, efficiency, and sustainability to your product management. Embrace a greener, smarter way to track, manage, and report every phase of your product's journey.</AppTypography>
      </Flex>
      
      <Flex width={"100%"} marginBottom={"227px"}>
        <Flex position={"relative"}>
          <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"227px"}>
            <Flex alignItems={"center"} gap={"28px"}>
              <Flex width={"128px"} height={"128px"}>
                <Image src="assets/images/dpp-page/img9.png" objectFit="contain" width={"100%"} height={"100%"} />
              </Flex>
              <Flex flexDirection={"column"} alignItems={"flex-start"}>
                <Flex alignItems={"center"} gap={"12px"}>
                  <AppTypography fontSize={"48px"} fontWeight={700} color={"rgba(255, 255, 255, 0.25)"}>01</AppTypography>
                  <AppTypography fontSize={"16px"} fontWeight={700} color={"#FFF"} width={"164px"}>Comprehensive Lifecycle Data</AppTypography>
                </Flex>
                <AppTypography fontSize={"20px"} fontWeight={400} color={"#C2C2C2"} width={"390px"}>Capture and access detailed information from production to disposal, ensuring full lifecycle traceability.</AppTypography>
              </Flex>
            </Flex>
            <Flex alignItems={"center"} gap={"28px"}>
              <Flex width={"128px"} height={"128px"}>
                <Image src="assets/images/dpp-page/img11.png" objectFit="contain" width={"100%"} height={"100%"} />
              </Flex>
              <Flex flexDirection={"column"} alignItems={"flex-start"}>
                <Flex alignItems={"center"} gap={"12px"}>
                  <AppTypography fontSize={"48px"} fontWeight={700} color={"rgba(255, 255, 255, 0.25)"}>03</AppTypography>
                  <AppTypography fontSize={"16px"} fontWeight={700} color={"#FFF"} width={"164px"}>Enhanced Sustainability</AppTypography>
                </Flex>
                <AppTypography fontSize={"20px"} fontWeight={400} color={"#C2C2C2"} width={"390px"}>Make informed decisions with insights into materials, sourcing, and environmental impact, driving sustainable practices.</AppTypography>
              </Flex>
            </Flex>
            <Flex alignItems={"center"} gap={"28px"}>
              <Flex width={"128px"} height={"128px"}>
                <Image src="assets/images/dpp-page/img13.png" objectFit="contain" width={"100%"} height={"100%"} />
              </Flex>
              <Flex flexDirection={"column"} alignItems={"flex-start"}>
                <Flex alignItems={"center"} gap={"12px"}>
                  <AppTypography fontSize={"48px"} fontWeight={700} color={"rgba(255, 255, 255, 0.25)"}>05</AppTypography>
                  <AppTypography fontSize={"16px"} fontWeight={700} color={"#FFF"} width={"164px"}>User-Friendly Interface</AppTypography>
                </Flex>
                <AppTypography fontSize={"20px"} fontWeight={400} color={"#C2C2C2"} width={"390px"}>Our intuitive platform allows for easy access and analysis of your data, streamlining management processes.</AppTypography>
              </Flex>
            </Flex>
          </Flex>
          <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"227px"} position={"absolute"} left={"100%"} top={"227px"}>
            <Flex alignItems={"center"} gap={"28px"}>
              <Flex width={"128px"} height={"128px"}>
                <Image src="assets/images/dpp-page/img10.png" objectFit="contain" width={"100%"} height={"100%"} />
              </Flex>
              <Flex flexDirection={"column"} alignItems={"flex-start"}>
                <Flex alignItems={"center"} gap={"12px"}>
                  <AppTypography fontSize={"48px"} fontWeight={700} color={"rgba(255, 255, 255, 0.25)"}>02</AppTypography>
                  <AppTypography fontSize={"16px"} fontWeight={700} color={"#FFF"} width={"164px"}>Advanced Technology Integration</AppTypography>
                </Flex>
                <AppTypography fontSize={"20px"} fontWeight={400} color={"#C2C2C2"} width={"390px"}>Leverage state-of-the-art technologies such as blockchain, QR codes, and RFID for secure, reliable data management.</AppTypography>
              </Flex>
            </Flex>
            <Flex alignItems={"center"} gap={"28px"}>
              <Flex width={"128px"} height={"128px"}>
                <Image src="assets/images/dpp-page/img12.png" objectFit="contain" width={"100%"} height={"100%"} />
              </Flex>
              <Flex flexDirection={"column"} alignItems={"flex-start"}>
                <Flex alignItems={"center"} gap={"12px"}>
                  <AppTypography fontSize={"48px"} fontWeight={700} color={"rgba(255, 255, 255, 0.25)"}>04</AppTypography>
                  <AppTypography fontSize={"16px"} fontWeight={700} color={"#FFF"} width={"164px"}>Regulatory Compliance Made Easy</AppTypography>
                </Flex>
                <AppTypography fontSize={"20px"} fontWeight={400} color={"#C2C2C2"} width={"390px"}>Stay ahead of the curve with automatic compliance updates, keeping products aligned with the latest regulations.</AppTypography>
              </Flex>
            </Flex>
            <Flex alignItems={"center"} gap={"28px"}>
              <Flex width={"128px"} height={"128px"}>
                <Image src="assets/images/dpp-page/img14.png" objectFit="contain" width={"100%"} height={"100%"} />
              </Flex>
              <Flex flexDirection={"column"} alignItems={"flex-start"}>
                <Flex alignItems={"center"} gap={"12px"}>
                  <AppTypography fontSize={"48px"} fontWeight={700} color={"rgba(255, 255, 255, 0.25)"}>06</AppTypography>
                  <AppTypography fontSize={"16px"} fontWeight={700} color={"#FFF"} width={"164px"}>Data-Driven Decision Making</AppTypography>
                </Flex>
                <AppTypography fontSize={"20px"} fontWeight={400} color={"#C2C2C2"} width={"390px"}>Utilize rich analytics and reports to make strategic decisions, enhancing product’s value and market competitiveness.</AppTypography>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DppBenefits;