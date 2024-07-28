import React, { useState } from "react";
import { Flex, Image } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import AppTypography from "components/common/typography/AppTypography";
import { Link } from "react-router-dom";

const productPassportData = [
  {
    category: "Accesories",
    productName: "Moschino Bag",
    product_id: "Ca23A58BHG90CC3",
    weight: "2.6kg",
    traceability: "Full supply chain transparency",
    manufacturingSite: "Milan, Italy",
    certifications: "ISO 9001, ISO 14001",
    circularCharacteristics: "Recyclable materials",
    sourcingComposition: "Calf leather from EU farms",
    LCA: "Low environmental impact, sustainable practices",
    createdDate: "2021/04/11, 12:25",
    imageSrc: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/d59e4ad7ff6ad5611a79950ccb34e7f9ad7ba78a6380a8594979f618c58139b4.png_or.png",
    blockchainLogo: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/af9f8268d446b5ca32242314e0fcf5cfe16018d15d3e14f92d8760b397da047c.png_or.png",
    QR_Code: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/fc09f0bd1bc6b56ca3890e4031fa1452cf76ff640010f6a0f2460975e62c551c.png_st.png",
    view3D: "https://demo.threedium.co.uk/abd/bag/",
    videoSrc: "https://upload-file-droplinked.s3.amazonaws.com/09e85bddba18489902a30c2b41fd872eff9aa29107960cea32de7f3b4ff9b781_or.mp4",
  },
  {
    category: "Jewelry",
    productName: "Patek Philippe Chronograph Watch",
    product_id: "LW45678EXQ",
    weight: "0.2kg",
    traceability: "Full supply chain transparency",
    manufacturingSite: "Geneva, Switzerland",
    certifications: "ISO 9001, Swiss Made",
    circularCharacteristics: "Recyclable materials",
    sourcingComposition: "Stainless steel from EU",
    LCA: "Low environmental impact, durable design",
    createdDate: "2020/10/16, 18:45",
    imageSrc: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/ff0c5ea52ce72412f870d129e2d2e0f6794eed3f52ea8a71e07d74ae58f0c734.png_or.png",
    blockchainLogo: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/173b18e608b1d5c6896cbfc5a2c095619812ae12d85a94976c12543fdf83661f.png_or.png",
    QR_Code: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/fc09f0bd1bc6b56ca3890e4031fa1452cf76ff640010f6a0f2460975e62c551c.png_st.png",
    view3D: "https://demo.threedium.co.uk/furlan-marri/stopwatch-test/v0.6/",
    videoSrc: "https://upload-file-droplinked.s3.amazonaws.com/55c5ebeab9b5ad69642ba4f7f52acef41f1a38b062389ff657207689198a00d5_or.mp4",
  },
  {
    category: "Retail",
    productName: "Timberland Classic Boot",
    product_id: "TB98765XPL",
    weight: "1.2kg",
    traceability: "Full supply chain transparency",
    manufacturingSite: "Newmarket, USA",
    certifications: "ISO 9001, ISO 14001",
    circularCharacteristics: "Recyclable materials",
    sourcingComposition: "Leather from North USA farms",
    LCA: "Low impact, sustainable manufacturing",
    createdDate: "2022/08/21, 10:05",
    imageSrc: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/93a377bbcb80b42940a07d40f34459f955a54f8e4d0c97b8bff1daac0e4f692a.png_or.png",
    blockchainLogo: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/173b18e608b1d5c6896cbfc5a2c095619812ae12d85a94976c12543fdf83661f.png_or.png",
    QR_Code: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/fc09f0bd1bc6b56ca3890e4031fa1452cf76ff640010f6a0f2460975e62c551c.png_st.png",
    view3D: "https://dist.unlimited3d.com/dists/61508/a211c691-1652-4504-adf5-aa9aba977728",
    videoSrc: "https://upload-file-droplinked.s3.amazonaws.com/fb4144bc6f7a3a1224f2e48c7199fcfeb9470219ea5331c9ad74f0a218f818a2_or.mp4",
  },
  {
    category: "Electronics",
    productName: "PlayStation 5",
    product_id: "PS5US12345",
    weight: "4.5kg",
    traceability: "Partial supply chain transparency",
    manufacturingSite: "Tokyo, Japan",
    certifications: "ISO 9001, CE Marking",
    circularCharacteristics: "Recyclable packaging",
    sourcingComposition: "Electronics components",
    LCA: "Moderate environmental impact",
    createdDate: "2023/07/24, 14:30",
    imageSrc: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/033b1fb5db4f5c6c4426fd24c19b64f1d581816c9c7f98d0255b70e914cae7a0.png_or.png",
    blockchainLogo: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/08eef0b07636efb6fad4af0317bf4c0f4cbfc84b5430d391bb5895bd2ed667ba.png_or.png",
    QR_Code: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/fc09f0bd1bc6b56ca3890e4031fa1452cf76ff640010f6a0f2460975e62c551c.png_st.png",
    view3D: "https://dist.unlimited3d.com/dists/61509/909dffcd-9288-45dc-bea5-315bc706ce5b",
    videoSrc: "https://upload-file-droplinked.s3.amazonaws.com/fd9869ab28f4196b00a0b56d2407fe28c8f84ec595c0a3fd5313b41dd3b3aab0_or.mp4",
  },
  {
    category: "Industrial",
    productName: "Neopulse Travelbag by Samsonite",
    product_id: "RL2022TRAVEL",
    weight: "3.5kg",
    traceability: "Full supply chain transparency",
    manufacturingSite: "Berlin, Germany",
    certifications: "ISO 9001, ISO 14001",
    circularCharacteristics: "Recyclable materials",
    sourcingComposition: "Polycarbonate from EU suppliers",
    LCA: "Low environmental impact, sustainable practices",
    createdDate: "2023/05/10, 11:05",
    imageSrc: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/033b1fb5db4f5c6c4426fd24c19b64f1d581816c9c7f98d0255b70e914cae7a0.png_or.png",
    blockchainLogo: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/2dcea53f446531e874210baacc1d6e61cfbbff22346cb768d2c15d41aefc259b.png_or.png",
    QR_Code: "https://upload-file-flatlay.s3.us-west-2.amazonaws.com/fc09f0bd1bc6b56ca3890e4031fa1452cf76ff640010f6a0f2460975e62c551c.png_st.png",
    view3D: "https://marketing-suitcase.threedium.co.uk/index.html?sku=4&lang=en",
    videoSrc: "https://upload-file-droplinked.s3.amazonaws.com/a1b7a18e03b354cb9074918612aad03e22d040c0f6ee8026561c6f0de853ecdb_or.mp4",
  },
];

