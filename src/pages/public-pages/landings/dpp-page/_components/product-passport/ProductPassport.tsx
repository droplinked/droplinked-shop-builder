import React, { useState } from "react";
import { Flex, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

// Components
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
    { label: "Product ID", value: activeProduct.product_id, icon: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/e8484afab2db79beca0ea52244b7d6022b502bdfc138f0a8304b9a4e0154632c.png_st.png" },
    { label: "Weight", value: activeProduct.weight, icon: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/1a49141c98c67903387ec9f5fa96f7ae134d16abc06f14ab9b9f163e9dfc8d6c.png_st.png" },
    { label: "Traceability", value: activeProduct.traceability, icon: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/b7ce0f43bfd9741447959d0d6e7d7ac13b0aee23659bb052b3cc1328fa9611b9.png_st.png" },
    { label: "Manufacturing site", value: activeProduct.manufacturingSite, icon: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/386a3c15720ebecea5a5f23b66cbf48a7a661dd521c3c38914ecb54b0f80abb9.png_st.png" },
    { label: "Certifications", value: activeProduct.certifications, icon: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/0518b602ffba9cd2c8539b817e8c3e245b75cd03d27d16ac523231006ccac730.png_st.png" },
    { label: "Circular characteristics", value: activeProduct.circularCharacteristics, icon: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/6c88f22a538ede68647b3cffeb4798efd19559ee425b8ef844e2b52b3a2bc3b6.png_st.png" },
    { label: "Sourcing composition", value: activeProduct.sourcingComposition, icon: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/b2fc63388419e09779ed114a5e1b2b28f42ffd0a1c37a2baf6bea5b0b0078503.png_st.png" },
    { label: "LCA", value: activeProduct.LCA, icon: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/54da0df50de53760d5b9bf4b730c0e28895fbea4c59314a6a353203484c2d87a.png_st.png" },
  ];

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"flex-start"}
      width={"100%"}
      maxWidth={"979px"}
      border={"2px solid #2EC99E"}
      borderRadius={"30px"}
      bg={"rgba(0, 0, 0, 0.25)"}
      padding={"30px"}
      flexShrink={0}
      zIndex={999}
      gap={"15px"}
      style={{ backdropFilter: "blur(50px)" }}
      mx="auto"
    >
      {/* header */}
      <Flex alignItems={"center"} justifyContent={"space-evenly"} gap={"22px"} flexWrap={"wrap"}>
        {["Clothing", "Retail", "Electronics"].map((category) => (
          <AppTypography
            key={category}
            fontSize={{ base: "24px", md: "32px" }}
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
          <Flex alignItems={"center"} flexDirection={{ base: "column", lg: "row" }} gap={"30px"}>
            <Flex
              width={{ base: "100%", lg: "364px" }}
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
              <AppTypography fontSize={{ base: "28px", md: "35px" }} fontWeight={700} color={"#2BCFA1"}>
                {activeProduct.productName}
              </AppTypography>
              {productOptions.map((option) => (
                <Flex alignItems={"center"} gap={"10px"} width={"100%"} key={option.label} flexWrap={"wrap"}>
                  <Image src={option.icon} width={"40px"} height={"40px"} objectFit={"cover"} />
                  <Flex alignItems={"center"} gap={"4px"} flexWrap={"wrap"}>
                    <AppTypography fontSize={{ base: "18px", md: "21px" }} fontWeight={700} color={"#2BCFA1"}>
                      {option.label} :
                    </AppTypography>
                    <AppTypography fontSize={{ base: "18px", md: "21px" }} fontWeight={500} color={"#FFF"}>
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

      <Flex alignItems={"center"} justifyContent={"space-between"} flexDirection={{ base: "column", lg: "row" }} gap={"16px"} width={"100%"}>
        <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"10px"}>
          <AppTypography fontSize={{ base: "28px", md: "35px" }} fontWeight={700} color={"#2BCFA1"}>Chain of custody</AppTypography>
          <Flex alignItems={"center"} gap="10px" flexWrap={"wrap"}>
            <Image src="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/9299c3d7eabfb00567fdba7440c9efc7812e9e9269442e47bbbfc57579bb9c0b.png_st.png" width={"40px"} height={"40px"} objectFit={"cover"} />
            <AppTypography fontSize={{ base: "20px", md: "25px" }} fontWeight={700} color={"#FFF"}>10/09/2022, 14:22</AppTypography>
            <Flex width={"5px"} alignSelf={"stretch"} bgColor={"#2BCFA1"} />
            <AppTypography fontSize={{ base: "20px", md: "25px" }} fontWeight={700} color={"#FFF"}>Product created</AppTypography>
          </Flex>
        </Flex>
        <Image src="https://upload-file-flatlay.s3.us-west-2.amazonaws.com/fc09f0bd1bc6b56ca3890e4031fa1452cf76ff640010f6a0f2460975e62c551c.png_st.png" width={"92px"} height={"92px"} borderRadius={"8px"} objectFit={"cover"} />
      </Flex>

      {/* divider */}
      <Flex width={"100%"} height={"2px"} alignSelf={"stretch"} bg={"linear-gradient(90deg, rgba(46, 201, 158, 0.00) 0%, #2EC99E 50%, rgba(46, 201, 158, 0.00) 100%)"} />

      <Flex alignItems={"center"} justifyContent={"center"} width={"100%"}>
        <AppTypography fontSize={{ base: "20px", md: "25px" }} fontWeight={700} textAlign={"center"} color={"#2BCFA1"} letterSpacing={"3.75px"}>Digital product passport Powered By droplinked</AppTypography>
      </Flex>

    </Flex>
  );
};

export default ProductPassport;
