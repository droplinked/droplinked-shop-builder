import React, { useState } from "react";
import { Flex, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

//Components
import AppTypography from "components/common/typography/AppTypography";

const productPassportData = [
  {
    category: "Clothing",
    productName: "Moschino Bag",
    product_id: "Ca23A58BHG90CC3",
    weight: "2.6kg",
    traceability: "Full supply chain transparency",
    manufacturingSite: "Milan, Italy",
    certifications: "ISO 9001, ISO 14001",
    circularCharacteristics: "Recyclable materials",
    sourcingComposition: "Calf leather from EU farms",
    LCA: "Low environmental impact, sustainable practices",
    imageSrc: "assets/images/dpp-page/img1.png",
  },
  {
    category: "Retail",
    productName: "Traveler's Choice Elite Suitcase",
    product_id: "RT12345SUITCASE",
    weight: "3.5kg",
    traceability: "Integrated RFID tracking",
    manufacturingSite: "Berlin, Germany",
    certifications: "ISO 9001, ISO 14001",
    circularCharacteristics: "Recyclable polycarbonate shell",
    sourcingComposition: "Polycarbonate and aluminum from certified suppliers",
    LCA: "Designed for minimal carbon footprint, eco-friendly materials",
    imageSrc: "assets/images/dpp-page/img2.png",
  },
  {
    category: "Electronics",
    productName: "Furlan Classic Watch",
    product_id: "FL45678WATCH",
    weight: "120g",
    traceability: "Blockchain-based tracking",
    manufacturingSite: "Geneva, Switzerland",
    certifications: "ISO 9001, ISO 14001",
    circularCharacteristics: "Recyclable stainless steel and leather",
    sourcingComposition: "Leather strap from sustainable farms, stainless steel case",
    LCA: "Minimal environmental impact, energy-efficient manufacturing",
    imageSrc: "assets/images/dpp-page/img3.png",
  },
];


const ProductPassport = () => {
  const [activeCategory, setActiveCategory] = useState("Clothing");

  const activeProduct = productPassportData.find(
    (product) => product.category === activeCategory
  );

  const productOptions = [
    { label: "Product ID", value: activeProduct.product_id, icon: "assets/images/dpp-page/icon-scanner.png" },
    { label: "Weight", value: activeProduct.weight, icon: "assets/images/dpp-page/icon-weight.png" },
    { label: "Traceability", value: activeProduct.traceability, icon: "assets/images/dpp-page/icon-road.png" },
    { label: "Manufacturing site", value: activeProduct.manufacturingSite, icon: "assets/images/dpp-page/icon-factory.png" },
    { label: "Certifications", value: activeProduct.certifications, icon: "assets/images/dpp-page/icon-certificate.png" },
    { label: "Circular characteristics", value: activeProduct.circularCharacteristics, icon: "assets/images/dpp-page/icon-recycle.png" },
    { label: "Sourcing composition", value: activeProduct.sourcingComposition, icon: "assets/images/dpp-page/icon-puzzel.png" },
    { label: "LCA", value: activeProduct.LCA, icon: "assets/images/dpp-page/icon-earth.png" },
  ];

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"flex-start"}
      width={"979px"}
      border={"2px solid #2EC99E"}
      borderRadius={"30px"}
      bg={"rgba(0, 0, 0, 0.25)"}
      padding={"30px"}
      flexShrink={0}
      zIndex={999}
      gap={"15px"}
      style={{ backdropFilter: "blur(50px)" }}
    >
      {/* header */}
      <Flex alignItems={"center"} justifyContent={"space-evenly"} gap={"22px"}>
        {["Clothing", "Retail", "Electronics"].map((category) => (
          <AppTypography
            key={category}
            fontSize={"32px"}
            fontWeight={700}
            color={activeCategory === category ? "#2BCFA1" : "#C2C2C2"}
            textDecoration={activeCategory === category ? "underline" : "none"}
            cursor={"pointer"}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </AppTypography>
        ))}
      </Flex>

      {/* divider */}
      <Flex width={"100%"} height={"2px"} alignSelf={"stretch"} bg={"linear-gradient(90deg, rgba(46, 201, 158, 0.00) 0%, #2EC99E 50%, rgba(46, 201, 158, 0.00) 100%)"} />

      {/* main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ width: "100%" }}
        >
          <Flex alignItems={"center"} gap={"30px"}>
            <Flex
              width={"364px"}
              height={"355px"}
              border={"2px solid #80edce89"}
              borderRadius={"22px"}
              padding={"8px"}
            >
              <Image
                src={activeProduct.imageSrc}
                objectFit={"contain"}
                width={"100%"}
                height={"100%"}
                boxShadow={"0px 10px 35px 0px rgba(0, 0, 0, 0.50)"}
                borderRadius={"16px"}
              />
            </Flex>
            <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"10px"}>
              <AppTypography fontSize={"35px"} fontWeight={700} color={"#2BCFA1"}>
                {activeProduct.productName}
              </AppTypography>
              {productOptions.map((option) => (
                <Flex alignItems={"center"} gap={"10px"} width={"100%"} key={option.label}>
                  <Image src={option.icon} width={"40px"} height={"40px"} objectFit={"cover"} />
                  <Flex alignItems={"center"} gap={"4px"} flexWrap={"wrap"}>
                    <AppTypography fontSize={"21px"} fontWeight={700} color={"#2BCFA1"}>
                      {option.label} :
                    </AppTypography>
                    <AppTypography fontSize={"21px"} fontWeight={500} color={"#FFF"}>
                      {option.value}
                    </AppTypography>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </motion.div>
      </AnimatePresence>

      {/* divider */}
      <Flex width={"100%"} height={"2px"} alignSelf={"stretch"} bg={"linear-gradient(90deg, rgba(46, 201, 158, 0.00) 0%, #2EC99E 50%, rgba(46, 201, 158, 0.00) 100%)"} />

      <Flex alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
        <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"10px"}>
          <AppTypography fontSize={"35px"} fontWeight={700} color={"#2BCFA1"}>Chain of custody</AppTypography>
          <Flex alignItems={"center"} gap="10px">
            <Image src="assets/images/dpp-page/icon-truck.png" width={"40px"} height={"40px"} objectFit={"cover"} />
            <AppTypography fontSize={"25px"} fontWeight={700} color={"#FFF"}>10/09/2022, 14:22</AppTypography>
            <Flex width={"5px"} alignSelf={"stretch"} bgColor={"#2BCFA1"} />
            <AppTypography fontSize={"25px"} fontWeight={700} color={"#FFF"}>Product created</AppTypography>
          </Flex>
        </Flex>
        <Image src="assets/images/dpp-page/sample-qrcode.png" width={"92px"} height={"92px"} borderRadius={"8px"} objectFit={"cover"} />
      </Flex>

      {/* divider */}
      <Flex width={"100%"} height={"2px"} alignSelf={"stretch"} bg={"linear-gradient(90deg, rgba(46, 201, 158, 0.00) 0%, #2EC99E 50%, rgba(46, 201, 158, 0.00) 100%)"} />

      <Flex alignItems={"center"} justifyContent={"center"} width={"100%"}>
        <AppTypography fontSize={"25px"} fontWeight={700} textAlign={"center"} color={"#2BCFA1"} letterSpacing={"3.75px"}>Digital product passport Powered By droplinked</AppTypography>
      </Flex>

    </Flex>
  );
};

export default ProductPassport;