const ProductPassport = () => {
  const [activeCategory, setActiveCategory] = useState("Accesories");

  const categories = Array.from(new Set(productPassportData.map(product => product.category)));

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
      zIndex={99}
      gap={"15px"}
      style={{ backdropFilter: "blur(50px)" }}
      mx="auto"
    >
      {/* header */}
      <Flex alignItems={"center"} justifyContent={"space-evenly"} gap={"22px"} flexWrap={"wrap"}>
        {categories.map((category) => (
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
          style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Flex alignItems={"center"} flexDirection={{ base: "column", lg: "row" }} gap={"30px"}>
            <Flex
              width={{ base: "100%", lg: "364px" }}
              height={"456px"}
              border={"2px solid #80edce89"}
              borderRadius={"22px"}
              position={"relative"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <video
                src={activeProduct.videoSrc}
                width={"90%"}
                height={"90%"}
                style={{ borderRadius: "16px", maxWidth: "100%", maxHeight: "100%" }}
                loop
                autoPlay
                muted
              />
              <Link to={activeProduct.view3D} target="_blank">
                <Flex position={"absolute"} bottom={"60px"} left={"50%"} transform={"translateX(-50%)"} alignItems={"center"} justifyContent={"center"} borderRadius={"8px"} bgColor={"#1C1C1C"} padding={"12px"} width={"160px"} height={"40px"} cursor={"pointer"}>
                  <AppTypography color={"primary"} textAlign={"center"} fontSize={"16px"} fontWeight={700} textTransform={"capitalize"} width={"100%"}>View 3D Model</AppTypography>
                </Flex>
              </Link>
            </Flex>
            <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"10px"}>
              <AppTypography fontSize={{ base: "28px", md: "35px" }} fontWeight={700} color={"#2BCFA1"}>
                {activeProduct.productName}
              </AppTypography>
              {productOptions.map((option) => (
                <Flex alignItems={"center"} gap={"10px"} width={"100%"} key={option.label} flexWrap={"nowrap"} wordBreak={"break-word"}>
                  <Image src={option.icon} width={"40px"} height={"40px"} objectFit={"cover"} />
                  <AppTypography fontSize={{ base: "18px", md: "21px" }}>
                    <span style={{ color: "#2BCFA1", fontWeight: 700, whiteSpace: "nowrap" }}>{option.label} :</span>{" "}
                    <span style={{ color: "#FFF", fontWeight: 500, wordBreak: "break-word" }}>{option.value}</span>
                  </AppTypography>
                </Flex>
              ))}
            </Flex>
          </Flex>

          {/* divider */}
          <Flex width={"100%"} height={"2px"} alignSelf={"stretch"} bg={"linear-gradient(90deg, rgba(46, 201, 158, 0.00) 0%, #2EC99E 50%, rgba(46, 201, 158, 0.00) 100%)"} />

          <Flex alignItems={"center"} justifyContent={"space-between"} flexDirection={{ base: "column", lg: "row" }} gap={"16px"} width={"100%"}>
            <Flex flexDirection={"column"} alignItems={"flex-start"} gap={"10px"} width={"100%"}>
              <AppTypography fontSize={{ base: "28px", md: "35px" }} fontWeight={700} color={"#2BCFA1"}>Chain of custody</AppTypography>
              <Flex alignItems={"center"} gap="10px" flexWrap={"wrap"}>
                <Image src={"https://upload-file-flatlay.s3.us-west-2.amazonaws.com/9299c3d7eabfb00567fdba7440c9efc7812e9e9269442e47bbbfc57579bb9c0b.png_st.png"} width={"40px"} height={"40px"} objectFit={"cover"} />
                <AppTypography fontSize={{ base: "20px", md: "25px" }} fontWeight={700} color={"#FFF"}>{activeProduct.createdDate}</AppTypography>
                <Flex width={"5px"} alignSelf={"stretch"} bgColor={"#2BCFA1"} />
                <AppTypography fontSize={{ base: "20px", md: "25px" }} fontWeight={700} color={"#FFF"}>Product created</AppTypography>
              </Flex>
            </Flex>
            <Flex width={"80%"} alignItems={"center"} justifyContent={"space-between"} flexDirection={{base: "column", md: "row"}}>
              <Image src={activeProduct.blockchainLogo} width={"260px"} height={"92px"} objectFit={"contain"} />
              <Image src={activeProduct.QR_Code} width={"92px"} height={"92px"} borderRadius={"8px"} objectFit={"cover"} />
            </Flex>
          </Flex>

        </motion.div>
      </AnimatePresence>
    </Flex>
  );
};

export default ProductPassport;
